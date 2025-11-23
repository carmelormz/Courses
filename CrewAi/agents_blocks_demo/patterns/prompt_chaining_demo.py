import os
import logging

from typing import Optional, List
from pydantic import BaseModel, Field
from dotenv import load_dotenv
from openai import OpenAI

""" SETUP """
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)

logger = logging.getLogger(__name__)

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

model = "gpt-4o"

""" OUTPUT FORMAT MODELS """

class DocumentOutline(BaseModel):
    """
    First LLM call: Generate a structured outline for a document
    """
    topic: str = Field(description="The main topic of the document.")
    sections: List[str] = Field(description="A list of section titles for the document outline.")

class OutlineValidation(BaseModel):
    """
    Second LLM call: Validate the generated outline against quality criteria.
    """
    is_valid: bool = Field(description="Wheter the outline is logical, comprehensive, and well-structured.")
    reasoning: str = Field(description="A brief explanation of why the outline is valid or is not valid.")
    confidence_score: float = Field(description="Confidence score between 0 and 1 on the validity of the outline.")

class FinalDocument(BaseModel):
    """
    Third LLM call: Generate the full document content from the outline.
    """
    title: str = Field(description="A suitable title for the final document.")
    full_content: str = Field(description="The complete, well-writter document content, based on the provided outline.")

""" TASK FUNCTIONS """

def generate_document_outline(topic: str) -> DocumentOutline:
    """
    First LLM call: generate a structured outline for a topic.
    """
    logger.info(f"Starting outline generation for topic: {topic}")

    completion = client.chat.completions.parse(
        model=model,
        messages=[
            {
                "role": "system",
                "content": (
                    """You are an expert content strategist.
                    Create a logical and comprehensive outline for a document on the given topic.
                    The outline should include an introduction, several body sections, and a conclusion."""
                )
            },
            {
                "role": "user",
                "content": topic
            }
        ],
        response_format=DocumentOutline
    )

    result = completion.choices[0].message.parsed
    logger.info("Outline generated successfully")
    return result

def validate_document_outline(outline: DocumentOutline) -> OutlineValidation:
    """
    Second LLM call to validate the quality of the generated outline.
    """
    logger.info("Starting outline validation...")

    completion = client.chat.completions.parse(
        model=model,
        messages=[
            {
                "role": "system",
                "content": (
                    """You are a critical quality assurance editor. Your primary goal is to REJECT 
                    low-quality or vague outlines. An outline is considered invalid if the 
                    original topic is to vague, ambiguos, or lacks a clear focus (e.g. 'stuff', 
                    'things', 'an article'). Be strict. If the topic is bad, the outline is bad. 
                    Provide a brief reason for your decision."""
                ),
            },
            {
                "role": "user",
                "content": str(outline.model_dump())
            }
        ],
        response_format=OutlineValidation
    )

    result = completion.choices[0].message.parsed
    logger.info(f"Validation complete - Is valid: {result.is_valid}, Confidence:{result.confidence_score:.2f}")

    if not result.is_valid:
        logger.warning(f"Validation failed. Reasoning: {result.reasoning}")

    return result

def generate_final_document(outline: DocumentOutline) -> FinalDocument:
    """
    Third LLM call: expand the validated outline into a full article.
    """
    logger.info("Generating final document from outline...")

    completion = client.chat.completions.parse(
        model=model,
        messages=[
            {
                "role": "system",
                "content": (
                    """You are a skilled author.
                    Write a comprehensive, well-structured document based on the provided outline.
                    Include an engaging title, clear section headings, and a concise conclusion."""
                )
            },
            {
                "role": "user",
                "content": str(outline.model_dump())
            }
        ],
        response_format=FinalDocument
    )

    result = completion.choices[0].message.parsed
    logger.info(f"Final document generated with title: {result.title}")
    return result

def create_document_from_topic(topic: str) -> Optional[FinalDocument]:
    """
    Main function implementing the prompt chain with a validation gate.
    """
    logger.info(f"Starting document creation process for topic: '{topic}'")

    # First LLM call: Generate the outline
    document_outline = generate_document_outline(topic)

    # Second LLM call: Validate outline
    validation_result = validate_document_outline(document_outline)

    if not validation_result.is_valid or validation_result.confidence_score < 0.8:
        logger.warning(f"Gate check failed - Outline not valid or confidence too low ({validation_result.confidence_score:.2f}).")
        logger.warning(f"Reasoning: {validation_result.reasoning}")
        return None
    
    logger.info("Gate check passed, proceeding with final document generation.")

    # Third LLM call: Generate final document from validated outline
    final_document = generate_final_document(document_outline)

    logger.info("Document creation process completed successfully.")
    return final_document

topic_input = "The benefits of remote work for small businesses"
final_document_result = create_document_from_topic(topic_input)

if final_document_result:
    print(f"\nTitle: {final_document_result.title}")
    print("\n--- Document Content ---")
    print(final_document_result.full_content[:500] + "...")
else:
    print("Failed to generate a valid document for the topic.")
