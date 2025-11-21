#!/usr/bin/env python
import sys
import warnings

from datetime import datetime

from mutli_agent_adv_func_demo.crew import MutliAgentAdvFuncDemo

warnings.filterwarnings("ignore", category=SyntaxWarning, module="pysbd")


def run():
    """
    Run the crew.
    """

    inputs = [
        {"ages": [25, 30, 35, 40, 45]},
        {"ages": [20, 25, 30, 35, 40]},
        {"ages": [30, 35, 40, 45, 50]},
    ]

    try:
        MutliAgentAdvFuncDemo().crew().kickoff_for_each(inputs=inputs)
    except Exception as e:
        raise Exception(f"An error occurred while running the crew: {e}")


def train():
    """
    Train the crew for a given number of iterations.
    """
    inputs = {"topic": "AI LLMs", "current_year": str(datetime.now().year)}
    try:
        MutliAgentAdvFuncDemo().crew().train(
            n_iterations=int(sys.argv[1]), filename=sys.argv[2], inputs=inputs
        )

    except Exception as e:
        raise Exception(f"An error occurred while training the crew: {e}")


def replay():
    """
    Replay the crew execution from a specific task.
    """
    try:
        MutliAgentAdvFuncDemo().crew().replay(task_id=sys.argv[1])

    except Exception as e:
        raise Exception(f"An error occurred while replaying the crew: {e}")


def test():
    """
    Test the crew execution and returns the results.
    """
    inputs = {"topic": "AI LLMs", "current_year": str(datetime.now().year)}

    try:
        MutliAgentAdvFuncDemo().crew().test(
            n_iterations=int(sys.argv[1]), eval_llm=sys.argv[2], inputs=inputs
        )

    except Exception as e:
        raise Exception(f"An error occurred while testing the crew: {e}")


def run_with_trigger():
    """
    Run the crew with trigger payload.
    """
    import json

    if len(sys.argv) < 2:
        raise Exception(
            "No trigger payload provided. Please provide JSON payload as argument."
        )

    try:
        trigger_payload = json.loads(sys.argv[1])
    except json.JSONDecodeError:
        raise Exception("Invalid JSON payload provided as argument")

    inputs = {
        "crewai_trigger_payload": trigger_payload,
        "topic": "",
        "current_year": "",
    }

    try:
        result = MutliAgentAdvFuncDemo().crew().kickoff(inputs=inputs)
        return result
    except Exception as e:
        raise Exception(f"An error occurred while running the crew with trigger: {e}")
