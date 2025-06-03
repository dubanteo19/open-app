import { cn } from "@/lib/utils";
import { FC } from "react";

interface ImageContainerProps {
  className?: string;
  src?: string;
  rounded?: boolean;
}
export const ImageContainer: FC<ImageContainerProps> = ({
  className,
  src,
  rounded=true,
}) => {
  return (
    <div
      className={cn(`overflow-hidden`, className, rounded && "rounded-full")}
    >
      <img className="w-full h-full" src={src} />
    </div>
  );
};
