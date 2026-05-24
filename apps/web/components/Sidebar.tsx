"use client";
import "../app/global.css";
import { Button } from "@/components/ui/button";
import { lusitana } from "@/utils/fonts";
import { SlPeople } from "react-icons/sl";
import { SlNote } from "react-icons/sl";
import { SlNotebook } from "react-icons/sl";
import { FaCashRegister, FaPlus, FaSignOutAlt, FaUser , FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

const icons = [(< SlPeople />), (< SlNote />), (< SlNotebook />), (< FaCashRegister />)];
const buttonTexts: string[] = ["Học Sinh", "Lớp Học", "Buổi Học", "Học Phí"];
const links: string[] = ["/students?page=1", "/classes?page=1", "/sessions", "/payments?page=1"];

const current_icons = [(< SlNote />), (< FaPlus />), (<FaGoogle />)];
const current_buttonTexts: string[] = ["Buổi học hiện tại", "Thêm buổi học", "Đăng nhập Google"];
const current_links: string[] = ["/current-sessions", "/current-sessions/add-session", process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/google"];

export default function Sidebar() {
    const pathname = usePathname();

    const isActive = (link: string) => {
        const basePath = link.split("?")[0] ?? "";
        return pathname.startsWith(basePath);
    };

    return (
        <div className="sticky flex flex-col w-1/5 bg-(--blue) rounded-tr-xl rounded-br-xl py-6 mr-4">
            <div className="flex-1 flex flex-col w-full justify-center">
                <h1 className={`${lusitana.className} text-center text-2xl text-(--sidebar-font) font-bold`}>Mentor Dashboard</h1>
                <div className="flex-1 flex flex-col justify-between">
                    <div className="flex flex-col w-full justify-center items-center gap-5 mt-5">
                        {buttonTexts.map((text, index) => (
                            <Link href={links[index] as string} key={text} className="w-[80%]">
                                <Button
                                    variant={isActive(links[index] as string) ? "default" : "outline"}
                                    className="w-full justify-start gap-2 px-4 py-6 text-base shadow-lg bg-linear-to-r from-(--blue-light) to-(--blue-lighter) text-(--sidebar-font) hover:scale-[1.05] hover:shadow-none active:scale-[0.95] transition-all duration-200"
                                >
                                    {icons[index]}
                                    {text}
                                </Button>
                            </Link>
                        ))}
                    </div>

                    <div className="flex flex-col w-full justify-center items-center gap-5 mt-5">
                        {current_buttonTexts.map((text, index) => (
                            <Link href={current_links[index] as string} key={text} className="w-[80%]">
                                <Button
                                    variant={isActive(current_links[index] as string) ? "default" : "outline"}
                                    className="w-full justify-start gap-2 px-4 py-6 text-base shadow-lg bg-linear-to-r from-(--blue-light) to-(--blue-lighter) text-(--sidebar-font) hover:scale-[1.05] hover:shadow-none active:scale-[0.95] transition-all duration-200"
                                >
                                    {current_icons[index]}
                                    {text}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
}
