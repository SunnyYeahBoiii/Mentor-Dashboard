'use client';
import { classInfoCreateDto } from "@/dtos/class.dto";
import { studentCreateDto } from "@/dtos/student.dto";
import { getClassById, createClass, updateClass, getStudentInClass } from "@/utils/mock-api";
import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface classFormProps {
    class_id: string;
}

const classDetailsOptions = (class_id: string) => queryOptions({
    queryKey: ['classes', class_id],
    queryFn: () => getClassById(class_id),
});

export function ClassForm({ class_id }: classFormProps) {
    const queryClient = useQueryClient();
    const router = useRouter();

    const isNewClass = class_id === "None";

    const { data: classInfo, isLoading, isError } = useQuery({
        ...classDetailsOptions(class_id),
        enabled: !isNewClass,
    });

    const [name, setName] = useState<string>("");
    const [sectionCount, setSectionCount] = useState<string>("");
    const [sectionFee, setSectionFee] = useState<string>("");
    const [studentCount, setStudentCount] = useState<string>("");

    useEffect(() => {
        if (classInfo) {
            setName(classInfo.name ?? "");
            setSectionCount(classInfo.section_count.toString() ?? "");
            setSectionFee(classInfo.section_fee.toString() ?? "");
            setStudentCount(classInfo.students_count.toString() ?? "");
        }
    }, [classInfo]);

    const updateMutation = useMutation({
        mutationFn: (updatedClass: classInfoCreateDto) => updateClass(updatedClass),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['classes'] });
            router.push('/classes');
        },
    });

    const { data: studentList } = useQuery({
        queryKey: ['students', class_id],
        queryFn: () => getStudentInClass(class_id),
    });

    const createMutation = useMutation({
        mutationFn: (newClass: classInfoCreateDto) => createClass(newClass),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['classes'] });
            router.push('/classes');
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const classInfo: classInfoCreateDto = {
            id: class_id,
            name,
            section_count: parseInt(sectionCount),
            section_fee: parseInt(sectionFee),
            students_count: parseInt(studentCount),
        };

        if (isNewClass) {
            createMutation.mutate(classInfo);
        } else {
            updateMutation.mutate(classInfo);
        }
    };

    const isPending = updateMutation.isPending || createMutation.isPending;

    if (!isNewClass) {
        if (isLoading) {
            return (
                <div className="w-4/5 m-2 ml-0">
                    <p className="animate-pulse">Loading class information...</p>
                </div>
            );
        }

        if (isError || !classInfo) {
            return (
                <div className="w-4/5 m-2 ml-0">
                    <p className="text-red-500">Error: Could not find class with ID {class_id}</p>
                    <button
                        onClick={() => router.back()}
                        className="mt-4 text-blue-500 hover:underline"
                    >
                        Return to class list
                    </button>
                </div>
            );
        }
    }

    return (
        <form onSubmit={handleSubmit} className="m-2 ml-0 flex flex-col justify-between bg-(--dark-white) p-2 pt-4 pb-4 rounded-xl gap-4">
            <div className="flex flex-col justify-between gap-4">
                <div className="flex-1 bg-white px-2 py-1 rounded-sm">
                    <p className="text-xs text-black/50">Tên</p>
                    <input
                        className="w-full outline-none"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="flex-1 bg-white px-2 py-1 rounded-sm">
                    <p className="text-xs text-black/50">Học phí theo buổi</p>
                    <input
                        className="w-full outline-none"
                        type="text"
                        value={sectionFee}
                        onChange={(e) => setSectionFee(e.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-row gap-4">
                    <div className="flex-1 h-60 bg-white px-2 py-1 rounded-sm">
                        <p className="text-xs text-black/50">Danh sách buổi học</p>

                    </div>

                    <div className="flex-1 flex flex-col h-60 bg-white px-2 py-1 rounded-sm">
                        <p className="text-xs text-black/50">Danh sách học sinh</p>
                        <div className="flex-1 overflow-y-scroll no-scrollbar">

                            {studentList?.map((student, index) => (
                                <div key={student.id} className={`flex flex-row py-3 border-black/10  ${index < studentList.length - 1 ? 'border-b' : 'border-none'}`}>
                                    <p className="w-[40%]">{student.firstName} {student.middleName} {student.lastName}</p>
                                    <p className="w-[20%]">{student.birthyear}</p>
                                    <p className="w-[20%]">{student.province}</p>
                                    <p className="w-[20%] text-center flex flex-row justify-center items-center">
                                        <Link href={`/students/${student.id}`}>
                                            <FaEdit className="text-2xl px-1 py-1 text-black/50 hover:text-black cursor-pointer" />
                                        </Link>
                                        <FaTrash className="text-2xl px-1 py-1 bg-white text-black/50 hover:text-red-500 cursor-pointer" />
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div >
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
                    disabled={isPending}
                    className="flex-1 flex flex-row bg-white hover:bg-green-300 cursor-pointer px-2 py-4 rounded-sm justify-center items-center disabled:opacity-50"
                >
                    Lưu lại
                </button>
            </div>
        </form >
    );
}