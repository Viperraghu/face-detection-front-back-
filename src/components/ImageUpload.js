import React, { useState } from "react";
import axios from "axios";
import FaceResult from "./FaceResult";

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setImage(e.target.files[0]);
    setResult(null);
  };

  const handleUpload = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post("http://127.0.0.1:8000/faceanalye", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
      console.log("BACKEND RESPONSE >>>>", res.data);
    } catch (err) {
      alert("Upload failed or no face detected.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">Face Detection</h1>
      <div className="bg-white shadow p-6 rounded-lg w-full max-w-lg">
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="w-full mb-4"
        />
        <button
          onClick={handleUpload}
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
        >
          Upload & Detect
        </button>
      </div>

      {result && (
        <div className="mt-6 w-full max-w-3xl">
          <FaceResult result={result} />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;