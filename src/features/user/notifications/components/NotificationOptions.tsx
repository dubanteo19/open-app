import { useState, useRef, useEffect } from "react";

interface NotificationOptionsProps {
    onMarkAsRead: () => void;
    onDelete: () => void;
}

const NotificationOptions = ({ onMarkAsRead, onDelete }: NotificationOptionsProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="p-1 rounded-full hover:bg-gray-200">
                <span className="text-xl font-bold">⋮</span> {/* Ba chấm dọc */}
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white border rounded-md shadow-md z-10">
                    <button
                        onClick={() => {
                            onMarkAsRead();
                            setIsOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                        Đánh dấu đã đọc
                    </button>
                    <button
                        onClick={() => {
                            onDelete();
                            setIsOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                        Xóa thông báo
                    </button>
                </div>
            )}
        </div>
    );
};

export default NotificationOptions;
