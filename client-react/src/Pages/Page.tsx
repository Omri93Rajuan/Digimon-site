import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}
interface ICurrentData {
  users: IUser[];
  totalPages: number;
  currentPage: number;
  totalUsers: number;
}

export default function functionPaginationExample() {
  // const data = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);
  const itemsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState<ICurrentData | null>(null);

  const { GetByCall, data } = useFetch();

  useEffect(() => {
    GetByCall(currentPage, itemsPerPage);
  }, [currentPage]);

  useEffect(() => {
    if (data) setCurrentData(data);
  }, [data]);

  const handleNext = () => {
    if (currentData)
      if (currentPage < currentData.totalPages)
        setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Pagination Example
      </h1>
      <ul className="bg-white shadow-lg rounded-lg w-3/4 max-w-md p-4 mb-4">
        <table className="text-gray-800 border-b last:border-b-0 py-2">
          <tr>
            <th>name</th>
            <th>Email</th>
            <th>createdAt</th>
          </tr>
          {currentData &&
            currentData.users.map((item, index) => (
              <tr>
                <td>{item.fullName}</td>
                <td>{item.email}</td>
                <td>{item.email}</td>
              </tr>
            ))}
        </table>
      </ul>
      <div className="flex items-center space-x-4">
        <button
          onClick={handlePrevious}
          className={`px-4 py-2 rounded-lg text-white font-semibold ${
            currentPage === 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <span className="text-gray-700 font-medium">
          {currentData && `Page ${currentPage} of ${currentData.totalPages}`}
        </span>
        <button
          onClick={handleNext}
          className={`px-4 py-2 rounded-lg text-white font-semibold `}
        >
          Next
        </button>
      </div>
    </div>
  );
}
