import React from "react";
import { Link } from "react-router-dom";
import { newsItems } from "./data";
import { uuid } from "@/lib/utils";

export interface NewsCardProps {
  id: number;
  topic: string;
  dateTime: string;
  title: string;
  hashTag: string;
  thumbnail: string;
}
const NewsCard: React.FC<NewsCardProps> = ({
  id,
  topic,
  dateTime,
  title,
  hashTag,
  thumbnail,
}) => {
  return (
    <div className="grid grid-cols-4 py-2 border-b-1 border-b-gray-300">
      <div className="col-span-3 flex flex-col">
        <div className="text-sm text-gray-500">
          {topic}-{dateTime}
        </div>
        <p className="font-bold">{title}</p>
        <small>
          Trending with{" "}
          <Link className="text-blue-500" to={`/hash/${id}`}>
            {hashTag}
          </Link>
        </small>
      </div>
      <div className="col-span-1">
        <div className="w-15 h-15 rounded-2xl overflow-hidden">
          <img className="w-full h-full" src={thumbnail} />
        </div>
      </div>
    </div>
  );
};
export const News = () => {
  return (
    <div className="bg-gray-100 rounded-2xl p-2">
      <h3 className="my-1">What's happening</h3>
      <div>
        {newsItems.map((item) => (
          <NewsCard {...item} key={uuid()} />
        ))}
      </div>
    </div>
  );
};
