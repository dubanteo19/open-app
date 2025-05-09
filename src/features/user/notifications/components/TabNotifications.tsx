import { FaBell } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import {useState} from "react";
import AllNotifications from "@/features/user/notifications/components/AllNotifications.tsx";
import UnreadNotifications from "@/features/user/notifications/components/UnreadNotifications.tsx";

const notificationTabs = [
    {
        label: "Tất cả",
        icon: <FaBell />,
        component: <AllNotifications />,
    },
    {
        label: "Chưa đọc",
        icon: <GoDotFill />,
        component: <UnreadNotifications />,
    },
];

const TabNotifications = () => {
    const [activeTab, setActiveTab] = useState(0);
    const ActiveComponent = notificationTabs[activeTab].component;
    return (
        <div className="flex flex-col h-full w-full bg-white shadow-md rounded-md">

            <div className="flex w-full border-b">
                {notificationTabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className={`flex justify-center w-1/2 items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-all duration-200
              ${activeTab === index
                            ? "border-blue-500 text-blue-600"
                            : "border-transparent text-gray-500 hover:text-blue-500"}`}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="p-4">
                {ActiveComponent}
            </div>
        </div>
    );
};

export default TabNotifications;