"use client";

import { paymentDto } from "@/dtos/payment.dto";
import { getStudentPayment, paymentApply } from "@/utils/mock-api";
import {
  QueryClient,
  queryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface AddPaymentFormProps {
  student_id: string;
}

const studentPaymentOptions = (student_id: string) =>
  queryOptions({
    queryKey: ["student-payment", student_id],
    queryFn: () => getStudentPayment(student_id),
  });
export function AddPaymentForm({ student_id }: AddPaymentFormProps) {
  const router = useRouter();
  const queryClient = new QueryClient();
  const [sectionCount, setSectionCount] = useState<string>("");
  const [tuitionPaid, setTuitionPaid] = useState<string>("0");
  const [error, setError] = useState<string>("");

  const {
    data: student,
    isLoading,
    isError,
  } = useQuery(studentPaymentOptions(student_id));

  console.log(student);

  const mutation = useMutation({
    mutationKey: ["student-payment", student_id],
    mutationFn: ({ sectionCount, tuitionPaid }: { sectionCount: number; tuitionPaid: number }) =>
      paymentApply(student_id, sectionCount, tuitionPaid),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["student-payment", student_id],
      });
      router.push("/payments");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const count = parseInt(sectionCount);
    const paidValue = parseInt(tuitionPaid);
    const remainingSection =
      ((student as paymentDto)?.section_count || 0) -
      ((student as paymentDto)?.paid_sections || 0);

    if (count > remainingSection) {
      setError(`Số buổi học không được lớn hơn số buổi còn lại (${remainingSection})`);
      return;
    }

    if (!Number.isFinite(paidValue) || paidValue < 0) {
      setError("Số tiền thanh toán phải lớn hơn hoặc bằng 0");
      return;
    }

    setError("");

    mutation.mutateAsync({ sectionCount: count, tuitionPaid: paidValue });
  };

  if (isLoading) {
    return (
      <div className="w-4/5 m-2 ml-0">
        <p className="animate-pulse">Đang tải thông tin...</p>
      </div>
    );
  }

  if (isError || !student) {
    return (
      <div className="w-4/5 m-2 ml-0">
        <p className="text-red-500">Không tìm thấy học sinh</p>
        <button
          onClick={() => router.back()}
          className="mt-4 text-blue-500 hover:underline"
        >
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="m-2 ml-0 flex flex-col justify-between bg-(--dark-white) p-2 pt-4 pb-4 rounded-xl gap-4"
    >
      <div className="flex flex-col justify-between gap-4">
        <div className="flex-1 bg-white px-2 py-1 rounded-sm">
          <p className="text-xs text-black/50">Họ tên</p>
          <p className="w-full outline-none">
            {student.firstName} {student.middleName} {student.lastName}
          </p>
        </div>
        <div className="flex-1 bg-white px-2 py-1 rounded-sm">
          <p className="text-xs text-black/50">Tổng số buổi học</p>
          <p className="w-full outline-none">
            {student.section_count - student.paid_sections}
          </p>
        </div>
        <div className="flex-1 bg-white px-2 py-1 rounded-sm">
          <p className="text-xs text-black/50">Học phí còn lại</p>
          <p className="w-full outline-none">
            {(student.tuition_fee || 0).toLocaleString()} VND
          </p>
        </div>
        <div className="flex-1 bg-white px-2 py-1 rounded-sm">
          <p className="text-xs text-black/50">Số buổi thanh toán</p>
          <input
            className="w-full outline-none"
            type="number"
            min="1"
            max={student.section_count - student.paid_sections}
            value={sectionCount}
            onChange={(e) => {
              setSectionCount(e.target.value);
              setError("");
            }}
            required
          />
        </div>
        <div className="flex-1 bg-white px-2 py-1 rounded-sm">
          <p className="text-xs text-black/50">Học phí thanh toán</p>
          <input
            className="w-full outline-none"
            type="number"
            min="0"
            value={tuitionPaid}
            onChange={(e) => {
              setTuitionPaid(e.target.value);
              setError("");
            }}
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      <div className="flex flex-row gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 flex flex-row bg-white hover:bg-red-300 cursor-pointer px-2 py-4 rounded-sm justify-center items-center"
        >
          Hủy bỏ
        </button>
        <button
          type="submit"
          className="flex-1 flex flex-row bg-white hover:bg-green-300 cursor-pointer px-2 py-4 rounded-sm justify-center items-center"
        >
          Lưu lại
        </button>
      </div>
    </form>
  );
}
