import Link from "next/link";

interface SectionCardProps {
    id: string;
    name: string;
    className: string;
    startTime: Date;
    endTime: Date;
}

export default function CurrentSectionCard({ id, name, className, startTime }: SectionCardProps) {
    return (
        <div className="w-full rounded-xl bg-(--dark-white) flex flex-col justify-between p-2 py-2 gap-2">
            <span className="flex flex-row justify-between gap-5">
                <div className="flex-8 bg-white rounded-sm px-2 py-2">
                    <p className="text-left text-xs text-black/50">Lớp học</p>
                    <p className="text-left">{className}</p>
                </div>
                <Link className="flex flex-1 px-2 py-1 rounded-sm justify-center items-center bg-white hover:bg-green-300 cursor-pointer" href={`/current-sessions/end-session/${id}`}>
                    <div className="flex">
                        <p className="text-center">Kết thúc</p>
                    </div>
                </Link>
                <div className="flex flex-1 rounded-sm px-2 py-2 justify-center items-center bg-white hover:bg-red-300 cursor-pointer">
                    <p className="text-center">Xóa</p>
                </div>
            </span>

            <span className="flex flex-row justify-between gap-5">
                <div className="flex-10 bg-white rounded-sm px-2 py-2">
                    <p className="text-left text-xs text-black/50">Thời gian</p>
                    <p className="text-left">{startTime.toLocaleDateString()} | Bắt đầu: {startTime.toLocaleTimeString()} - Đang diễn ra</p>
                </div>
                <div className="flex-3 bg-white rounded-sm px-2 py-2">
                    <p className="text-left text-xs text-black/50">Tên buổi học</p>
                    <p className="text-left">{name}</p>
                </div>
            </span>
        </div>
    );
}