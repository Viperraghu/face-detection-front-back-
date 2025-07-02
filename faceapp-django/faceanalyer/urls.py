from django.urls import path
from .views import FaceAnalyzerAPIView

urlpatterns = [
    path('faceanalye' , FaceAnalyzerAPIView.as_view() , name='analyze-face')
]
