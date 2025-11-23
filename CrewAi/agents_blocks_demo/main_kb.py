import os
import json

from openai import OpenAI
from dotenv import load_dotenv
from pydantic import BaseModel, Field

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class KBResponse(BaseModel):
    answer: str = Field(description="The answer to the user's question.")
    source: str = Field(description="The record id of the answer.")

def retrieve_from_kb(question: str):
    """
    Loads the entire knowledge base from disk.
    This is a placeholder - no filtering, no logic.
    Just hands over the full content.
    """
    with open("educative_kb.json", "r") as f:
        return json.load(f)
    
def call_function(name, args):
    if name == "retrieve_from_kb":
        return retrieve_from_kb(**args)

tools = [
    {
        "type": "function",
        "function": {
            "name": "retrieve_from_kb",
            "description": "Return the entire internal knowledge base so the model can answer the user's question.",
            "parameters": {
                "type": "object",
                "properties": {
                    "question": { "type": "string"},
                },
                "required": ["question"],
                "additionalProperties": False,
            },
            "strict": True
        }
    }
]

system_prompt = "You are a helpful assistant that answers questions from the knowledge base about Educative courses."

messages = [
    {"role": "system", "content": system_prompt},
    {"role": "user", "content": "What AI course is Educative releasing next?"},
    ]

completion = client.chat.completions.create(
    model="gpt-4o",
    messages=messages,
    tools=tools,
)

for tool_call in completion.choices[0].message.tool_calls:
    name = tool_call.function.name
    args = json.loads(tool_call.function.arguments)
    messages.append(completion.choices[0].message)

    result = call_function(name, args)
    messages.append(
        {
            "role": "tool",
            "tool_call_id": tool_call.id,
            "content": json.dumps(result)
        }
    )

completion_with_tool = client.chat.completions.parse(
    model="gpt-4o",
    messages=messages,
    tools=tools,
    response_format=KBResponse,
)

print(completion_with_tool.choices[0].message.parsed)