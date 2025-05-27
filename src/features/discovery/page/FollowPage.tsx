import { Button } from "@/components/ui/button";
import { UserCard } from "@/components/user/rightSideBar/RecommendedFollows";
import { skipToken } from "@reduxjs/toolkit/query";
import { ArrowLeft, Frown } from "lucide-react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetOpenerFollowersQuery, useGetOpenerFollowingQuery } from "../api";
import { useAppSelector } from "@/hooks/useAppDispatch";
import { cn } from "@/lib/utils";
export const FollowPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { pathname } = useLocation();
  const { username } = useParams<{ username: string }>();
  const title = pathname.split("/")[2];
  const isFollowing = title === "following";
  const args = username
    ? {
        username,
        page: 0,
        size: 5,
      }
    : skipToken;
  const query = isFollowing
    ? useGetOpenerFollowingQuery
    : useGetOpenerFollowersQuery;
  const { data } = query(args);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col px-2 min-h-screen">
      <div className="p-2 flex items-center">
        <Button variant={"ghost"} onClick={() => navigate(-1)}>
          <ArrowLeft />
        </Button>
        <h4>@{username}</h4>
      </div>
      <div className="flex justify-evenly border-t-primary border-t-2">
        <Link to={`/${username}/following`}>
          <h3 className={cn(isFollowing && "underline underline-offset-8")}>
            Following
          </h3>
        </Link>
        <Link to={`/${username}/followers`}>
          <h3 className={cn(!isFollowing && "underline underline-offset-8")}>
            Followers
          </h3>
        </Link>
      </div>
      <div className="flex flex-col space-y-2">
        {data && data?.content.length > 1 ? (
          data?.content.map((opener) => (
            <UserCard me={user?.id == opener.id} {...opener} key={opener.id} />
          ))
        ) : (
          <div className="flex-center flex-col h-[400px] ">
            <h3>
              {username === user?.username ? "Your" : "This"} account has no{" "}
              {isFollowing ? "following" : "follwers"}
            </h3>
            <Frown size={200} className="opacity-50 animate-in" />
          </div>
        )}
      </div>
    </div>
  );
};
