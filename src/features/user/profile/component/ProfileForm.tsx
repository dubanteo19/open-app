import { FC } from "react";

interface ProfileFormProps {
  displayName: string;
  bio: string;
  location: string;
  setDisplayName: (name: string) => void;
  setBio: (bio: string) => void;
  setLocation: (location: string) => void;
  onSave: () => void;
}

const ProfileForm: FC<ProfileFormProps> = ({
  displayName,
  bio,
  location,
  setDisplayName,
  setBio,
  setLocation,
  onSave,
}) => {
  return (
    <div className="space-y-6">
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tên
        </label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400 transition duration-200 ease-in-out"
          placeholder="Nhập tên của bạn"
        />
      </div>

      {/* BIO */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          BIO
        </label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={3}
          placeholder="Giới thiệu ngắn gọn về bạn..."
          className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400 resize-none transition duration-200 ease-in-out"
        />
      </div>

      {/* Địa điểm */}
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Địa điểm
        </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400 transition duration-200 ease-in-out"
          placeholder="Nhập địa điểm của bạn"
        />
      </div>

      <div className="flex justify-end gap-3 mt-8">
        <button
          onClick={() => onSave()}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          Lưu
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;
