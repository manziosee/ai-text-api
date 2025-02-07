import openai
import os
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

# Check the current working directory
logging.info("Current Working Directory: %s", os.getcwd())

# Define the path to the training data file
training_data_path = "../data/training_data.jsonl"

# Check if the file exists
if not os.path.isfile(training_data_path):
    logging.error(f"File not found: {training_data_path}")
else:
    try:
        # Upload the dataset
        with open(training_data_path, "rb") as f:
            response = openai.File.create(
                file=f,
                purpose='fine-tune'
            )
        training_file_id = response['id']
        logging.info(f"Training file ID: {training_file_id}")

        # Fine-tune the model
        fine_tune_response = openai.FineTune.create(
            training_file=training_file_id,
            model="davinci"
        )
        logging.info(f"Fine-tuning started: {fine_tune_response}")

    except openai.error.APIError as e:
        logging.error(f"API error: {e}")
    except Exception as e:
        logging.error(f"An error occurred: {e}")
