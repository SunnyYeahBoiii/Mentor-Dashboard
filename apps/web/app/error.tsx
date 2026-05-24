"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="w-4/5 m-2 ml-0">
      <h2 className="text-2xl font-bold my-4 mb-6">Đã có lỗi xảy ra</h2>
      <p className="text-gray-600 mb-4">
        Không thể tải trang này. Vui lòng thử lại sau.
      </p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
      >
        Thử lại
      </button>
    </div>
  );
}
