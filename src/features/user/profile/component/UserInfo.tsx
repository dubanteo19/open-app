import { formatTime } from "@/lib/utils";
import { OpenerDetail } from "@/types/user";
import { FaUsersRectangle } from "react-icons/fa6";
import { GoLocation } from "react-icons/go";

export const UserInfo: React.FC<OpenerDetail> = (userInfo) => (
  <div className=" mx-auto px-6 py-2 bg-white shadow-md">
    <h1 className="text-3xl font-semibold text-gray-900">
      {userInfo.summary.displayName}
    </h1>
    <p className="text-gray-600 text-sm">@{userInfo.summary.username}</p>
    <p className="text-gray-700 mt-4">{userInfo.bio}</p>
    <div className="flex flex-wrap gap-6 mt-6 text-sm text-gray-500">
      <span className="flex items-center gap-2">
        <GoLocation />
        {userInfo.location}
      </span>
      <span className="flex items-center gap-2">
        <FaUsersRectangle />
        Joined {formatTime(userInfo.joinDate)}
      </span>
    </div>
    <div className="flex gap-8 mt-4 text-sm text-gray-700">
      <span className="font-semibold">
        <strong>{userInfo.following}</strong> Following
      </span>
      <span className="font-semibold">
        <strong>{userInfo.followers}</strong> Followers
      </span>
    </div>
  </div>
);
