import { useState } from "react";
import ProfileForm from "@/features/user/profile/component/ProfileForm.tsx";
import { Button } from "@/components/ui/button";
import { MdCancel } from "react-icons/md";
import { AVATAR } from "@/shared/constant";
import { useUpdateProfileMutation } from "../api";
import { Loader } from "@/components/common/Loader";
interface AvatarProps {
  openerId: number;
  displayName: string;
  bio: string;
  location: string;
  avatarUrl: string;
  username?: string;
  isMine: boolean;
}

export const Avatar: React.FC<AvatarProps> = (userInfo) => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayName, setDisplayName] = useState(userInfo.displayName);
  const [bio, setBio] = useState(userInfo.bio);
  const [location, setLocation] = useState(userInfo.location);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const openModal = () => {
    setDisplayName(userInfo.displayName);
    setBio(userInfo.bio);
    setLocation(userInfo.location);
    setIsOpen(true); // Mở modal
  };

  const handleSave = async () => {
    try {
      await updateProfile({
        openerId: userInfo.openerId,
        displayName,
        bio,
        location,
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="h-48 bg-gradient-to-r from-pink-400 to-purple-600"></div>
      <div className="relative px-6">
        <div className="absolute -top-16">
          <img
            className="w-32 h-32 rounded-full border-4 border-white"
            src={userInfo.avatarUrl || AVATAR} // Sử dụng avatar từ state
            alt="Avatar"
          />
        </div>
        {userInfo.isMine && (
          <div className="text-right pt-6">
            <button
              onClick={openModal}
              className="px-4 py-1 text-sm border rounded-full font-medium hover:bg-gray-100"
            >
              Edit profile
            </button>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white pt-16 pb-8 px-6 rounded-2xl shadow-2xl w-full max-w-md relative">
            <Button
              className="absolute top-2 left-2 cursor-pointer"
              onClick={() => {
                setIsOpen(false);
              }}
              variant="ghost"
            >
              <MdCancel />
            </Button>
            <div className="absolute -top-12 left-1/2 -translate-x-1/2">
              <img
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                src={userInfo.avatarUrl || AVATAR}
                alt="Avatar"
              />
            </div>

            <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
              Chỉnh sửa hồ sơ
            </h2>
            <ProfileForm
              displayName={displayName}
              bio={bio}
              location={location}
              setDisplayName={setDisplayName}
              setBio={setBio}
              setLocation={setLocation}
              onSave={handleSave}
            />
          </div>
        </div>
      )}
    </>
  );
};
