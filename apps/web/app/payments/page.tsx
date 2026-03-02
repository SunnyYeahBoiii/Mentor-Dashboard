"use client";

import { lusitana } from "@/utils/fonts";
import { paymentDto } from "@/dtos/payment.dto";
import { FaEdit, FaSearch } from "react-icons/fa";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { getPaymentPage, getPaymentTotalPages } from "@/utils/mock-api";
import { useQuery, queryOptions } from "@tanstack/react-query";
import clsx from "clsx";
import Link from "next/link";

const paymentListOptions = (page: number) =>
  queryOptions({
    queryKey: ["payments", { page }],
    queryFn: () => getPaymentPage(page),
  });

const paymentTotalPagesOptions = () =>
  queryOptions({
    queryKey: ["payments", "totalPages"],
    queryFn: () => getPaymentTotalPages(),
  });

function PaymentPageContent() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const page = parseInt(searchParams.get("page") || "1");

  const {
    data: payments,
    isLoading: isPaymentsLoading,
    isError: isPaymentsError,
  } = useQuery(paymentListOptions(page));
  const { data: totalPages = 1 } = useQuery(paymentTotalPagesOptions());

  const setPage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    replace(pathname + "?" + params.toString());
  };

  if (isPaymentsLoading) {
    return (
      <div className="w-4/5 m-2 ml-0 text-gray-500">
        <h3 className={`${lusitana.className} text-2xl my-4 mb-6`}>
          Thanh toán học phí
        </h3>
        <p>Đang tải...</p>
      </div>
    );
  }

  if (isPaymentsError || !payments) {
    return (
      <div className="w-4/5 m-2 ml-0 text-red-500">
        <h3 className={`${lusitana.className} text-2xl my-4 mb-6`}>
          Thanh toán học phí
        </h3>
        <p>Lỗi khi tải dữ liệu. Vui lòng thử lại sau.</p>
      </div>
    );
  }

  return (
    <div className="w-4/5 m-2 ml-0">
      <h3 className={`${lusitana.className} text-2xl my-4 mb-6`}>
        Thanh toán học phí
      </h3>
      <div className="flex flex-row justify-between gap-2">
        <div className="flex-7 px-3 py-2 flex flex-row items-center border rounded-md">
          <FaSearch className="opacity-50" />
          <input
            placeholder="Tìm kiếm"
            className="w-full ml-1 border-none outline-none rounded-xl pl-1"
          />
        </div>
      </div>

      <div className="flex flex-col my-8 p-2 bg-(--dark-white) rounded-xl">
        <div className="flex flex-row justify-between">
          <p className="w-[40%] text-center">Họ tên</p>
          <p className="w-[20%] text-center">Số buổi học</p>
          <p className="w-[30%] text-center">Tổng học phí</p>
          <p className="w-[10%] text-center">Thanh toán</p>
        </div>
        <div className="bg-white no-scrollbar flex flex-col rounded-xl mt-2">
          {payments.map((payment: paymentDto, index: number) => (
            <div
              key={payment.id}
              className={`flex flex-row py-3 border-black/10 ${index < payments.length - 1 ? "border-b" : "border-none"}`}
            >
              <p className="w-[40%] text-center">
                {payment.firstName} {payment.middleName} {payment.lastName}
              </p>
              <p className="w-[20%] text-center">{payment.section_count - payment.paid_sections}</p>
              <p className="w-[30%] text-center">
                {payment.total_fee.toLocaleString()} VND
              </p>
              <p className="w-[10%] text-center">
                <Link
                  className="flex flex-row items-center justify-center"
                  href={`/payments/add-payment/${payment.id}`}
                >
                  <FaEdit className="text-2xl px-1 py-1 text-black/50 hover:text-black cursor-pointer" />
                </Link>
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-row justify-center items-center">
        {totalPages > 6 && (
          <div className="flex flex-row">
            <IoIosArrowRoundBack
              onClick={() => setPage(page - 1)}
              className={clsx(
                "text-4xl px-1 py-1 bg-white rounded-sm mr-1",
                page === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
              )}
            />
            <button
              onClick={() => setPage(1)}
              className={clsx(
                "select-none w-10 border cursor-pointer flex flex-row justify-center items-center px-2 py-1 hover:bg-black/10 hover:border rounded-sm mx-1",
                page === 1
                  ? "bg-white border border-black/10"
                  : "border-transparent",
              )}
            >
              1
            </button>
            <button
              onClick={() => setPage(2)}
              className={clsx(
                "select-none w-10 border cursor-pointer flex flex-row justify-center items-center px-2 py-1 hover:bg-black/10 hover:border rounded-sm mx-1",
                page === 2
                  ? "bg-white border border-black/10"
                  : "border-transparent",
              )}
            >
              2
            </button>

            {page <= 4 && (
              <button
                onClick={() => setPage(3)}
                className={clsx(
                  "select-none w-10 border cursor-pointer flex flex-row justify-center items-center px-2 py-1 hover:bg-black/10 hover:border rounded-sm mx-1",
                  page === 3
                    ? "bg-white border border-black/10"
                    : "border-transparent",
                )}
              >
                3
              </button>
            )}
            {page <= 4 && (
              <button
                onClick={() => setPage(4)}
                className={clsx(
                  "select-none w-10 border cursor-pointer flex flex-row justify-center items-center px-2 py-1 hover:bg-black/10 hover:border rounded-sm mx-1",
                  page === 4
                    ? "bg-white border border-black/10"
                    : "border-transparent",
                )}
              >
                4
              </button>
            )}

            {page > 4 && (
              <p className="select-none border border-transparent w-10 cursor-pointer flex flex-row justify-center items-center px-2 py-1 mx-1">
                ...
              </p>
            )}
            {page > 4 && page < totalPages - 2 && (
              <button
                onClick={() => setPage(page)}
                className={clsx(
                  "select-none w-10 border cursor-pointer flex flex-row justify-center items-center px-2 py-1 hover:bg-black/10 hover:border rounded-sm mx-1",
                  "bg-white border border-black/10",
                )}
              >
                {page}
              </button>
            )}
            {page < totalPages - 2 && (
              <p className="select-none border border-transparent w-10 cursor-pointer flex flex-row justify-center items-center px-2 py-1 mx-1">
                ...
              </p>
            )}

            {page >= totalPages - 2 && (
              <button
                onClick={() => setPage(totalPages - 2)}
                className={clsx(
                  "select-none w-10 border cursor-pointer flex flex-row justify-center items-center px-2 py-1 hover:bg-black/10 hover:border rounded-sm mx-1",
                  page === totalPages - 2
                    ? "bg-white border border-black/10"
                    : "border-transparent",
                )}
              >
                {totalPages - 2}
              </button>
            )}
            {page >= totalPages - 2 && (
              <button
                onClick={() => setPage(totalPages - 1)}
                className={clsx(
                  "select-none w-10 border cursor-pointer flex flex-row justify-center items-center px-2 py-1 hover:bg-black/10 hover:border rounded-sm mx-1",
                  page === totalPages - 1
                    ? "bg-white border border-black/10"
                    : "border-transparent",
                )}
              >
                {totalPages - 1}
              </button>
            )}
            <button
              onClick={() => setPage(totalPages)}
              className={clsx(
                "select-none w-10 border cursor-pointer flex flex-row justify-center items-center px-2 py-1 hover:bg-black/10 hover:border rounded-sm mx-1",
                page === totalPages
                  ? "bg-white border border-black/10"
                  : "border-transparent",
              )}
            >
              {totalPages}
            </button>

            <IoIosArrowRoundForward
              onClick={() => setPage(page + 1)}
              className={clsx(
                "text-4xl px-1 py-1 bg-white rounded-sm ml-1",
                page === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer",
              )}
            />
          </div>
        )}

        {totalPages <= 6 && (
          <div className="flex flex-row">
            <IoIosArrowRoundBack
              onClick={() => setPage(page - 1)}
              className={clsx(
                "text-4xl px-1 py-1 bg-white rounded-sm mr-1",
                page === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
              )}
            />
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={clsx(
                  "w-10 border cursor-pointer flex flex-row justify-center items-center px-2 py-1 hover:bg-black/10 hover:border rounded-sm mx-1",
                  page === p
                    ? "bg-white border border-black/10"
                    : "border-transparent",
                )}
              >
                {p}
              </button>
            ))}
            <IoIosArrowRoundForward
              onClick={() => setPage(page + 1)}
              className={clsx(
                "text-4xl px-1 py-1 bg-white rounded-sm ml-1",
                page === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer",
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return <PaymentPageContent />;
}
