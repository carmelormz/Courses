from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from crewai.agents.agent_builder.base_agent import BaseAgent
from typing import List


@CrewBase
class CodingAgentDemo:
    """CodingAgentDemo crew"""

    agents: List[BaseAgent]
    tasks: List[Task]

    @agent
    def debugging_agent(self) -> Agent:
        return Agent(
            config=self.agents_config["debugging_agent"],
            allow_code_execution=True,
        )

    @task
    def debug_task(self) -> Task:
        return Task(
            config=self.tasks_config["debug_task"],
        )

    @crew
    def crew(self) -> Crew:
        """Creates the CodingAgentDemo crew"""

        return Crew(
            agents=self.agents,  # Automatically created by the @agent decorator
            tasks=self.tasks,  # Automatically created by the @task decorator
            process=Process.sequential,
            verbose=True,
        )
