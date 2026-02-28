'use client';
import { studentCreateDto } from "@/dtos/student.dto";
import { getStudentById, updateStudent, createStudent, deleteStudentById } from "@/utils/mock-api";
import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface StudentFormProps {
    student_id: string;
}

const studentDetailsOptions = (student_id: string) => queryOptions({
    queryKey: ['students', student_id],
    queryFn: () => getStudentById(student_id),
});

export function StudentForm({ student_id }: StudentFormProps) {
    const queryClient = useQueryClient();
    const router = useRouter();

    const isNewStudent = student_id === "None";

    const { data: student, isLoading, isError } = useQuery({
        ...studentDetailsOptions(student_id),
        enabled: !isNewStudent,
    });

    const [firstName, setFirstName] = useState<string>("");
    const [middleName, setMiddleName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [birthyear, setBirthyear] = useState<string>("");
    const [school, setSchool] = useState<string>("");
    const [province, setProvince] = useState<string>("");

    useEffect(() => {
        if (student) {
            setFirstName(student.firstName ?? "");
            setMiddleName(student.middleName ?? "");
            setLastName(student.lastName ?? "");
            setBirthyear(student.birthyear?.toString() ?? "");
            setSchool(student.school ?? "");
            setProvince(student.province ?? "");
        }
    }, [student]);

    const updateMutation = useMutation({
        mutationFn: (updatedStudent: studentCreateDto) => updateStudent(updatedStudent),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['students'] });
            router.push('/students');
        },
    });

    const createMutation = useMutation({
        mutationFn: (newStudent: studentCreateDto) => createStudent(newStudent),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['students'] });
            router.push('/students');
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteStudentById(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['students'] });
            router.push('/students');
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const studentData: studentCreateDto = {
            id: student_id,
            firstName,
            middleName,
            lastName,
            birthyear: parseInt(birthyear),
            school,
            province,
        };

        if (isNewStudent) {
            createMutation.mutate(studentData);
        } else {
            updateMutation.mutate(studentData);
        }
    };

    const isPending = updateMutation.isPending || createMutation.isPending;

    if (!isNewStudent) {
        if (isLoading) {
            return (
                <div className="w-4/5 m-2 ml-0">
                    <p className="animate-pulse">Loading student information...</p>
                </div>
            );
        }

        if (isError || !student) {
            return (
                <div className="w-4/5 m-2 ml-0">
                    <p className="text-red-500">Error: Could not find student with ID {student_id}</p>
                    <button
                        onClick={() => router.back()}
                        className="mt-4 text-blue-500 hover:underline"
                    >
                        Return to student list
                    </button>
                </div>
            );
        }
    }

    return (
        <form onSubmit={handleSubmit} className="m-2 ml-0 flex flex-col justify-between bg-(--dark-white) p-2 pt-4 pb-4 rounded-xl gap-4">
            <div className="flex flex-col justify-between gap-4">
                <div className="flex-1 bg-white px-2 py-1 rounded-sm">
                    <p className="text-xs text-black/50">Họ</p>
                    <input
                        className="w-full outline-none"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="flex-1 bg-white px-2 py-1 rounded-sm">
                    <p className="text-xs text-black/50">Tên đệm</p>
                    <input
                        className="w-full outline-none"
                        type="text"
                        value={middleName}
                        onChange={(e) => setMiddleName(e.target.value)}
                    />
                </div>
                <div className="flex-1 bg-white px-2 py-1 rounded-sm">
                    <p className="text-xs text-black/50">Tên</p>
                    <input
                        className="w-full outline-none"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
            </div>
            <div className="flex flex-col justify-between gap-4">
                <div className="flex-1 bg-white px-2 py-1 rounded-sm">
                    <p className="text-xs text-black/50">Năm sinh</p>
                    <input
                        className="w-full outline-none"
                        type="text"
                        value={birthyear}
                        onChange={(e) => setBirthyear(e.target.value)}
                        required
                    />
                </div>
                <div className="flex-1 bg-white px-2 py-1 rounded-sm">
                    <p className="text-xs text-black/50">Trường</p>
                    <input
                        className="w-full outline-none"
                        type="text"
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                        required
                    />
                </div>
                <div className="flex-1 bg-white px-2 py-1 rounded-sm">
                    <p className="text-xs text-black/50">Tỉnh</p>
                    <input
                        className="w-full outline-none"
                        type="text"
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        required
                    />
                </div>
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
                    disabled={isPending}
                    className="flex-1 flex flex-row bg-white hover:bg-green-300 cursor-pointer px-2 py-4 rounded-sm justify-center items-center disabled:opacity-50"
                >
                    Lưu lại
                </button>
            </div>
        </form >
    );
}