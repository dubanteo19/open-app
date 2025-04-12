import { useState } from "react";

import {
    ChatBubbleLeftRightIcon,
    HeartIcon,
} from "@heroicons/react/24/outline";

function Tweets() {
    return null;
}

function Likes() {
    return null;
}

const tabs = [
    {
        label: "Tweets",
        icon: ChatBubbleLeftRightIcon,
        content: <Tweets />,
    },
    {
        label: "Likes",
        icon: HeartIcon,
        content: <Likes />,
    },
];
export function TabsWithIcon() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="w-full mx-auto mt-8 p-4 bg-white border rounded-xl shadow-md">
            {/* Tab header */}
            <div className="flex border-b">
                {tabs.map((tab, index) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={index}
                            onClick={() => setActiveTab(index)}
                            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-all duration-200
                ${
                                activeTab === index
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-blue-500"
                            }`}
                        >
                            <Icon className="w-5 h-5" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Tab content */}
            <div className="p-5">{tabs[activeTab].content}</div>
        </div>
    );
}