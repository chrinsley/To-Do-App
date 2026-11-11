from rest_framework.routers import DefaultRouter
from .views import TodoViewSet

router = DefaultRouter()
router.register('todos', TodoViewSet)
# router.register('users', UserView, basename='User')

urlpatterns = router.urls

