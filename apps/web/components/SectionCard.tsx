import Link from "next/link";

interface SectionCardProps {
    id: string;
    name: string;
    className: string;
    startTime: Date;
    endTime: Date;
}

export default function SectionCard({ id, name, className, startTime, endTime }: SectionCardProps) {
    return (
        <div className="w-full rounded-xl bg-(--dark-white) flex flex-col justify-between p-2 py-2 gap-2">
            <span className="flex flex-row justify-between gap-5">
                <div className="flex-3 bg-white rounded-sm">
                    <div className="m-2">
                        <p className="text-left text-xs text-black/50">Lớp học</p>
                        <p className="text-left">{className}</p>
                    </div>
                </div>
                <div className="flex flex-row flex-1 gap-5">
                    <Link className="flex flex-1 px-2 py-1 rounded-sm justify-center items-center bg-white hover:bg-black/10 cursor-pointer" href={`/sessions/${id}`}>
                        <div className="flex">
                            <p className="text-center">Thông tin</p>
                        </div>
                    </Link>
                    <div className="flex flex-1 rounded-sm px-2 py-2 justify-center items-center bg-white hover:bg-red-300 cursor-pointer">
                        <p className="text-center">Xóa</p>
                    </div>
                </div>
            </span>

            <span className="flex flex-row justify-between gap-5">
                <div className="flex-3 bg-white rounded-sm">
                    <div className="m-2">
                        <p className="text-left text-xs text-black/50">Thời gian</p>
                        <p className="text-left">{startTime.toLocaleDateString()} | Bắt đầu: {startTime.toLocaleTimeString()} - Kết thúc: {endTime.toLocaleTimeString()}</p>
                    </div>
                </div>
                <div className="flex-1 bg-white rounded-sm">
                    <div className="m-2">
                        <p className="text-left text-xs text-black/50">Tên buổi học</p>
                        <p className="text-left">{name}</p>
                    </div>
                </div>
            </span>
        </div>
    );
}