#!/usr/bin/env python
import sys
import warnings

from datetime import datetime

from educative_intro_to_agents.crew import EducativeIntroToAgents

warnings.filterwarnings("ignore", category=SyntaxWarning, module="pysbd")


def run():
    """
    Run the crew.
    """
    inputs = {
        'conference_name': 'AI Innovations Summit',
        'requirements': 'Capacity for 5000, central location, modern amenities, budget up to $50,000'
    }

    try:
        EducativeIntroToAgents().event_planning_crew().kickoff(inputs=inputs)
    except Exception as e:
        raise Exception(f"An error occurred while running the crew: {e}")
