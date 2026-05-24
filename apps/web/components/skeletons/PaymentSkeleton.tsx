import { lusitana } from "@/utils/fonts";
import { FaSearch } from "react-icons/fa";
import { Skeleton } from "@/components/ui/skeleton";

export default function PaymentSkeleton() {
    return (
        <div className="w-4/5 m-2 ml-0">
            <h3 className={`${lusitana.className} text-2xl my-4 mb-6`}>Thanh toán học phí</h3>
            <div className="flex flex-row justify-between gap-2">
                <div className="flex-7 px-3 py-2 flex flex-row items-center border rounded-md">
                    <FaSearch className="opacity-50" />
                    <Skeleton className="ml-1 h-5 w-40 rounded-xl" />
                </div>
            </div>
            <div className="flex flex-col my-8 p-2 bg-(--dark-white) rounded-xl">
                <div className="flex flex-row justify-between">
                    <p className="w-[40%] text-center">Họ tên</p>
                    <p className="w-[20%] text-center">Số buổi học</p>
                    <p className="w-[30%] text-center">Học phí còn lại</p>
                    <p className="w-[10%] text-center">Thanh toán</p>
                </div>
                <div className="bg-white flex flex-col rounded-xl mt-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="flex flex-row py-3 border-black/10 border-b">
                            <Skeleton className="w-[40%] h-5 mx-auto" />
                            <Skeleton className="w-[20%] h-5 mx-auto" />
                            <Skeleton className="w-[30%] h-5 mx-auto" />
                            <Skeleton className="w-[10%] h-5 mx-auto" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
