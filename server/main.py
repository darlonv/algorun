from fastapi import Request, FastAPI
from pydantic import BaseModel
import json
import requests

from fastapi.middleware.cors import CORSMiddleware

contador = 0

URL = 'http://10.112.35.67:2358'

head = {
    'Content-Type': 'application/json'
}

app = FastAPI()

submissionDefault = {
    "source_code": None,
    "language_id": None,
    "number_of_runs": None,
    "stdin": None,
    "expected_output": None,
    "cpu_time_limit": 1,
    "cpu_extra_time": 0,
    "wall_time_limit": None,
    "memory_limit": None,
    "stack_limit": None,
    "max_processes_and_or_threads": None,
    "enable_per_process_and_thread_time_limit": None,
    "enable_per_process_and_thread_memory_limit": None,
    "max_file_size": None,
    "enable_network": None
}

origins = [
    "http://*:*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/submissions')
async def submission(request: Request):
    recv = await request.json()
    print('=====', recv, '=====')

    testes = []

    for teste in recv['testes']:
        submission = getSubmission(source_code=recv['source_code'], 
                                   language = recv['language'], 
                                   stdin=teste['input'], 
                                   expected_output=teste['expected_output'])
        response = requests.post(f'{URL}/submissions', json=submission, headers=head)
        # print(response.status_code)
        # print(response.json())
        teste['token'] = response.json()['token']
        teste['codeOutput'] = '.'
        teste['status'] = '?'
        # print(teste)

        testes.append(teste)

    # print(testes)


    # submission = getSubmission(source_code=recv['source_code'], language = recv['language'])

    return {'testes': testes}

@app.get('/submissions/{token}')
async def submissions(token):
    print('++++', {token})
    print(token)

    global contador

    contador +=1
    return getSubmissionStatus(token)

    # return {'codeOutput':f'{contador}'}
    
def getSubmissionStatus(token):
    response = requests.get(f'{URL}/submissions/{token}/')
    print(response.status_code)
    print(response.text)
    return response.text



def  getSubmission(
        source_code = None, 
        language=None,
        stdin=None,
        expected_output = None):
    
    sub = submissionDefault.copy()
    sub['source_code'] = source_code
    sub['language_id'] = str(getLanguageId(language))
    sub['stdin'], sub['expected_output'] = stdin, expected_output


    return sub

def  getSubmissions(
        source_code = None, 
        language=None,
        inputs=[],
        expected_outputs = []):
    
    submissions = []
    for i,o in zip(inputs, expected_outputs):
        sub = submissionDefault.copy()
        sub['source_code'] = source_code
        sub['language_id'] = str(getLanguageId(language))
        sub['stdin'], sub['expected_output'] = i, o

        submissions.append(sub)

    return {'submissions': submissions}



def getLanguageId(language):
    if language=='python':
        return 71
    if language=='java':
        return 62
    
    return None