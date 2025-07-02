import React from 'react';

function FaceResult({ result }) {
  const { face_count, faces, image_base64 } = result;

  return (
    <div style={{ marginTop: '20px', textAlign: 'center' }}>
      <h3 style={{ marginBottom: '15px' }}>Detected Faces: {face_count}</h3>

      {/* Image + Overlay Container */}
      <div style={{ position: 'relative', display: 'inline-block' }}>
        {image_base64 && (
          <img
            src={image_base64}
            alt="Detected Faces"
            style={{ maxWidth: '100%', border: '2px solid #666' }}
          />
        )}

        {/* Overlay face boxes */}
        {faces.map((face, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: face.coordinates.x,
              top: face.coordinates.y,
              width: face.size.width,
              height: face.size.height,
              border: '2px solid red',
              backgroundColor: 'rgba(255,0,0,0.2)',
              color: '#fff',
              fontSize: '12px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            Face {index + 1}
          </div>
        ))}
      </div>

      {/* Face details below image */}
      <div style={{ marginTop: '15px', textAlign: 'center' }}>
        {faces.map((face, index) => (
          <div key={index}>
            Face {index + 1} : Coords ({face.coordinates.x}, {face.coordinates.y}) ,
            Size ({face.size.width} × {face.size.height})
          </div>
        ))}
      </div>
    </div>
  );
}

export default FaceResult;