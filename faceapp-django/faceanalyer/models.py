from django.db import models
from django.contrib.auth.models import User

class FaceDetected(User):

    image = models.ImageField()
    blur_faces = models.BooleanField(default=False)