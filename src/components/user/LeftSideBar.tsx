import { cn, uuid } from "@/lib/utils";
import React, { ReactNode } from "react";
import { GoHomeFill } from "react-icons/go";
import { FaHashnode, FaUser } from "react-icons/fa6";
import { IoNotificationsSharp, IoMail, IoBookmark } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";

import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
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
  const { user } = useSelector((state: RootState) => state.auth);
  const links: SideBarLinkProps[] = [
    { name: "Home", href: "/feed", icon: <GoHomeFill size={25} /> },
    { name: "Explore", href: "/explore", icon: <FaHashnode size={25} /> },
    {
      name: "Notifications",
      href: "/notifications",
      icon: <IoNotificationsSharp size={25} />,
    },
    { name: "Messages", href: "/messages", icon: <IoMail size={25} /> },
    { name: "Bookmarks", href: "/bookmarks", icon: <IoBookmark size={25} /> },
    {
      name: "Profile",
      href: `/profile/${user?.username}`,
      icon: <FaUser size={25} />,
    },
    { name: "More", href: "/more", icon: <IoIosMore size={25} /> },
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
            <SideBarLink
              {...link}
              key={uuid()}
              active={location.pathname.startsWith(link.href)}
            />
          ))}
        </div>
        <div className="mr-8">
          <Button className="rounded-full w-full py-5 ">Post</Button>
        </div>
      </div>
      <div className="flex space-x-2 justify-between items-center">
        <div className="flex  space-x-2 items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden ">
            <img className="w-full h-full" src={user?.avatarUrl} />
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
