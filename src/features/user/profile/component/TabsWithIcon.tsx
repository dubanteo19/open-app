import { useState } from "react";

import { useParams } from "react-router-dom";
import { Loader } from "@/components/common/Loader";
import { useGetOpenerPostsQuery } from "../../feed/api";
import { PostList } from "../../feed/components/PostList";

function Tweets() {
  return <PostList />;
}

function Likes() {
  return <PostList />;
}

const tabs = [
  {
    label: "Tweets",
    icon: "hello",
    content: <Tweets />,
  },
  {
    label: "Likes",
    icon: "test",
    content: <Likes />,
  },
];
export function TabsWithIcon() {
  const { username } = useParams();
  const { data: posts, isLoading } = useGetOpenerPostsQuery({
    username: username,
    page: {
      page: 0,
      size: 10,
    },
  });
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="w-full mt-2">
      {isLoading && <Loader />}
      {/* Tab header */}
      <div className="flex border-b w-full">
        {tabs.map((tab, index) => {
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
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="my-2 w-full">{tabs[activeTab].content}</div>
      {posts && <PostList posts={posts.content} />}
    </div>
  );
}
