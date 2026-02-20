import asyncio
import os
import shlex

from dotenv import load_dotenv

from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

from langgraph.graph import StateGraph, START, END
from langgraph.graph.state import CompiledStateGraph
from langgraph.graph.message import AnyMessage, add_messages
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import tools_condition, ToolNode

from typing import Annotated, List
from typing_extensions import TypedDict

from langchain.agents import create_agent
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_mcp_adapters.tools import load_mcp_tools
from langchain_mcp_adapters.client import MultiServerMCPClient

load_dotenv()


# MCP server launch config
server_configs = {
    "weather": {
        "command": "python3",
        "args": ["weather_server.py"],  # Original weather server
        "transport": "stdio",
    },
    "tasks": {
        "command": "python3",
        "args": ["task_server.py"],
        "transport": "stdio",
    },
}


# LangGraph state definition
class State(TypedDict):
    messages: Annotated[List[AnyMessage], add_messages]


async def create_graph(tools: list) -> CompiledStateGraph[State, None, State, State]:
    # LLM configuration (remains the same)
    llm = ChatGoogleGenerativeAI(
        model="gemini-2.5-flash",
        temperature=0,
        google_api_key=os.getenv("GOOGLE_GEMINI_API_KEY"),
    )
    llm_with_tools = llm.bind_tools(tools)

    # --- Updated system prompt to reflect new capabilities ---
    prompt_template = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                "You are a helpful assistant. You have access to tools for checking the weather and managing a to-do list. Use the tools when necessary based on the user's request.",
            ),
            MessagesPlaceholder("messages"),
        ]
    )

    chat_llm = prompt_template | llm_with_tools

    # Define chat node (remains the same)
    def chat_node(state: State) -> State:
        response = chat_llm.invoke({"messages": state["messages"]})
        return {"messages": [response]}

    # Build LangGraph with tool routing (remains the same)
    graph = StateGraph(State)
    graph.add_node("chat_node", chat_node)
    graph.add_node("tool_node", ToolNode(tools=tools))
    graph.add_edge(START, "chat_node")
    graph.add_conditional_edges(
        "chat_node", tools_condition, {"tools": "tool_node", "__end__": END}
    )
    graph.add_edge("tool_node", "chat_node")

    return graph.compile(checkpointer=MemorySaver())


async def list_prompts(session):
    """
    Fethces the list of available prompts from the connected server
    and prints them in a user-friendly format.
    """
    try:
        prompt_response = await session.list_prompts()

        if not prompt_response or not prompt_response.prompts:
            print("\nNo prompts were found on the server.")
            return

        print("\nAvailable Prompts and their Arguments:")
        print("---------------------------------------")
        for p in prompt_response.prompts:
            print(f"Prompt: {p.name}")
            if p.arguments:
                args_list = [f" <{arg.name}>" for arg in p.arguments]
                print(f"    Arguments: {' '.join(args_list)}")
            else:
                print("     Arguments: None")

        print('\nUsage: /prompt <prompt_name> "arg1" "arg2" ....')
        print("---------------------------------------")

    except Exception as e:
        print(f"Error fetching prompts: {e}")


async def handle_prompt(session, command: str) -> str | None:
    """
    Parses a user command to invoke a specific prompt from the server,
    then return the generated prompt text.
    """

    try:
        parts = shlex.split(command.strip())
        if len(parts) < 2:
            print(f'Usage: /prompt <prompt_name> "arg1" "arg2" ...')
            return None

        prompt_name = parts[1]
        user_args = parts[2:]

        # Get available prompts from the server to validate against"
        prompt_def_response = await session.list_prompts()
        if not prompt_def_response or not prompt_def_response.prompts:
            print("\nError: Could not retrieve any prompts from the server.")
            return None

        # Find the specific prompt definition the user is asking for
        prompt_def = next(
            (p for p in prompt_def_response.prompts if p.name == prompt_name), None
        )

        if not prompt_def:
            print(f"\nError: Prompt '{prompt_name}' not found in server.")
            return None

        # Check if the numer of user-provided arguments matches what the prompt expects
        if len(user_args) != len(prompt_def.arguments):
            expected_args = [arg.name for arg in prompt_def.arguments]
            print(f"\nError: Invalid number of argments for prompt '{prompt_name}")
            print(
                f"Expected {len(expected_args)} arguments: {', '.join(expected_args)}"
            )
            return None

        # Build the argument dictionary
        arg_dict = {arg.name: val for arg, val in zip(prompt_def.arguments, user_args)}

        # Fetch the prompt from the server using the validated name and arguments
        prompt_response = await session.get_prompt(prompt_name, arg_dict)

        # Extract the text content form the response
        prompt_text = prompt_response.messages[0].content.text

        print("\n--- Prompt loaded successfully. Preparing to execute.... ---")
        # Return the fetched text to be used by the agent
        return prompt_text
    except Exception as e:
        print(f"\nAn error ocurred during prompt invocation: {e}")
        return None


async def list_resources(session):
    """
    Fetches the list of available resources from the connected server and prints them in a
    user-friendly format.
    """

    try:
        resource_response = await session.list_resources()

        if not resource_response or not resource_response.resources:
            print("\nNo resources found on the server.")
            return
        print("\nAvailable Resources:")
        print("---------------------------------------")
        for r in resource_response.resources:
            # The URI is the unique identifier for the resource
            print(f"    Resource URI: {r.uri}")
            # The description comes from the resource function's docstring
            if r.description:
                print(f"    Description: {r.description.strip()}")

        print("\nUsage: /resource <resource_uri>")
        print("---------------------------------------")

    except Exception as e:
        print(f"Error fetching resource: {e}")


async def handle_resource(session, command: str) -> str | None:
    """
    Parses a user command to fetch a specific resource from the server
    and return its content as a single string.
    """
    try:
        # The command format is "/resource <resource_uri>"
        parts = shlex.split(command.strip())
        if len(parts) != 2:
            print("\nUsage: /resource <resource_uri>")
            return None

        resource_uri = parts[1]

        print(f"\n--- Fetching resource '{resource_uri}'... ---")

        # Use the session's `read_resource` method with the provided URI
        response = await session.read_resource(resource_uri)

        if not response or not response.contents:
            print("Error: Resource not found or content is empty.")
            return None

        # Extract text from all TextContent objects and join them
        # this handles cases where a resource might be split into multiple parts.
        text_parts = [
            content.text for content in response.contents if hasattr(content, "text")
        ]

        if not text_parts:
            print("error: Resource content is not in a readable text format.")
            return None

        resource_content = "\n".join(text_parts)

        print("--- Resource loaded successfully. ---")
        return resource_content

    except Exception as e:
        print(f"\nAn error ocurred while fetching the resource: {e}")
        return None


# Entry point
async def main():
    # As per the error message, instantiate the client directly
    # The client will manage the server subprocesses internally
    client = MultiServerMCPClient(server_configs)

    # Get a single, unified list of tools from all connected servers
    all_tools = await client.get_tools()

    # Create the LangGraph agent with the aggregated list of tools
    agent = await create_graph(all_tools)

    print("MCP Agent is ready (connected to Weather and Task servers).")

    while True:
        user_input = input("\nYou: ").strip()
        if user_input.lower() in {"exit", "quit", "q"}:
            break

        try:
            response = await agent.ainvoke(
                {"messages": [("user", user_input)]},
                config={"configurable": {"thread_id": "multi-server-session"}},
            )
            print("AI:", response["messages"][-1].content)
        except Exception as e:
            print("Error:", e)


if __name__ == "__main__":
    asyncio.run(main())
