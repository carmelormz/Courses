from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from crewai.agents.agent_builder.base_agent import BaseAgent
from crewai_tools import ScrapeWebsiteTool, SerperDevTool, YoutubeVideoSearchTool
from typing import List

youtube_search_tool = YoutubeVideoSearchTool(
    youtube_video_url="https://www.youtube.com/watch?v=R0ds4Mwhy-8"
)


@CrewBase
class YoutubeMultiAgentSystemDemo:
    """YoutubeMultiAgentSystemDemo crew"""

    agents: List[BaseAgent]
    tasks: List[Task]

    # --- AGENTS ---
    @agent
    def researcher(self) -> Agent:
        return Agent(
            config=self.agents_config["researcher"],
            verbose=True,
            tools=[youtube_search_tool],
            memory=True,
        )

    @agent
    def writer(self) -> Agent:
        return Agent(
            config=self.agents_config["writer"],
            verbose=True,
            tools=[youtube_search_tool],
            memory=True,
        )

    # --- TASKS ---
    @task
    def research_task(self) -> Task:
        return Task(
            config=self.tasks_config["research_task"],
        )

    @task
    def writing_task(self) -> Task:
        return Task(
            config=self.tasks_config["writing_task"],
            human_input=True,
        )

    @crew
    def crew(self) -> Crew:
        """Creates the YoutubeMultiAgentSystemDemo crew"""

        return Crew(
            agents=self.agents,  # Automatically created by the @agent decorator
            tasks=self.tasks,  # Automatically created by the @task decorator
            verbose=True,
            memory=True,
            process=Process.sequential,
        )
