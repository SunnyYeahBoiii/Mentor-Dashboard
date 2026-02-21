'use client'

import { sectionEndDto, sectionUpdateDto } from "@/dtos/section.dto";
import { updateSectionById } from "@/utils/mock-api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface SectionFormProps {
    section: sectionEndDto;
}

const formatDateTimeLocal = (date: Date) => {
    const pad = (num: number) => num.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

export default function SectionForm({ section }: SectionFormProps) {
    const [name, setName] = useState(section.name);
    const [startTime, setStartTime] = useState<Date>(new Date(section.startTime as Date));
    const [endTime, setEndTime] = useState<Date>(new Date(section.endTime as Date));
    const router = useRouter();

    const mutation = useMutation({
        mutationKey: ['section', section.id],
        mutationFn: updateSectionById,
        onSuccess: () => {
            router.push('/current-sessions');
        }
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updatedSection: sectionUpdateDto = {
            id: section.id,
            name: name,
            classId: section.classId,
            startTime: startTime,
            endTime: endTime,
        };
        mutation.mutate(updatedSection);
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-(--dark-white) p-2 py-4 rounded-xl">
            <div className="w-full p-2 border rounded bg-white">
                <p className="text-sm text-gray-500">Tên buổi học</p>
                <input
                    type="text"
                    className="w-full"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="w-full p-2 border rounded bg-white">
                <p className="text-sm text-gray-500">Lớp học</p>
                <input
                    type="text"
                    className="w-full"
                    defaultValue={section.classId}
                    readOnly
                />
            </div>
            <div className="w-full p-2 border rounded bg-white opacity-50 cursor-not-allowed">
                <p className="text-sm text-gray-500">Thời gian bắt đầu</p>
                <input
                    disabled
                    type="datetime-local"
                    className="w-full opacity-50 cursor-not-allowed"
                    defaultValue={formatDateTimeLocal(startTime)}
                    onChange={(e) => setStartTime(new Date(e.target.value))}
                />
            </div>
            <div className="w-full p-2 border rounded bg-white">
                <p className="text-sm text-gray-500">Thời gian kết thúc</p>
                <input
                    type="datetime-local"
                    className="w-full"
                    defaultValue={section.endTime ? formatDateTimeLocal(endTime) : formatDateTimeLocal(new Date())}
                    onChange={(e) => setEndTime(new Date(e.target.value))}
                />
            </div>

            <div className="flex flex-row justify-end gap-2">
                <button
                    type="button"
                    className="flex-1 bg-white hover:bg-red-300 rounded-xs py-4 cursor-pointer"
                    onClick={() => router.back()}
                >
                    Hủy bỏ
                </button>
                <button
                    className="flex-1 bg-white hover:bg-green-300 rounded-xs py-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={mutation.isPending}
                >
                    Xác nhận
                </button>
            </div>
        </form>
    );
}