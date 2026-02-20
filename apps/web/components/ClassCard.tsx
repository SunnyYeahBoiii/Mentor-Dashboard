
import { VNDFormat } from "@/utils/funcs";

interface ClassCardProps {
    id: string;
    name: string;
    section_count: number;
    section_fee: number;
    student_count: number;
}

export function ClassCard({ id, name, section_count, section_fee, student_count }: ClassCardProps) {
    return (
        <div className="w-full rounded-xl bg-(--dark-white) flex flex-col justify-between px-4 py-6 gap-5">
            <span className="flex flex-row justify-between gap-5">
                <div className="flex-8 bg-white rounded-sm px-2 py-1">
                    <p className="text-left text-xs text-black/50">Tên lớp</p>
                    <p className="text-left ml-2">{name}</p>
                </div>
                <div className="flex flex-1 rounded-sm px-2 py-1 justify-center items-center bg-white hover:bg-black/10 cursor-pointer">
                    <p className="text-center">Chỉnh sửa</p>
                </div>
                <div className="flex flex-1 rounded-sm px-2 py-1 justify-center items-center bg-red-300 hover:bg-red-500 cursor-pointer">
                    <p className="text-center">Xóa lớp</p>
                </div>
            </span >
            <span className="flex flex-row justify-between gap-5">
                <div className="flex flex-1 flex-col bg-white rounded-sm px-2 py-1">
                    <p className="text-left text-xs text-black/50">Mã lớp</p>
                    <p className="text-left ml-2">{id}</p>
                </div>
                <div className="flex flex-1 flex-col bg-white rounded-sm px-2 py-1">
                    <p className="text-left text-xs text-black/50">Số lượng học sinh</p>
                    <p className="text-left ml-2">{student_count} học sinh</p>
                </div>
                <div className="flex flex-1 flex-col bg-white rounded-sm px-2 py-1">
                    <p className="text-left text-xs text-black/50">Phí buổi học</p>
                    <p className="text-left ml-2">{VNDFormat(section_fee)}</p>
                </div>
                <div className="flex flex-1 flex-col bg-white rounded-sm px-2 py-1">
                    <p className="text-left text-xs text-black/50">Số buổi học hiện tại</p>
                    <p className="text-left ml-2">{section_count} buổi</p>
                </div>
            </span>
        </div >
    );
}