'use client'

import { lusitana } from "@/utils/fonts";

import { students as Students } from "@/utils/mock-data";
import { studentCreateDto } from "@/dtos/student.dto";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";

import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { usePathname, useSearchParams } from "next/navigation";
import { getStudentPage, getTotalPages } from "@/utils/mock-api";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { useEffect } from "react";


export default function StudentPage() {
    const searchParams = useSearchParams();
    const totalPages = getTotalPages();
    const students = getStudentPage(parseInt(searchParams.get("page") || "1"));
    const { replace } = useRouter();
    const pathname = usePathname();

    const setPage = (page: number) => {
        if (page < 1 || page > totalPages) return;
        const params = new URLSearchParams(searchParams);
        params.set("page", page.toString());
        replace(pathname + "?" + params.toString());
    }

    return (
        <div className="w-4/5 m-2 ml-0">
            <h3 className={`${lusitana.className} text-2xl my-4 mb-6`}>Danh sách học sinh</h3>
            <div className="flex flex-row justify-between">
                <div className="w-[68%] px-3 py-2 flex flex-row items-center border rounded-md">
                    <FaSearch className="opacity-50" />
                    <input placeholder="Tìm kiếm" className="ml-1 border-none outline-none rounded-xl pl-1" />
                </div>
                <div className="rounded-lg bg-(--blue-light) w-[30%] flex flex-row justify-center">
                    <div className="w-full opacity-50 hover:opacity-100 cursor-pointer flex flex-row justify-around items-center px-8">
                        <p className="text-white">Thêm học sinh</p>
                        <p className="text-white">+</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col my-8 p-2 bg-(--dark-white) rounded-xl">
                <div className="flex flex-row justify-between">
                    <p className="w-[25%] text-center">Họ tên</p>
                    <p className="w-[10%] text-center">Năm sinh</p>
                    <p className="w-[40%] text-center">Trường</p>
                    <p className="w-[15%] text-center">Tỉnh</p>
                    <p className="w-[10%] text-center"></p>
                </div>
                <div className="bg-white no-scrollbar flex flex-col rounded-xl mt-2">
                    {students.map((student: studentCreateDto, index) => (
                        <div key={student.id} className={`flex flex-row py-3 border-black/10  ${index < students.length - 1 ? 'border-b' : 'border-none'}`}>
                            <p className="w-[25%] text-center">{student.lastName} {student.middleName} {student.firstName}</p>
                            <p className="w-[10%] text-center">{student.birthyear}</p>
                            <p className="w-[40%] text-center">{student.school}</p>
                            <p className="w-[15%] text-center">{student.province}</p>
                            <p className="w-[10%] text-center flex flex-row justify-center items-center">
                                <FaEdit className="text-2xl px-1 py-1 text-black/50 hover:text-black cursor-pointer" />
                                <FaTrash className="text-2xl px-1 py-1 bg-white text-black/50 hover:text-red-500 cursor-pointer" />
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-row justify-center items-center">
                {
                    totalPages > 6 && <div className="flex flex-row">
                        <IoIosArrowRoundBack onClick={() => setPage(parseInt(searchParams.get("page") || "1") - 1)} className="text-4xl px-1 py-1 bg-white rounded-sm mr-1" />
                        <button onClick={() => setPage(1)} className={clsx("select-none w-10 border cursor-pointer flex flex-row justify-center items-center px-2 py-1 hover:bg-black/10 hover:border rounded-sm mx-1", parseInt(searchParams.get("page") || "1") === 1 ? "bg-white border border-black/10" : "border-transparent")}>1</button>
                        <button onClick={() => setPage(2)} className={clsx("select-none w-10 border cursor-pointer flex flex-row justify-center items-center px-2 py-1 hover:bg-black/10 hover:border rounded-sm mx-1", searchParams.get("page") === "2" ? "bg-white border border-black/10" : "border-transparent")}>2</button>
                        {parseInt(searchParams.get("page") || "1") <= 4 && <button onClick={() => setPage(3)} className={clsx("select-none w-10 border cursor-pointer flex flex-row justify-center items-center px-2 py-1 hover:bg-black/10 hover:border rounded-sm mx-1", searchParams.get("page") === "3" ? "bg-white border border-black/10" : "border-transparent")}>3</button>}
                        {parseInt(searchParams.get("page") || "1") <= 4 && <button onClick={() => setPage(4)} className={clsx("select-none w-10 border cursor-pointer flex flex-row justify-center items-center px-2 py-1 hover:bg-black/10 hover:border rounded-sm mx-1", searchParams.get("page") === "4" ? "bg-white border border-black/10" : "border-transparent")}>4</button>}

                        {parseInt(searchParams.get("page") || "1") > 4 &&
                            <p className="select-none border border-transparent w-10 cursor-pointer flex flex-row justify-center items-center px-2 py-1 mx-1">...</p>}
                        {parseInt(searchParams.get("page") || "1") > 4 &&
                            parseInt(searchParams.get("page") || "1") < totalPages - 2 &&
                            <button onClick={() => setPage(parseInt(searchParams.get("page") || "1"))} className={clsx("select-none w-10 border cursor-pointer flex flex-row justify-center items-center px-2 py-1 hover:bg-black/10 hover:border rounded-sm mx-1", parseInt(searchParams.get("page") || "1") === parseInt(searchParams.get("page") || "1") ? "bg-white border border-black/10" : "border-transparent")}>{parseInt(searchParams.get("page") || "1")}</button>}
                        {parseInt(searchParams.get("page") || "1") < totalPages - 2 &&
                            <p className="select-none border border-transparent w-10 cursor-pointer flex flex-row justify-center items-center px-2 py-1 mx-1">...</p>}

                        {parseInt(searchParams.get("page") || "1") >= totalPages - 2 && <button onClick={() => setPage(totalPages - 2)} className={clsx("select-none w-10 border cursor-pointer flex flex-row justify-center items-center px-2 py-1 hover:bg-black/10 hover:border rounded-sm mx-1", parseInt(searchParams.get("page") || "1") === totalPages - 2 ? "bg-white border border-black/10" : "border-transparent")}>{totalPages - 2}</button>}
                        {parseInt(searchParams.get("page") || "1") >= totalPages - 2 && <button onClick={() => setPage(totalPages - 1)} className={clsx("select-none w-10 border cursor-pointer flex flex-row justify-center items-center px-2 py-1 hover:bg-black/10 hover:border rounded-sm mx-1", parseInt(searchParams.get("page") || "1") === totalPages - 1 ? "bg-white border border-black/10" : "border-transparent")}>{totalPages - 1}</button>}
                        <button onClick={() => setPage(totalPages)} className={clsx("select-none w-10 border cursor-pointer flex flex-row justify-center items-center px-2 py-1 hover:bg-black/10 hover:border rounded-sm mx-1", parseInt(searchParams.get("page") || "1") === totalPages ? "bg-white border border-black/10" : "border-transparent")}>{totalPages}</button>

                        <IoIosArrowRoundForward onClick={() => setPage(parseInt(searchParams.get("page") || "1") + 1)} className="cursor-pointer text-4xl px-1 py-1 bg-white rounded-sm ml-1" />
                    </div>
                }

                {
                    totalPages <= 6 && <div className="flex flex-row">
                        <IoIosArrowRoundBack onClick={() => setPage(parseInt(searchParams.get("page") || "1") - 1)} className="text-4xl px-1 py-1 bg-white rounded-sm mr-1" />
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button onClick={() => setPage(page)} className={clsx("w-10 border cursor-pointer flex flex-row justify-center items-center px-2 py-1 hover:bg-black/10 hover:border rounded-sm mx-1", searchParams.get("page") === page.toString() ? "bg-white border border-black/10" : "border-transparent")}>{page}</button>
                        ))}
                        <IoIosArrowRoundForward onClick={() => setPage(parseInt(searchParams.get("page") || "1") + 1)} className="cursor-pointer text-4xl px-1 py-1 bg-white rounded-sm ml-1" />
                    </div>
                }
            </div>
        </div >
    );
}