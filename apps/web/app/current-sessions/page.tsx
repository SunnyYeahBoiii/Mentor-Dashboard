"use client";

import { runningSectionInfoDto } from "@/dtos/section.dto";
import { lusitana } from "@/utils/fonts";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import {
  getRunningSectionPage,
  getRunningSectionTotalPages,
} from "@/utils/mock-api";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import clsx from "clsx";
import CurrentSectionCard from "@/components/CurrentSectionCard";
import { Suspense } from "react";

const sectionListOptions = (page: number) =>
  queryOptions({
    queryKey: ["sections", { page }],
    queryFn: () => getRunningSectionPage(page),
  });

const sectionTotalPagesOptions = () =>
  queryOptions({
    queryKey: ["sections", "totalPages"],
    queryFn: () => getRunningSectionTotalPages(),
  });

function CurrentSectionPageContent() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const page = parseInt(searchParams.get("page") || "1");

  const {
    data: sections,
    isLoading: isSeciontsLoading,
    isError: isSectionsError,
  } = useQuery(sectionListOptions(page));
  const { data: totalPages = 1 } = useQuery(sectionTotalPagesOptions());

  const setPage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    replace(pathname + "?" + params.toString());
  };

  if (isSeciontsLoading) {
    return (
      <div className="w-4/5 m-2 ml-0">
        <h3 className={`${lusitana.className} text-2xl my-4 mb-6`}>
          Danh sách lớp
        </h3>
        <p className="animate-pulse">Loading sections...</p>
      </div>
    );
  }

  if (isSectionsError || !sections) {
    return (
      <div className="w-4/5 m-2 ml-0 text-red-500">
        <h3 className={`${lusitana.className} text-2xl my-4 mb-6`}>
          Danh sách lớp
        </h3>
        <p>Error loading classes. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="w-4/5 m-2 ml-0">
      <h3 className={`${lusitana.className} text-2xl my-4 mb-6`}>
        Danh sách buổi học hiện tại
      </h3>

      <div className="overflow-y-hidden flex flex-col gap-2 my-4">
        {(sections as runningSectionInfoDto[]).map((section) => (
          <CurrentSectionCard
            key={section.id}
            id={section.id}
            name={section.name}
            className={section.className}
            startTime={new Date(section.startTime)}
            meetingLink={section.meetingLink}
          />
        ))}
      </div>

      <div className="flex flex-row justify-center items-center">
        {totalPages > 6 && (
          <div className="flex flex-row">
            <IoIosArrowRoundBack
              onClick={() => setPage(page - 1)}
              className={clsx(
                "text-4xl px-1 py-1 bg-white rounded-sm mr-1",
                page <= 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
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
                page >= totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer ",
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

export default function SectionPage() {
  return (
    <Suspense
      fallback={
        <div className="w-4/5 m-2 ml-0">
          <p className="animate-pulse">Loading...</p>
        </div>
      }
    >
      <CurrentSectionPageContent />
    </Suspense>
  );
}
