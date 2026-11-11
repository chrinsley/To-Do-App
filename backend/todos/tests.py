from django.test import TestCase
from rest_framework.test import APIClient
from .models import Todo


class TodoUpdateEndpointTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.todo = Todo.objects.create(title='Original task')

    def test_patch_updates_todo_title(self):
        response = self.client.patch(
            f'/api/todos/{self.todo.pk}/',
            {'title': 'Updated task'},
            format='json',
        )

        self.assertEqual(response.status_code, 200)
        self.todo.refresh_from_db()
        self.assertEqual(self.todo.title, 'Updated task')
