import os
from typing import Literal
import requests
import json

from openai import OpenAI
from dotenv import load_dotenv
from pydantic import BaseModel, Field

load_dotenv()
opeanai_api_key = os.getenv("OPENAI_API_KEY")


class TemperatureReply(BaseModel):
    temperature: float = Field(
        description="Temperature in Celsius at the requested locations"
    )
    message: Literal[
        "Thanks for sticking with Educative! "
        "According to Pydantic validation, here's your weather update."
    ] = Field(
        description="Canonical thank-you line that must appear verbatim.",
    )


def fetch_temprature(lat, lon):
    response = requests.get(
        f"https://api.open-meteo.com/v1/forecast"
        f"?latitude={lat}&longitude={lon}"
        f"&current=temperature_2m"
    )
    data = response.json()
    return data["current"]["temperature_2m"]


client = OpenAI(api_key=opeanai_api_key)

tool_registry = [
    {
        "type": "function",
        "function": {
            "name": "fetch_temperature",
            "description": "Returns the current temperature (in Celsius) for a given location's coordinates.",
            "parameters": {
                "type": "object",
                "properties": {
                    "lat": {"type": "number"},
                    "lon": {"type": "number"},
                },
                "required": ["lat", "lon"],
                "additionalProperties": False,
            },
            "strict": True,
        },
    }
]

conversation = [
    {"role": "user", "content": "Can you check how hot it is in Tokyo right now?"}
]

first_response = client.chat.completions.create(
    model="gpt-4.1",
    messages=conversation,
    tools=tool_registry,
)

tool_call = first_response.choices[0].message.tool_calls[0]
tool_args = json.loads(tool_call.function.arguments)

temp_result = fetch_temprature(tool_args["lat"], tool_args["lon"])

conversation.append({"role": "assistant", "tool_calls": [tool_call]})
conversation.append(
    {
        "role": "tool",
        "tool_call_id": tool_call.id,
        "content": json.dumps(temp_result),
    }
)

completion_final = client.chat.completions.parse(
    model="gpt-4o",
    messages=conversation,
    tools=tool_registry,
    response_format=TemperatureReply,
)

final = completion_final.choices[0].message.parsed

print(final.temperature)
print(final.message)
