export const UserInfo = ({
                             userInfo,
                         }: {
    userInfo: {
        name: string;
        username: string;
        bio: string;
        location: string;
        joinDate: string;
        following: number;
        followers: number;
    };
}) => (
    <div className=" mx-auto px-6 py-2 bg-white shadow-md">
        {/* Tên người dùng và tên hiển thị */}
        <h1 className="text-3xl font-semibold text-gray-900">{userInfo.name}</h1>
        <p className="text-gray-600 text-sm">@{userInfo.username}</p>

        {/* Bio */}
        <p className="text-gray-700 mt-4">{userInfo.bio}</p>

        {/* Thông tin về location và ngày gia nhập */}
        <div className="flex flex-wrap gap-6 mt-6 text-sm text-gray-500">
            <span className="flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 2a6 6 0 016 6c0 3.1-2.3 5.8-5.5 6.9a4.5 4.5 0 00-1 .4V13a1 1 0 10-2 0v1.3c-.2-.1-.5-.2-.7-.3C6.3 13.8 4 11.1 4 8a6 6 0 016-6zm0 8a2 2 0 110-4 2 2 0 010 4z"
                        clipRule="evenodd"
                    />
                </svg>
                {userInfo.location}
            </span>
            <span className="flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M3 5a3 3 0 013-3h10a3 3 0 013 3v10a3 3 0 01-3 3H6a3 3 0 01-3-3V5z"
                        clipRule="evenodd"
                    />
                </svg>
                Joined {userInfo.joinDate}
            </span>
        </div>

        {/* Thông tin về số lượng followers và following */}
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
