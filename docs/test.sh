#!/bin/bash

# echo '== C =='
# curl -X POST \
# 'http://localhost:2358/submissions?base64_encoded=false&wait=true' \
# -H 'Content-Type: application/json' \
# -d '{
#     "source_code": "#include <stdio.h>\n\nint main(void) {\n  char name[10];\n  scanf(\"%s\", name);\n  printf(\"hello, %s\\n\", name);\n  return 0;\n}",
#     "language_id": "4",
#     "number_of_runs": "1",
#     "stdin": "Judge0",
#     "expected_output": "hello, Judge0",
#     "cpu_time_limit": "2",
#     "cpu_extra_time": "0.5",
#     "wall_time_limit": "5",
#     "memory_limit": "128000",
#     "stack_limit": "64000",
#     "max_processes_and_or_threads": "30",
#     "enable_per_process_and_thread_time_limit": false,
#     "enable_per_process_and_thread_memory_limit": true,
#     "max_file_size": "1024"
# }'


echo ''
echo '== Python =='
resp=$(curl -X POST \
'http://localhost:2358/submissions?base64_encoded=false&wait=false' \
-H 'Content-Type: application/json' \
-d '{"source_code": "print (\"Hello world\")",
"language_id": 71 }')

echo $resp

echo ''


# echo '== Languages =='
# curl -X GET \
# 'http://localhost:2358/languages/all'
