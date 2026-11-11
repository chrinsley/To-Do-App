from rest_framework import viewsets
from .models import Todo
from .serializers import TodoSerializer
import os
# from rest_framework.permissions import IsAuthenticated

class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all().order_by('-created_at')
    serializer_class = TodoSerializer
    # permission_classes = [IsAuthenticated]

    # def get_queryset(self):
    #     return Todo.objects.filter(
    #         user=self.request.user
    #     ).order_by('-created_at')

    # def perform_create(self, serializer):
    #     serializer.save(user=self.request.user)

# class UserView(viewsets.ModelViewSet):

#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     permission_classes = [AllowAny]