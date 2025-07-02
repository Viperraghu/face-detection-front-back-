import cv2
import numpy as np
import base64
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from .serializers import FaceAnalyzeSerializer

class FaceAnalyzerAPIView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        serializer = FaceAnalyzeSerializer(data=request.data)
        if serializer.is_valid():
            image = serializer.validated_data['image']
            blur_faces = serializer.validated_data.get('blur_faces', False)
            image_bytes = image.read()
            np_arr = np.frombuffer(image_bytes, np.uint8)
            img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

            face_cascade = cv2.CascadeClassifier(
                cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
            )
            faces = face_cascade.detectMultiScale(gray, 1.3, 5)

            face_data = []
            for (x, y, w, h) in faces:
                if blur_faces:
                    face_region = img[y:y + h, x:x + w]
                    blurred_face = cv2.GaussianBlur(face_region, (99, 99), 30)
                    img[y:y + h, x:x + w] = blurred_face
                else:
                    cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)

                face_data.append({
                    "coordinates": {"x": int(x), "y": int(y)},
                    "size": {"width": int(w), "height": int(h)}
                })

            _, buffer = cv2.imencode('.jpg', img)
            image_base64 = "data:image/jpeg;base64," + base64.b64encode(buffer).decode('utf-8')

            return Response({
                "message": "Face(s) Detected!",
                "face_count": len(faces),
                "faces": face_data,
                "image_base64": image_base64  # ✅ CORRECT name!
            })

        return Response({"message": "Invalid data"}, status=400)