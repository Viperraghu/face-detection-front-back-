from rest_framework import serializers
from .models import FaceDetected

class FaceAnalyzeSerializer(serializers.ModelSerializer):
    image = serializers.ImageField()
    blur_faces = serializers.BooleanField(required = False , default = False)

    class Meta:
       model = FaceDetected
       fields = ["image" , "blur_faces"]