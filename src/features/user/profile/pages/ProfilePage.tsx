import {UserInfo} from "@/features/user/profile/component/UserInfo.tsx";
import {Avatar} from "@/features/user/profile/component/Avatar.tsx";
import {TabsWithIcon} from "@/features/user/profile/component/TabsWithIcon.tsx";
import {useState} from "react";


export const ProfilePage = () => {
    const [userInfo, setUserInfo] = useState({
        name: "ABC",
        username: "abc123",
        bio: "Yêu thích công nghệ và du lịch.",
        avatar: "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Hinh-dai-dien-hai-huoc-cam-dep-duoi-ai-do.jpg?1704789789335",
        location: "VietNam",
        joinDate: "September 2025",
        following: 2325,
        followers: 242,
    });

    const updateUserInfo = (newData: { name: string; bio: string; location: string }) => {
        setUserInfo((prev) => ({
            ...prev,
            ...newData,
        }));
    };

    return (
        <div className="w-full overflow-hidden shadow-lg font-sans">
            {/* Truyền hàm updateUserInfo vào Avatar */}
            <Avatar userInfo={userInfo} onSave={updateUserInfo} />
            <UserInfo userInfo={userInfo} />
            <TabsWithIcon />
        </div>
    );
};
