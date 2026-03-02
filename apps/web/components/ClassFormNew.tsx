'use client';
import { classCreateDto } from "@/dtos/class.dto";
import { createClass } from "@/utils/mock-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";


export function NewClassForm() {
    const queryClient = useQueryClient();
    const router = useRouter();

    const [name, setName] = useState<string>("");
    const [sectionFee, setSectionFee] = useState<string>("");

    const updateMutation = useMutation({
        mutationFn: (updatedClass: classCreateDto) => createClass(updatedClass),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['classes'] });
            router.push('/classes');
        },
    });

    const handleSubmit = () => {
        const classInfo: classCreateDto = {
            name,
            section_fee: parseInt(sectionFee),
        };


        updateMutation.mutate(classInfo);
    };

    const isPending = updateMutation.isPending;

    return (
        <div className="m-2 ml-0 flex flex-col justify-between bg-(--dark-white) p-2 pt-4 pb-4 rounded-xl gap-4">
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
                    onClick={handleSubmit}
                    type="button"
                    disabled={isPending}
                    className="flex-1 flex flex-row bg-white hover:bg-green-300 cursor-pointer px-2 py-4 rounded-sm justify-center items-center disabled:opacity-50"
                >
                    Lưu lại
                </button>
            </div>
        </div >
    );
}