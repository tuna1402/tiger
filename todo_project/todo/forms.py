from django import forms
from .models import Todo

class TodoForm(forms.ModelForm):
    due_date = forms.DateTimeField(
        widget=forms.widgets.DateTimeInput(attrs={'type': 'datetime-local'})
    )

    class Meta:
        model = Todo
        fields = ['title', 'description', 'due_date']