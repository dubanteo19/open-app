import { formatTime } from "@/lib/utils";
import { OpenerDetail } from "@/types/user";
import { FaUsersRectangle } from "react-icons/fa6";
import { GoLocation } from "react-icons/go";
import { MdVerified } from "react-icons/md";

export const UserInfo: React.FC<OpenerDetail> = (userInfo) => (
  <div className=" mx-auto px-6  bg-white dark:bg-gray-900 shadow-md">
    <div className="flex items-center space-x-2">
      <h1 className="text-3xl font-semibold ">
        {userInfo.summary.displayName}
      </h1>
      {userInfo.summary.verified && <MdVerified color="green" />}
    </div>
    <p className="text-gray-600 text-sm">@{userInfo.summary.username}</p>
    <p className="text-gray-700 mt-4 wrap-break-word max-w-[500px] max-h-30 overflow-auto ">
      {userInfo.bio}
    </p>
    <div className="flex flex-wrap gap-6 mt-6 text-sm  text-gray-500">
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
