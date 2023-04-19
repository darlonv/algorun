import requests
from time import sleep
import json

URL = 'http://10.112.35.67:2358'

head = {
    'Content-Type': 'application/json'
}

req = {
    "source_code": "#include <stdio.h>\n\nint main(void) {\n  char name[10];\n  scanf(\"%s\", name);\n  printf(\"hello, %s\\n\", name);\n  return 0;\n}",
    "language_id": "50",
    "number_of_runs": None,
    "stdin": "Judge0",
    "expected_output": None,
    "cpu_time_limit": None,
    "cpu_extra_time": None,
    "wall_time_limit": None,
    "memory_limit": None,
    "stack_limit": None,
    "max_processes_and_or_threads": None,
    "enable_per_process_and_thread_time_limit": None,
    "enable_per_process_and_thread_memory_limit": None,
    "max_file_size": None,
    "enable_network": None
}

#Request a submission
x = requests.post(f'{URL}/submissions', json=req)
print(f'Status code: {x.status_code}')
token = x.json()['token']
print(token)

#Get submission status

while True:
    x = requests.get(f'{URL}/submissions/{token}')
    print(f'Status code: {x.status_code}')
    print(x.text)
    response = x.json()
    if response['status']['id'] != 1:
        break
    sleep(1)

x = requests.delete(f'{URL}/submissions/{token}', headers=head)
print(f'Status code: {x.status_code}')
print(x.text)


req = {
  "submissions": [
    {
      "language_id": 46,
      "source_code": "echo hello from Bash"
    },
    {
      "language_id": 71,
      "source_code": "print(\"hello from Python\")"
    },
    {
      "language_id": 72,
      "source_code": "puts(\"hello from Ruby\")"
    }
  ]
}

#Request multiple submissions
x = requests.post(f'{URL}/submissions/batch', json=req, headers=head)
print(f'Status code: {x.status_code}')
print(x.text)

tokens=[]
for t in x.json():
    tokens.append(t['token'])

for i in range(5):
    print('####')
    x = requests.get(f'{URL}/submissions/batch?tokens={",".join(tokens)}')
    print(f'Status code: {x.status_code}')
    print(x.text)

    print('+++')
    for token in tokens:
        x = requests.get(f'{URL}/submissions/{token}')
        print(x.text)

    sleep(1)

