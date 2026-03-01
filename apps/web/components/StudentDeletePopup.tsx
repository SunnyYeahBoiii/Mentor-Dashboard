
interface StudentDeletePopupProps {
    studentName: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export function StudentDeletePopup({ studentName, onConfirm, onCancel }: StudentDeletePopupProps) {
    return (
        <div>
            <h3>Xác nhận</h3>
            
        </div>
    );
}