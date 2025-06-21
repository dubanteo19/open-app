import { logout } from "@/features/auth/slice";
import { useAppSelector } from "@/hooks/useAppDispatch";
import { cn, uuid } from "@/lib/utils";
import { AVATAR } from "@/shared/constant";
import { RootState } from "@/shared/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import React, { ReactNode } from "react";
import { FaHashnode, FaUser } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { IoIosMore } from "react-icons/io";
import { IoBookmark, IoMail, IoNotificationsSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ImageContainer } from "../common/ImageContainer";
import { Button } from "../ui/button";
interface SideBarLinkProps {
  href: string;
  name: string;
  active?: boolean;
  count?: number;
  icon: ReactNode;
}
const SideBarLink: React.FC<SideBarLinkProps> = ({
  href,
  name,
  active,
  icon,
  count = 0,
}) => {
  const isLg = useMediaQuery({ minWidth: 1024 });
  return (
    <div className={cn("flex", active && "text-primary")}>
      <Link className="flex items-center gap-x-4 py-2 lg:py-0" to={href}>
        <div className="relative">
          <div>{icon}</div>
          {count > 0 && (
            <div
              className="absolute flex-center text-sm -right-1 -top-1 bg-red-500 size-[16px] 
            text-center rounded-full text-white  "
            >
              {count}
            </div>
          )}
        </div>
        {isLg && <h3>{name}</h3>}
      </Link>
    </div>
  );
};

interface Props {
  className?: string;
}
export const LeftSideBar: React.FC<Props> = ({ className }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const meta = useAppSelector((state) => state.userMeta);
  const links: SideBarLinkProps[] = [
    { name: "Home", href: "/feed", icon: <GoHomeFill size={25} /> },
    { name: "Explore", href: "/explore", icon: <FaHashnode size={25} /> },
    {
      name: "Notifications",
      href: "/notifications",
      icon: <IoNotificationsSharp size={25} />,
      count: meta.unreadNotificationCount,
    },
    {
      name: "Messages",
      href: "/messages",
      icon: <IoMail size={25} />,
      count: meta.unseenConversationCount,
    },
    { name: "Bookmarks", href: "/bookmarks", icon: <IoBookmark size={25} /> },
    {
      name: "Profile",
      href: `/profile/${user?.username}`,
      icon: <FaUser size={25} />,
    },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div
      className={cn("flex flex-col  justify-between py-2 h-screen ", className)}
    >
      <div className="w-full">
        <div className="size-10">
          <Link to={"/feed"}>
            <img className="h-max w-max" src={"/logo2.png"} />
          </Link>
        </div>
        <div className="mt-2">
          {links.map((link) => (
            <SideBarLink
              {...link}
              key={uuid()}
              active={location.pathname.startsWith(link.href)}
            />
          ))}
        </div>
        <div className="mr-8">
          <Button className="px-[6px] lg:rounded-full lg:w-full lg:py-5 ">
            Post
          </Button>
        </div>
      </div>
      <div className=" space-x-2 justify-between items-center flex">
        <div className=" space-x-2 items-center hidden lg:flex ">
          <ImageContainer className="size-10" src={user?.avatarUrl || AVATAR} />
          <div className="flex flex-col">
            <h4 className="font-bold">{user?.displayName}</h4>
            <Link to={`/profile/${user?.username}`}>
              <p>@{user?.username}</p>
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <ImageContainer
            className="size-10 lg:hidden"
            src={user?.avatarUrl || AVATAR}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"}>
                <IoIosMore />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-10 bg-white">
              <DropdownMenuLabel>My account</DropdownMenuLabel>
              <DropdownMenuItem>
                <Button variant="ghost" onClick={handleLogout}>
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
