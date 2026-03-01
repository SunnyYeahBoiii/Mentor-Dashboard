import { VNDFormat } from "@/utils/funcs";
import { deleteClassById } from "@/utils/mock-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

interface ClassCardProps {
  id: string;
  name: string;
  section_count: number;
  section_fee: number;
  student_count: number;
}

export function ClassCard({
  id,
  name,
  section_count,
  section_fee,
  student_count,
}: ClassCardProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => deleteClassById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });

  return (
    <div className="w-full rounded-xl bg-(--dark-white) flex flex-col justify-between p-2 gap-2">
      <span className="flex flex-row justify-between gap-5">
        <div className="flex-3 bg-white rounded-sm">
          <div className="m-2">
            <p className="text-left text-xs text-black/50">Tên lớp</p>
            <p className="text-left">{name}</p>
          </div>
        </div>
        <div className="flex flex-1 flex-row gap-5">
          <Link
            className="flex flex-1 px-2 py-2 rounded-sm justify-center items-center bg-white hover:bg-black/10 cursor-pointer"
            href={`/classes/${id}`}
          >
            <p className="text-center">Thông tin</p>
          </Link>
          <div
            className="flex flex-1 rounded-sm px-2 py-2 justify-center items-center bg-white hover:bg-red-300 cursor-pointer"
            onClick={() => mutation.mutate(id)}
          >
            <p className="text-center">Xóa lớp</p>
          </div>
        </div>
      </span>
      <span className="flex flex-row justify-between gap-5">
        <span className="flex flex-3 flex-row gap-5 rounded-md ">
          <div className="flex flex-1 flex-col bg-white rounded-sm px-2 py-2">
            <p className="text-left text-xs text-black/50">Mã lớp</p>
            <p className="text-left whitespace-nowrap overflow-scroll no-scrollbar h-5">
              {id}
            </p>
          </div>
          <div className="flex flex-1 flex-col bg-white rounded-sm px-2 py-2">
            <p className="text-left text-xs text-black/50">Số lượng học sinh</p>
            <p className="text-left">{student_count} học sinh</p>
          </div>
          <div className="flex flex-1 flex-col bg-white rounded-sm px-2 py-2">
            <p className="text-left text-xs text-black/50">Phí buổi học</p>
            <p className="text-left">{VNDFormat(section_fee)}</p>
          </div>
        </span>

        <div className="flex flex-1 flex-row gap-5">
          <div className="flex flex-1 flex-col bg-white rounded-sm px-2 py-2">
            <p className="text-left text-xs text-black/50">
              Số buổi học hiện tại
            </p>
            <p className="text-left">{section_count} buổi</p>
          </div>
        </div>
      </span>
    </div>
  );
}
