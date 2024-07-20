
from django.utils import timezone
from django.db import models

class TodoList(models.Model):
    name = models.CharField(max_length=100, verbose_name="할일 제목")
    description = models.TextField(max_length=300, verbose_name="할일 세부사항")
    date_created = models.DateField(auto_now_add=True, verbose_name="생성 날짜")
    date_deadline = models.DateField(verbose_name="언제까지?")
    is_done = models.BooleanField(default=False, verbose_name="완료여부")

    def check_deadline(self):
        if self.date_deadline < timezone.now().date() and not self.is_done:
            self.is_done = True
            self.save()

    def __str__(self):
        return self.name
