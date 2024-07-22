from celery import shared_task
from django.utils import timezone
from .models import Todo
import pytz
@shared_task
def check_due_dates():
    korea_tz = pytz.timezone('Asia/Seoul')
    todos_due = Todo.objects.filter(due_date__lte=timezone.now().astimezone(korea_tz), completed=False)

    for todo in todos_due:
        todo.completed = True
        todo.save()
