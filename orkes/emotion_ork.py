from conductor.client.automator.task_handler import TaskHandler
from conductor.client.configuration.configuration import Configuration
from conductor.client.worker.worker_task import worker_task
import os

os.environ['CONDUCTOR_SERVER_URL'] = 'https://play.orkes.io'
os.environ['CONDUCTOR_AUTH_KEY'] = '3ab2a767-8e56-11ef-85a8-ba73d777fd9d'
os.environ['CONDUCTOR_AUTH_SECRET'] = '1f1TmKbRJZ34i23OcgEWfThL23fJxqvwiyn36gnRObf1RP8U'

@worker_task(task_definition_name='testabc')
def greet() -> str:
    return f'Hello there!'

api_config = Configuration()


task_handler = TaskHandler(configuration=api_config)
task_handler.start_processes() # starts polling for work
task_handler.stop_processes() # stops polling for work
