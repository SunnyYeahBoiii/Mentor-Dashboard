import { AddPaymentForm } from "@/components/AddPaymentForm";
import { lusitana } from "@/utils/fonts";

export default async function AddPaymentPage({
    params,
}: {
    params: Promise<{ student_id: string }>;
}) {
    const { student_id } = await params;

    return (
        <div className="w-4/5 m-2 ml-0">
            <h3 className={`${lusitana.className} text-2xl my-4 mb-6`}>
                Thanh toán học phí
            </h3>
            <AddPaymentForm student_id={student_id} />
        </div>
    );
}
