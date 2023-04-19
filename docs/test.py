import requests
from time import sleep

url = 'http://localhost:8000'
head = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
}
body = {
    'source_code': 'print("abc")',
    'language': 'python',
    'testes' : [
        {'key':1, 'input':100, 'output':110},
        {'key':2, 'input':200, 'output':210},
        {'key':3, 'input':300, 'output':310},
        {'key':4, 'input':400, 'output':410},
        {'key':5, 'input':450, 'output':460}
    ],
    'testesOcultos': [
        {'key':1, 'input':500, 'output':510},
        {'key':2, 'input':600, 'output':610},
        {'key':3, 'input':700, 'output':710},
        {'key':4, 'input':800, 'output':810},
        {'key':5, 'input':810, 'output':820},
        {'key':6, 'input':820, 'output':830},
        {'key':7, 'input':830, 'output':840}
    ]

}

x = requests.post(f'{url}/hello', headers=head, json=body)
print(x.status_code)
print(x.text)


# url = 'http://localhost:2358'
# head = {
#     'Content-Type': 'application/json'
# }
# body = {
#     'source_code': 'print("abc")',
#     'language_id': '71'
# }

# x = requests.post(f'{url}/submissions/?base64_encoded=false&wait=false', headers=head, json=body)
# print(x.status_code)
# print(x.text)
# token = x.json()['token']

# for i in range(10):
#     x = requests.get(f'{url}/submissions/{token}/?base64_encoded=false')
#     print(x.status_code)
#     print(x.json()
#     )

#     status = x.json()['status']
#     # if status['id']!=1 and status['id']!=2:
#         # break
#     sleep(1)


