import Sidebar from "../components/Sidebar";
import "./global.css";
import { inter } from '@/utils/fonts'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <body className={`${inter.className} overflow-x-hidden min-w-screen min-h-screen`}>
                <div className="h-screen rounded-xl flex flex-row bg-(--light-gray)">
                    <Sidebar />
                    {children}
                </div>
            </body>
        </html>
    );
}