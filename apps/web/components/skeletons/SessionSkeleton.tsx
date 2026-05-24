import { lusitana } from "@/utils/fonts";
import { Skeleton } from "@/components/ui/skeleton";

export default function SessionSkeleton() {
    return (
        <div className="w-4/5 m-2 ml-0">
            <h3 className={`${lusitana.className} text-2xl my-4 mb-6`}>Danh sách buổi học</h3>
            <div className="flex flex-col gap-2 my-8">
                {Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton key={index} className="h-20 rounded-xl" />
                ))}
            </div>
        </div>
    );
}
