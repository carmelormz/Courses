from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from crewai.agents.agent_builder.base_agent import BaseAgent
from crewai.tasks.conditional_task import ConditionalTask
from crewai.tasks.task_output import TaskOutput
from crewai_tools import SerperDevTool
from pydantic import BaseModel
from typing import List

search_tool = SerperDevTool()


class EventsData(BaseModel):
    events: list[str]


def should_fetch_more_data(output: TaskOutput) -> bool:
    return len(output.pydantic.events) < 8


@CrewBase
class MutliAgentAdvFuncDemo:
    """MutliAgentAdvFuncDemo crew"""

    agents: List[BaseAgent]
    tasks: List[Task]

    @agent
    def data_collector(self) -> Agent:
        return Agent(
            config=self.agents_config["data_collector"],  # type: ignore[index]
            verbose=True,
            tools=[search_tool],
        )

    @agent
    def data_analyzer(self) -> Agent:
        return Agent(
            config=self.agents_config["data_analyzer"],  # type: ignore[index]
            verbose=True,
            tools=[search_tool],
        )

    @agent
    def summary_creator(self) -> Agent:
        return Agent(
            config=self.agents_config["summary_creator"],  # type: ignore[index]
            verbose=True,
        )

    @task
    def fetch_task(self) -> Task:
        return Task(
            config=self.tasks_config["fetch_task"],  # type: ignore[index]
            output_pydantic=EventsData,
        )

    @task
    def verify_data_task(self) -> ConditionalTask:
        return ConditionalTask(
            config=self.tasks_config["verify_data_task"],  # type: ignore[index]
            condition=should_fetch_more_data,
        )

    @task
    def summary_task(self) -> Task:
        return Task(
            config=self.tasks_config["summary_task"],  # type: ignore[index]
        )

    @crew
    def crew(self) -> Crew:
        """Creates the MutliAgentAdvFuncDemo crew"""
        # To learn how to add knowledge sources to your crew, check out the documentation:
        # https://docs.crewai.com/concepts/knowledge#what-is-knowledge

        return Crew(
            agents=self.agents,  # Automatically created by the @agent decorator
            tasks=self.tasks,  # Automatically created by the @task decorator
            process=Process.sequential,
            verbose=True,
            planning=True,
            # process=Process.hierarchical, # In case you wanna use that instead https://docs.crewai.com/how-to/Hierarchical/
        )
