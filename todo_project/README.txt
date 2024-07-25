celery 실행

//celery 4.0부터 window 지원 안함//

pip install gevent
cd todo_project
celery -A todo_project worker -l info -P gevent로 실행 하면 됨
celery -A todo_project beat -l info