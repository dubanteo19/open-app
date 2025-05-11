import { FrownIcon, MehIcon, SmileIcon } from "lucide-react";
import { FC, ReactNode } from "react";

interface SentitmentProps {
  sentiment: number;
}
export const Sentitment: FC<SentitmentProps> = ({ sentiment }) => {
  const getSentmentRender = (
    sentiment: number,
  ): { className: string; text: string; icon: ReactNode } => {
    if (sentiment == 1) {
      return {
        className: "bg-green-500",
        icon: <SmileIcon size={20} />,
        text: "Possitive",
      };
    }
    if (sentiment == 0) {
      return {
        className: "bg-red-500",
        icon: <FrownIcon size={20} />,
        text: "Negative",
      };
    }
    return {
      className: "bg-gray-500",
      icon: <MehIcon size={20} />,
      text: "Neutral",
    };
  };
  const sentimentRender = getSentmentRender(sentiment);
  return (
    <div
      className={` text-white ${sentimentRender.className} mt-2 space-x-2  px-2 text-sm
rounded flex items-center  `}
    >
      <span className="">{sentimentRender.text}</span>
      {sentimentRender.icon}
    </div>
  );
};
