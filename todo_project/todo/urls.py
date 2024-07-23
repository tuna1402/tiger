from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from .views import TodoViewSet


router = DefaultRouter()
router.register(r'todos', TodoViewSet)

urlpatterns = [
    path('', views.todo_list, name='todo_list'),
    path('create/', views.todo_create, name='todo_create'),
    path('update/<int:pk>/', views.todo_update, name='todo_update'),
    path('delete/<int:pk>/', views.todo_delete, name='todo_delete'),
    path('toggle/<int:pk>/', views.todo_toggle_complete, name='todo_toggle_complete'),
    path('api/', include(router.urls)),

]