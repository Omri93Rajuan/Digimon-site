import React, { useState } from "react";

const LazyImage = ({ src, alt }: { src: string; alt: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={() => setIsHovered(!isHovered)}
      style={{
        fontSize: "100px",
        backgroundColor: "red",
      }}
    >
      {isHovered ? (
        <>
          <img src={src} alt={alt} style={{ width: "300px" }} />
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/kFu3PEIDC0I?si=dy9xWZZ0r3g7GiwV"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </>
      ) : (
        <div>Hover to load</div>
      )}
    </button>
  );
};

export default LazyImage;
