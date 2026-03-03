import "../app/global.css";
import Button from "./Button";
import { lusitana } from "@/utils/fonts";
import { SlPeople } from "react-icons/sl";
import { SlNote } from "react-icons/sl";
import { SlNotebook } from "react-icons/sl";
import { FaCashRegister, FaPlus, FaSignOutAlt, FaUser , FaGoogle } from "react-icons/fa";

const icons = [(< SlPeople />), (< SlNote />), (< SlNotebook />), (< FaCashRegister />)];
const buttonTexts: string[] = ["Học Sinh", "Lớp Học", "Buổi Học", "Học Phí"];
const links: string[] = ["/students?page=1", "/classes?page=1", "/sessions", "/payments?page=1"];

const current_icons = [(< SlNote />), (< FaPlus />), (<FaGoogle />)];
const current_buttonTexts: string[] = ["Buổi học hiện tại", "Thêm buổi học", "Đăng nhập Google"];
const current_links: string[] = ["/current-sessions", "/current-sessions/add-session", process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/google"];

export default function Sidebar() {
    return (
        <div className="sticky flex flex-col w-1/5 bg-(--blue) rounded-tr-xl rounded-br-xl py-6 mr-4">
            <div className="flex-1 flex flex-col w-full justify-center">
                <h1 className={`${lusitana.className} text-center text-2xl text-(--sidebar-font) font-bold`}>Mentor Dashboard</h1>
                <div className="flex-1 flex flex-col justify-between">
                    <div className="flex flex-col w-full justify-center items-center gap-5 mt-5">
                        {buttonTexts.map((text, index) => (
                            <Button icon={icons[index]} text={text} key={text} link={links[index] as string} />
                        ))}
                    </div>

                    <div className="flex flex-col w-full justify-center items-center gap-5 mt-5">
                        {current_buttonTexts.map((text, index) => (
                            <Button icon={current_icons[index]} text={text} key={text} link={current_links[index] as string} />
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
}
