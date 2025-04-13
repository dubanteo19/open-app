import { Button } from "@/components/ui/button";
import { uuid } from "@/lib/utils";
import React from "react";
import { recommendedFollowUsers } from "./data";
import { Link } from "react-router-dom";
import { User } from "@/types/user";

const UserCard: React.FC<User> = ({ displayName, avatar, userName }) => {
  return (
    <div className="grid grid-cols-5 mr-2">
      <div className="col-span-1 w-12 bg-red-500 h-12 overflow-hidden rounded-full ">
        <img src={avatar} />
      </div>
      <div className="col-span-3">
        <strong>{displayName}</strong>
        <p className="text-gray-500">@{userName}</p>
      </div>
      <div className="col-span-1 ">
        <Button variant="outline" size="sm" className="rounded-full font-bold">
          Follow
        </Button>
      </div>
    </div>
  );
};
export const RecommendedFollows = () => {
  return (
    <div className="bg-gray-100 rounded-2xl p-y-2 px-4">
      <h3 className="my-1">Who to follow</h3>
      <div className="flex flex-col space-y-2 mt-2">
        {recommendedFollowUsers.map((user) => (
          <UserCard key={uuid()} {...user} />
        ))}
      </div>
      <div className="mt-4">
        <Link className="text-primary " to={"/more"}>
          Show more
        </Link>
      </div>
    </div>
  );
};
