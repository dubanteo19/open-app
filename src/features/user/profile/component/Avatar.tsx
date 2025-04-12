import { useState } from "react";
import ProfileForm from "@/features/user/profile/component/ProfileForm.tsx";
interface UserInfo {
    name: string;
    bio: string;
    location: string;
    avatar: string;
    username?: string;  // Nếu bạn muốn truyền thêm username, bạn có thể thêm thuộc tính này
}

export const Avatar = ({ userInfo, onSave }: { userInfo: UserInfo; onSave: (newData: UserInfo) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState(userInfo.name);
    const [bio, setBio] = useState(userInfo.bio);
    const [location, setLocation] = useState(userInfo.location);
    const [avatar, setAvatar] = useState(userInfo.avatar);

    const openModal = () => {
        // Nạp dữ liệu giả vào form khi mở popup
        setName(userInfo.name);
        setBio(userInfo.bio);
        setLocation(userInfo.location);
        setAvatar(userInfo.avatar);
        setIsOpen(true); // Mở modal
    };

    const handleSave = () => {
        const newData = { name, bio, location, avatar };
        console.log("Dữ liệu lưu:", newData);
        onSave(newData);
        setIsOpen(false); // Đóng modal sau khi lưu
    };

    return (
        <>
            <div className="h-48 bg-gradient-to-r from-pink-400 to-purple-600"></div>

            <div className="relative px-6">
                <div className="absolute -top-16">
                    <img
                        className="w-32 h-32 rounded-full border-4 border-white"
                        src={avatar}  // Sử dụng avatar từ state
                        alt="Avatar"
                    />
                </div>
                <div className="text-right pt-6">
                    <button
                        onClick={openModal}
                        className="px-4 py-1 text-sm border rounded-full font-medium hover:bg-gray-100"
                    >
                        Edit profile
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
                    <div className="bg-white pt-16 pb-8 px-6 rounded-2xl shadow-2xl w-full max-w-md relative">
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                            <img
                                className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                                src={avatar}  // Sử dụng avatar từ state
                                alt="Avatar"
                            />
                        </div>

                        <h2 className="text-xl font-bold text-center text-gray-800 mb-6">Chỉnh sửa hồ sơ</h2>

                        <ProfileForm
                            name={name}
                            bio={bio}
                            location={location}
                            setName={setName}
                            setBio={setBio}
                            setLocation={setLocation}
                            onSave={handleSave}
                        />
                    </div>
                </div>
            )}
        </>
    );
};
