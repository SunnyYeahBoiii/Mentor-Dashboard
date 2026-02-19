'use client'

import { lusitana } from "@/utils/fonts";

import { students as Students } from "@/utils/mock-data";
import { studentCreateDto } from "@/dtos/student.dto";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";

import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

export default function StudentPage() {
    const students = Students.slice(0, 8);

    return (
        <div className="w-4/5 m-2 ml-0">
            <h3 className={`${lusitana.className} text-2xl my-4 mb-6`}>Danh sách học sinh</h3>
            <div className="flex flex-row justify-between">
                <div className="w-[68%] px-3 py-2 flex flex-row items-center border rounded-md">
                    <FaSearch className="opacity-50" />
                    <input placeholder="Tìm kiếm" className="ml-1 border-none outline-none rounded-xl pl-1" />
                </div>
                <div className="rounded-lg bg-(--blue-light) w-[30%] flex flex-row justify-center">
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
                    {students.map((student: studentCreateDto, index) => (
                        <div key={student.id} className={`flex flex-row py-3 border-black/10  ${index < students.length - 1 ? 'border-b' : 'border-none'}`}>
                            <p className="w-[25%] text-center">{student.lastName} {student.middleName} {student.firstName}</p>
                            <p className="w-[10%] text-center">{student.birthyear}</p>
                            <p className="w-[40%] text-center">{student.school}</p>
                            <p className="w-[15%] text-center">{student.province}</p>
                            <p className="w-[10%] text-center flex flex-row justify-center items-center">
                                <FaEdit className="text-2xl px-1 py-1 text-black/50 hover:text-black cursor-pointer" />
                                <FaTrash className="text-2xl px-1 py-1 bg-white text-black/50 hover:text-red-500 cursor-pointer" />
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-row justify-center items-center">
                <div className="flex flex-row">
                    <IoIosArrowRoundBack className="text-4xl px-1 py-1 bg-white rounded-sm mr-1" />
                    <p className="flex flex-row justify-center items-center px-2 py-1 bg-white rounded-sm mx-1">1</p>
                    <p className="flex flex-row justify-center items-center px-2 py-1 bg-white rounded-sm mx-1">2</p>
                    <p className="flex flex-row justify-center items-center px-2 py-1 bg-white rounded-sm mx-1">3</p>
                    <p className="flex flex-row justify-center items-center px-2 py-1 bg-white rounded-sm mx-1">4</p>
                    <p className="flex flex-row justify-center items-center px-2 py-1 bg-white rounded-sm mx-1">5</p>
                    <p className="flex flex-row justify-center items-center px-2 py-1">...</p>
                    <p className="flex flex-row justify-center items-center px-2 py-1 bg-white rounded-sm mx-1">99</p>
                    <IoIosArrowRoundForward className="text-4xl px-1 py-1 bg-white rounded-sm ml-1" />
                </div>
            </div>
        </div >
    );
}