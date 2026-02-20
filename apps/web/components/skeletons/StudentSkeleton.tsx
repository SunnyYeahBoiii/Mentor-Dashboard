import { lusitana } from "@/utils/fonts";
import clsx from "clsx";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

export default function StudentSkeleton() {
    return (
        <div className="w-4/5 m-2 ml-0">
            <h3 className={`${lusitana.className} text-2xl my-4 mb-6`}>Danh sách học sinh</h3>
            <div className="flex flex-row justify-between gap-2">
                <div className="flex-7 px-3 py-2 flex flex-row items-center border rounded-md">
                    <FaSearch className="opacity-50" />
                    <input placeholder="Tìm kiếm" className="w-full ml-1 border-none outline-none rounded-xl pl-1" />
                </div>
                <div className="flex-3 rounded-lg bg-(--blue-light) flex flex-row justify-center">
                    <div className="w-full opacity-50 hover:opacity-100 cursor-pointer flex flex-row justify-around items-center px-8">
                        <p className="text-white">Thêm học sinh</p>
                        <p className="text-white">+</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col my-8 p-2 bg-(--dark-white) rounded-xl">
                <div className="flex flex-row justify-between">
                    <p className="w-[25%] text-center">Họ tên</p>
                    <p className="w-[10%] text-center">Năm sinh</p>
                    <p className="w-[40%] text-center">Trường</p>
                    <p className="w-[15%] text-center">Tỉnh</p>
                    <p className="w-[10%] text-center"></p>
                </div>
                <div className="bg-white no-scrollbar flex flex-col rounded-xl mt-2">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} className={`flex flex-row py-6 border-black/10  ${index < 9 ? 'border-b' : 'border-none'}`}>
                            <p className="w-[25%] text-center"></p>
                            <p className="w-[10%] text-center"></p>
                            <p className="w-[40%] text-center"></p>
                            <p className="w-[15%] text-center"></p>
                            <p className="w-[10%] text-center flex flex-row justify-center items-center"></p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-row justify-center items-center">
                <div className="flex flex-row">
                    <IoIosArrowRoundBack className={clsx("text-4xl px-1 py-1 bg-white rounded-sm mr-1 cursor-pointer")} />
                    {Array.from({ length: 6 }, (_, i) => i + 1).map((p) => (
                        <button key={p} className={clsx("w-10 border cursor-pointer flex flex-row justify-center items-center px-2 py-1 hover:bg-black/10 hover:border rounded-sm mx-1 border-transparent")}>{p}</button>
                    ))}
                    <IoIosArrowRoundForward className={clsx("text-4xl px-1 py-1 bg-white rounded-sm ml-1 cursor-pointer")} />
                </div>

            </div>
        </div >
    );
}