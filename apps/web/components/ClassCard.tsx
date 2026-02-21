
import { VNDFormat } from "@/utils/funcs";
import Link from "next/link";

interface ClassCardProps {
    id: string;
    name: string;
    section_count: number;
    section_fee: number;
    student_count: number;
}

export function ClassCard({ id, name, section_count, section_fee, student_count }: ClassCardProps) {
    return (
        <div className="w-full rounded-xl bg-(--dark-white) flex flex-col justify-between p-2 gap-2">
            <span className="flex flex-row justify-between gap-5">
                <div className="flex-8 bg-white rounded-sm px-2 py-2">
                    <p className="text-left text-xs text-black/50">Tên lớp</p>
                    <p className="text-left">{name}</p>
                </div>
                <Link className="flex flex-1 px-2 py-2 rounded-sm justify-center items-center bg-white hover:bg-black/10 cursor-pointer" href={`/classes/${id}`}>
                    <div className="flex">
                        <p className="text-center">Thông tin</p>
                    </div>
                </Link>
                <div className="flex flex-1 rounded-sm px-2 py-1 justify-center items-center bg-white hover:bg-red-300 cursor-pointer">
                    <p className="text-center">Xóa lớp</p>
                </div>
            </span >
            <span className="flex flex-row justify-between gap-5">
                <div className="flex flex-1 flex-col bg-white rounded-sm px-2 py-2">
                    <p className="text-left text-xs text-black/50">Mã lớp</p>
                    <p className="text-left">{id}</p>
                </div>
                <div className="flex flex-1 flex-col bg-white rounded-sm px-2 py-2">
                    <p className="text-left text-xs text-black/50">Số lượng học sinh</p>
                    <p className="text-left">{student_count} học sinh</p>
                </div>
                <div className="flex flex-1 flex-col bg-white rounded-sm px-2 py-2">
                    <p className="text-left text-xs text-black/50">Phí buổi học</p>
                    <p className="text-left">{VNDFormat(section_fee)}</p>
                </div>
                <div className="flex flex-1 flex-col bg-white rounded-sm px-2 py-2">
                    <p className="text-left text-xs text-black/50">Số buổi học hiện tại</p>
                    <p className="text-left">{section_count} buổi</p>
                </div>
            </span>
        </div >
    );
}