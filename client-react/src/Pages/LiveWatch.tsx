import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";

export default function LiveWatch() {
  // קריאה לפונקציה GET מה-hook שלך
  const { data, error, GET } = useFetch<any>();

  useEffect(() => {
    GET("animes");
  }, [GET]);

  if (error) {
    return <div className="text-red-500">שגיאה: {error}</div>;
  }

  if (!data) {
    return <div>טוען...</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {data.map((item: any, index: number) => (
        <div
          key={index}
          className="bg-white rounded-lg overflow-hidden shadow-lg"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-gray-600">
              {item.releaseYear} • עונה {item.season} • פרק {item.episode}
            </p>
            <a
              href={item.link}
              className="text-blue-500 hover:underline block mt-2"
            >
              לצפייה
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
