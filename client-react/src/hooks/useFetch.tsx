import { useState } from "react";

export default function useFetch<T>(): any {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const BASE_URL = "http://localhost:7700/";
  //   ----------GET method----------
  const GET = async () => {
    try {
      const response = await fetch(BASE_URL, {
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! ${errorData.error.message}`);
      }
      const result = await response.json();
      setData(result);
    } catch (error: unknown) {
      setError((error as Error).message || "An unknown error occurred.");
    }
  };

  //   ----------POST method----------

  const POST = async (endpoint: string, body: object) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Request failed");
      }

      const result = await response.json();
      setData(result);
      return result;
    } catch (error) {
      setError((error as Error).message || "An unknown error occurred.");
      throw error;
    }
  };

  //   ----------GetByCall method----------
  const GetByCall = async (page, limit) => {
    try {
      const response = await fetch(
        `${BASE_URL}users/getUsersByCall?page=${page}&limit=${limit}`,
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! ${errorData.error.message}`);
      }
      const result = await response.json();
      setData(result);
    } catch (error: unknown) {
      setError((error as Error).message || "An unknown error occurred.");
    }
  };
  //   ----------DELETE method----------

  return { data, error, GET, POST, GetByCall };
}
