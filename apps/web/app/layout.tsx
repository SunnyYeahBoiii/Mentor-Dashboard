import Sidebar from "../components/Sidebar";
import "./global.css";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <body className="w-screen h-screen flex justify-center items-center bg-(--bg-color)">
                <div className="shadow-2xl w-[95%] h-[95%] rounded-xl flex flex-row bg-(--light-gray)">
                    <Sidebar />
                    {children}
                </div>
            </body>
        </html>
    );
}