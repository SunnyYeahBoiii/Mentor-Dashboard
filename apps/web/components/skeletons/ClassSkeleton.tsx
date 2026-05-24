import { lusitana } from "@/utils/fonts";
import { FaSearch } from "react-icons/fa";
import { Skeleton } from "@/components/ui/skeleton";

export default function ClassSkeleton() {
    return (
        <div className="w-4/5 m-2 ml-0">
            <h3 className={`${lusitana.className} text-2xl my-4 mb-6`}>Danh sách lớp</h3>
            <div className="flex flex-row justify-between my-4 gap-2">
                <div className="flex-7 px-3 py-2 flex flex-row items-center border rounded-md">
                    <FaSearch className="opacity-50" />
                    <Skeleton className="ml-1 h-5 w-40 rounded-xl" />
                </div>
                <Skeleton className="flex-3 h-10 rounded-lg bg-(--blue-light)" />
            </div>
            <div className="flex flex-col gap-2 my-8">
                {Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton key={index} className="h-20 rounded-xl" />
                ))}
            </div>
        </div>
    );
}
