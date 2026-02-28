'use client';

import { lusitana } from "@/utils/fonts";
import { studentCreateDto } from "@/dtos/student.dto";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { deleteStudentById, getStudentPage, getStudentTotalPages } from "@/utils/mock-api";
import { useQuery, queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import Link from "next/link";
import StudentSkeleton from "@/components/skeletons/StudentSkeleton";

const studentListOptions = (page: number) => queryOptions({
    queryKey: ['students', { page }],
    queryFn: () => getStudentPage(page),
});

const studentTotalPagesOptions = () => queryOptions({
    queryKey: ['students', 'totalPages'],
    queryFn: () => getStudentTotalPages(),
});

export default function StudentPage() {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();
    const page = parseInt(searchParams.get("page") || "1");

    const { data: students, isLoading: isStudentsLoading, isError: isStudentsError } = useQuery(studentListOptions(page));
    const { data: totalPages = 1 } = useQuery(studentTotalPagesOptions());

    const queryClient = useQueryClient();
    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteStudentById(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['students'] });
        },
    });

    const setPage = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;
        const params = new URLSearchParams(searchParams);
        params.set("page", newPage.toString());
        replace(pathname + "?" + params.toString());
    };

    if (isStudentsLoading) {
        return (
            <StudentSkeleton />
        );
    }

    if (isStudentsError || !students) {
        return (
            <div className="w-4/5 m-2 ml-0 text-red-500">
                <h3 className={`${lusitana.className} text-2xl my-4 mb-6`}>Danh sách học sinh</h3>
                <p>Error loading students. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="w-4/5 m-2 ml-0">
            <h3 className={`${lusitana.className} text-2xl my-4 mb-6`}>Danh sách học sinh</h3>
            <div className="flex flex-row justify-between gap-2">
                <div className="flex-7 px-3 py-2 flex flex-row items-center border rounded-md">
                    <FaSearch className="opacity-50" />
                    <input placeholder="Tìm kiếm" className="w-full ml-1 border-none outline-none rounded-xl pl-1" />
                </div>
                <Link className="flex-3" href="/students/add-student">
                    <div className="w-full h-full rounded-lg bg-(--blue-light) flex flex-row justify-center">
                        <div className="w-full opacity-50 hover:opacity-100 cursor-pointer flex flex-row justify-around items-center px-8">
                            <p className="text-white">Thêm học sinh</p>
                            <p className="text-white">+</p>
                        </div>
                    </div>
                </Link>
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
                                <Link href={`/students/${student.id}`}>
                                    <FaEdit className="text-2xl px-1 py-1 text-black/50 hover:text-black cursor-pointer" />
                                </Link>
                                <FaTrash onClick={() => deleteMutation.mutate(student.id)} className="text-2xl px-1 py-1 bg-white text-black/50 hover:text-red-500 cursor-pointer" />
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-row justify-center items-center">
                {
                    totalPages > 6 && <div className="flex flex-row">
                        <IoIosArrowRoundBack onClick={() => setPage(page - 1)} className={clsx("text-4xl px-1 py-1 bg-white rounded-sm mr-1", page === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer")} />
                        <button onClick={() => setPage(1)} className={clsx("select-none w-10 border cursor-pointer flex flex-row justify-center items-center px-2 py-1 hover:bg-black/10 hover:border rounded-sm mx-1", page === 1 ? "bg-white border border-black/10" : "border-transparent")}>1</button>
                        <button onClick={() => setPage(2)} className={clsx("select-none w-10 border cursor-pointer flex flex-row justify-center items-center px-2 py-1 hover:bg-black/10 hover:border rounded-sm mx-1", page === 2 ? "bg-white border border-black/10" : "border-transparent")}>2</button>

                        {page <= 4 && <button onClick={() => setPage(3)} className={clsx("select-none w-10 border cursor-pointer flex flex-row justify-center items-center px-2 py-1 hover:bg-black/10 hover:border rounded-sm mx-1", page === 3 ? "bg-white border border-black/10" : "border-transparent")}>3</button>}
                        {page <= 4 && <button onClick={() => setPage(4)} className={clsx("select-none w-10 border cursor-pointer flex flex-row justify-center items-center px-2 py-1 hover:bg-black/10 hover:border rounded-sm mx-1", page === 4 ? "bg-white border border-black/10" : "border-transparent")}>4</button>}

                        {page > 4 &&
                            <p className="select-none border border-transparent w-10 cursor-pointer flex flex-row justify-center items-center px-2 py-1 mx-1">...</p>}
                        {page > 4 &&
                            page < totalPages - 2 &&
                            <button onClick={() => setPage(page)} className={clsx("select-none w-10 border cursor-pointer flex flex-row justify-center items-center px-2 py-1 hover:bg-black/10 hover:border rounded-sm mx-1", "bg-white border border-black/10")}>{page}</button>}
                        {page < totalPages - 2 &&
                            <p className="select-none border border-transparent w-10 cursor-pointer flex flex-row justify-center items-center px-2 py-1 mx-1">...</p>}

                        {page >= totalPages - 2 && <button onClick={() => setPage(totalPages - 2)} className={clsx("select-none w-10 border cursor-pointer flex flex-row justify-center items-center px-2 py-1 hover:bg-black/10 hover:border rounded-sm mx-1", page === totalPages - 2 ? "bg-white border border-black/10" : "border-transparent")}>{totalPages - 2}</button>}
                        {page >= totalPages - 2 && <button onClick={() => setPage(totalPages - 1)} className={clsx("select-none w-10 border cursor-pointer flex flex-row justify-center items-center px-2 py-1 hover:bg-black/10 hover:border rounded-sm mx-1", page === totalPages - 1 ? "bg-white border border-black/10" : "border-transparent")}>{totalPages - 1}</button>}
                        <button onClick={() => setPage(totalPages)} className={clsx("select-none w-10 border cursor-pointer flex flex-row justify-center items-center px-2 py-1 hover:bg-black/10 hover:border rounded-sm mx-1", page === totalPages ? "bg-white border border-black/10" : "border-transparent")}>{totalPages}</button>

                        <IoIosArrowRoundForward onClick={() => setPage(page + 1)} className={clsx("text-4xl px-1 py-1 bg-white rounded-sm ml-1", page === totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer")} />
                    </div>
                }

                {
                    totalPages <= 6 && <div className="flex flex-row">
                        <IoIosArrowRoundBack onClick={() => setPage(page - 1)} className={clsx("text-4xl px-1 py-1 bg-white rounded-sm mr-1", page === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer")} />
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <button key={p} onClick={() => setPage(p)} className={clsx("w-10 border cursor-pointer flex flex-row justify-center items-center px-2 py-1 hover:bg-black/10 hover:border rounded-sm mx-1", page === p ? "bg-white border border-black/10" : "border-transparent")}>{p}</button>
                        ))}
                        <IoIosArrowRoundForward onClick={() => setPage(page + 1)} className={clsx("text-4xl px-1 py-1 bg-white rounded-sm ml-1", page === totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer")} />
                    </div>
                }
            </div>
        </div >
    );
}