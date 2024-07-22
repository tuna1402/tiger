from celery import shared_task
from django.utils import timezone
from .models import Todo
import pytz

@shared_task
def check_due_dates():
    korea_tz = pytz.timezone('Asia/Seoul')
    todos_due = Todo.objects.filter(due_date__gte=timezone.now().astimezone(korea_tz), completed=False)

    for todo in todos_due:
        todo.completed = True
        todo.save()

import logging
logger = logging.getLogger(__name__)

@shared_task
def check_due_dates():
    logger.info("Starting check_due_dates task")
    korea_tz = pytz.timezone('Asia/Seoul')
    now = timezone.now().astimezone(korea_tz)
    logger.info(f"Current time: {now}")
    todos_due = Todo.objects.filter(due_date__lte=now, completed=False)
    logger.info(f"Found {todos_due.count()} overdue todos")
    for todo in todos_due:
        logger.info(f"Marking todo {todo.id} as completed")
        todo.completed = True
        todo.save()
    logger.info("Finished check_due_dates task")