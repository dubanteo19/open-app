import { cn, uuid } from "@/lib/utils";
import React, { ReactNode } from "react";
import { GoHomeFill } from "react-icons/go";
import { FaHashnode, FaUser } from "react-icons/fa6";
import { IoNotificationsSharp, IoMail, IoBookmark } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";

import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/shared/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { logout } from "@/features/auth/slice";
interface SideBarLinkProps {
  href: string;
  name: string;
  active?: boolean;
  icon: ReactNode;
}
const SideBarLink: React.FC<SideBarLinkProps> = ({
  href,
  name,
  active,
  icon,
}) => {
  return (
    <div className={cn("flex", active && "text-primary")}>
      <Link className="flex items-center gap-x-4" to={href}>
        <div>{icon}</div>
        <h3>{name}</h3>
      </Link>
    </div>
  );
};

interface Props {
  className?: string;
}
export const LeftSideBar: React.FC<Props> = ({ className }) => {
  const links: SideBarLinkProps[] = [
    { name: "Home", href: "/", icon: <GoHomeFill size={25} />, active: true },
    { name: "Explore", href: "/", icon: <FaHashnode size={25} /> },
    {
      name: "Notifications",
      href: "/",
      icon: <IoNotificationsSharp size={25} />,
    },
    { name: "Messages", href: "/", icon: <IoMail size={25} /> },
    { name: "Bookmarks", href: "/", icon: <IoBookmark size={25} /> },
    { name: "Profile", href: "/", icon: <FaUser size={25} /> },
    { name: "More", href: "/", icon: <IoIosMore size={25} /> },
  ];
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div
      className={cn("flex flex-col  justify-between py-2 h-screen ", className)}
    >
      <div className="w-full">
        <div className="w-10 h-10 ">
          <Link to={"/feed"}>
            <img
              className="h-max w-max"
              src="https://logosandtypes.com/wp-content/uploads/2022/04/enovis.svg"
            />
          </Link>
        </div>
        <div className="mt-2">
          {links.map((link) => (
            <SideBarLink {...link} key={uuid()} />
          ))}
        </div>
        <div className="mr-8">
          <Button className="rounded-full w-full py-5 ">Post</Button>
        </div>
      </div>
      <div className="flex space-x-2 justify-between items-center">
        <div className="flex  space-x-2 items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden ">
            <img
              className="w-full h-full"
              src="https://i.pravatar.cc/50?u=a042581"
            />
          </div>
          <div className="flex flex-col">
            <h4 className="font-bold">{user?.displayName}</h4>
            <Link to={`/profile/${user?.username}`}>
              <p>@{user?.username}</p>
            </Link>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <IoIosMore />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
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
  );
};
