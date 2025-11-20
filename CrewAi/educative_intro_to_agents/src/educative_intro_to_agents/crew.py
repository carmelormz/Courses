from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from crewai.agents.agent_builder.base_agent import BaseAgent
from crewai_tools import SerperDevTool
from typing import List

@CrewBase
class EducativeIntroToAgents():
    """EducativeIntroToAgents crew"""

    agents: List[BaseAgent]
    tasks: List[Task]

    search_tool = SerperDevTool()

    # --- AGENTS ---
    @agent
    def venue_finder(self) -> Agent:
        return Agent(
            config=self.agents_config['venue_finder'],
            verbose=True,
            tools=[self.search_tool]
        )
    
    @agent
    def venue_quality_assurance_agent(self) -> Agent:
        return Agent(
            config=self.agents_config['venue_quality_assurance_agent'],
            verbose=True,
            tools=[self.search_tool]
        )
    
    # --- TASKS ---
    @task
    def find_venue_task(self) -> Task:
        return Task(
            config=self.tasks_config['find_venue_task'],
            tools=[self.search_tool]
        )
    
    @task
    def find_venquality_assurance_review_taskue_task(self) -> Task:
        return Task(
            config=self.tasks_config['quality_assurance_review_task'],
            tools=[self.search_tool]
        )

    @crew
    def event_planning_crew(self) -> Crew:
        """Creates the EducativeIntroToAgents crew"""
        # To learn how to add knowledge sources to your crew, check out the documentation:
        # https://docs.crewai.com/concepts/knowledge#what-is-knowledge

        return Crew(
            agents=self.agents,
            tasks=self.tasks,
            process=Process.sequential,
            verbose=True,
            memory=True
        )
