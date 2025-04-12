export const Avatar = () => (
    <>
        <div className="h-48 bg-gradient-to-r from-pink-400 to-purple-600"></div>

        {/* Avatar + Edit button */}
        <div className="relative px-6">
            <div className="absolute -top-16">
                <img
                    className="w-32 h-32 rounded-full border-4 border-white"
                    src="https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Hinh-dai-dien-hai-huoc-cam-dep-duoi-ai-do.jpg?1704789789335" // Replace with real avatar
                    alt="Avatar"
                />
            </div>
            <div className="text-right pt-6">
                <button className="px-4 py-1 text-sm border rounded-full font-medium hover:bg-gray-100">
                    Edit profile
                </button>
            </div>
        </div>
    </>
);
