import { useState } from "react";

import { PostList } from "@/features/user/feed/pages/PostList.tsx";

function Tweets() {
  return <PostList />;
}

function Likes() {
  return <PostList />;
}

const tabs = [
  {
    label: "Tweets",
    icon: "heelo",
    content: <Tweets />,
  },
  {
    label: "Likes",
    icon: "test",
    content: <Likes />,
  },
];
export function TabsWithIcon() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full bg-white shadow-md">
      {/* Tab header */}
      <div className="flex border-b w-full">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          return (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex justify-center w-1/2 items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-all duration-200
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
      <div className="p-5 w-full">{tabs[activeTab].content}</div>
    </div>
  );
}
