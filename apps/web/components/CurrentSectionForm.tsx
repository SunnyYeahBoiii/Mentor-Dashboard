'use client'

import { runningSectionInfoDto, sectionCreateDto, sectionEndDto, sectionTransferDto, sectionUpdateDto } from "@/dtos/section.dto";
import { formatDateTimeLocal } from "@/utils/funcs";
import { createSection, createSectionFromRunningSection, updateSectionById } from "@/utils/mock-api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";

interface RunningSectionFormProps {
    section: runningSectionInfoDto;
}

export default function CurrentSectionForm({ section }: RunningSectionFormProps) {
    const [name, setName] = useState(section.name);
    const [startTime, setStartTime] = useState<Date>(new Date(section.startTime as Date));
    const [endTime, setEndTime] = useState<Date>(new Date());
    const router = useRouter();

    const mutation = useMutation({
        mutationKey: ['section', section.id],
        mutationFn: createSectionFromRunningSection,
        onSuccess: () => {
            router.push('/current-sessions');
        }
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newSection: sectionTransferDto = {
            runningId: section.id,
            name: name,
            classId: section.classId,
            startTime: startTime,
            endTime: endTime,
        };
        mutation.mutate(newSection);
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
            <div className="w-full p-2 border rounded bg-white opacity-50 cursor-not-allowed">
                <p className="text-sm text-gray-500">Lớp học</p>
                <input
                    type="text"
                    className="w-full opacity-50 cursor-not-allowed"
                    value={section.classId}
                    disabled
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
                    value={formatDateTimeLocal(endTime)}
                    onChange={(e) => setEndTime(new Date(e.target.value))}
                />
            </div>

            <div className="flex-10 bg-white rounded-sm p-2">
                <p className="text-left text-xs text-black/50">Link buổi học</p>
                <span className="flex flex-row gap-4 items-center">
                    <a className="text-left text-blue-500 hover:text-blue-800 cursor-pointer" href={section.meetingLink} target="_blank">{section.meetingLink}</a>
                    <FaCopy onClick={() => navigator.clipboard.writeText(section.meetingLink)} className="cursor-pointer text-black/50 hover:text-black" />
                </span>
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