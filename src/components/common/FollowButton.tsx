import { FC, useState } from "react";
import { Button } from "../ui/button";
import {
  useFollowOpenerMutation,
  useUnfollowOpenerMutation,
} from "@/features/discovery/api";
import { cn } from "@/lib/utils";

interface FollowButtonProps {
  followed: boolean;
  targetOpenerId: number;
  callback?: () => void;
}
export const FollowButton: FC<FollowButtonProps> = ({
  followed,
  targetOpenerId,
  callback,
}) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [follow] = useFollowOpenerMutation();
  const [unfollow] = useUnfollowOpenerMutation();
  const mutation = followed ? unfollow : follow;
  const toggleFollow = async () => {
    try {
      await mutation(targetOpenerId).unwrap();
      if (callback) callback();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      size={"sm"}
      onClick={toggleFollow}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      variant={followed ? "outline" : "default"}
      className={cn(
        "rounded-xl ",
        followed && "hover:text-red-500 hover:border-red-500",
      )}
    >
      {followed ? (isHover ? "Unfollow" : "Following") : "Follow"}
    </Button>
  );
};
