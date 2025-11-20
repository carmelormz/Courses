from crewai import Agent, Crew, Process, Task, LLM
from crewai.project import CrewBase, agent, crew, task
from crewai.agents.agent_builder.base_agent import BaseAgent
from crewai_tools import SerperDevTool, ScrapeWebsiteTool
from typing import List

# Models
gemini_llm = LLM(model="openai/gpt-4o-mini", temperature=0.5)
chatgpt_llm = LLM(model="gemini/gemini-2.0-flash-lite", temperature=0.5)
llama_llm = LLM(model="groq/llama-3.1-8b-instant", temperature=0)

# Tools
search_tool = SerperDevTool()
scrape_tool = ScrapeWebsiteTool()


@CrewBase
class MultiAgentSystemsDemo:
    """MultiAgentSystemsDemo crew"""

    agents: List[BaseAgent]
    tasks: List[Task]

    # AGENTS
    @agent
    def research_analyst_agent(self) -> Agent:
        return Agent(
            config=self.agents_config["research_analyst_agent"],
            verbose=True,
            tools=[search_tool, scrape_tool],
            llm=gemini_llm,
            allow_delegation=True,
        )

    @agent
    def report_writer_agent(self) -> Agent:
        return Agent(
            config=self.agents_config["report_writer_agent"],
            verbose=True,
            llm=chatgpt_llm,
            allow_delegation=True,
        )

    @agent
    def report_editor_agent(self) -> Agent:
        return Agent(
            config=self.agents_config["report_editor_agent"],
            verbose=True,
            llm=chatgpt_llm,
        )

    # TASKS
    @task
    def data_collection_task(self) -> Task:
        return Task(
            config=self.tasks_config["data_collection_task"],
        )

    @task
    def data_analysis_task(self) -> Task:
        return Task(
            config=self.tasks_config["data_analysis_task"],
        )

    @task
    def report_writing_task(self) -> Task:
        return Task(
            config=self.tasks_config["report_writing_task"],
        )

    @task
    def report_assessment_task(self) -> Task:
        return Task(
            config=self.tasks_config["report_assessment_task"],
        )

    @crew
    def crew(self) -> Crew:
        """Creates the MultiAgentSystemsDemo crew"""

        return Crew(
            agents=self.agents,
            tasks=self.tasks,
            manager_llm=gemini_llm,
            process=Process.hierarchical,
            verbose=True,
        )
