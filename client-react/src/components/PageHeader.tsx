import React from "react";

export default function PageHeader({ title }: { title: string }) {
  return (
    <>
      <h1 className="text-4xl font-bold text-center mb-8 text-customBlue-600 drop-shadow-lg">
        {title}{" "}
      </h1>
    </>
  );
}
