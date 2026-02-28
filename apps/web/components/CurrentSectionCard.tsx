import { deleteRunningSectionById } from "@/utils/mock-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { FaCopy } from "react-icons/fa";

interface SectionCardProps {
    id: string;
    name: string;
    className: string;
    startTime: Date;
    meetingLink: string;
}

export default function CurrentSectionCard({ id, name, className, startTime, meetingLink }: SectionCardProps) {
    const queryClient = useQueryClient();
    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteRunningSectionById(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sections'] });
        },
    });

    return (
        <div className="w-full rounded-xl bg-(--dark-white) flex flex-col justify-between p-2 py-2 gap-2">
            <span className="flex flex-row justify-between gap-5">
                <div className="flex-3 bg-white rounded-sm">
                    <div className="mx-2 my-1">
                        <p className="text-left text-xs text-black/50">Lớp học</p>
                        <p className="text-left">{className}</p>
                    </div>
                </div>
                <div className="flex flex-row flex-1 gap-5">
                    <Link className="flex flex-1 px-2 py-1 rounded-sm justify-center items-center bg-white hover:bg-green-300 cursor-pointer" href={`/current-sessions/end-session/${id}`}>
                        <p className="text-center">Kết thúc</p>
                    </Link>
                    <div className="flex flex-1 rounded-sm px-2 py-1 justify-center items-center bg-white hover:bg-red-300 cursor-pointer">
                        <p className="text-center">Xóa</p>
                    </div>
                </div>
            </span>

            <span className="flex flex-row justify-between gap-5">
                <div className="flex-3 bg-white rounded-sm">
                    <div className="mx-2 my-1">
                        <p className="text-left text-xs text-black/50">Thời gian</p>
                        <p className="text-left">{startTime.toLocaleDateString()} | Bắt đầu: {startTime.toLocaleTimeString()} - Đang diễn ra</p>
                    </div>
                </div>
                <div className="flex-1 bg-white rounded-sm">
                    <div className="mx-2 my-1">
                        <p className="text-left text-xs text-black/50">Tên buổi học</p>
                        <p className="text-left">{name}</p>
                    </div>
                </div>
            </span>

            <span className="flex flex-row justify-between gap-5">
                <div className="flex-10 bg-white rounded-sm px-2 py-1">
                    <p className="text-left text-xs text-black/50">Link buổi học</p>
                    <span className="flex flex-row gap-4 items-center">
                        <a className="text-left text-blue-500 hover:text-blue-800 cursor-pointer" href={meetingLink}>{meetingLink}</a>
                        <FaCopy onClick={() => navigator.clipboard.writeText(meetingLink)} className="cursor-pointer text-black/50 hover:text-black" />
                    </span>
                </div>
            </span>
        </div>
    );
}