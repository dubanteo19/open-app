import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import { RootState } from "@/shared/store";
import { getSocketClient } from "@/shared/websocket";
import { debounce } from "lodash";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useCreateCommentMutation } from "../../comment/api";
import { Loader } from "lucide-react";
import { CommentResponse } from "../dto/comment";
interface CommentFormProps {
  authorUsername?: string;
  postId?: number;
  onSaveComment: (comment: CommentResponse) => void;
}
export const CommentForm: React.FC<CommentFormProps> = ({
  authorUsername,
  postId,
  onSaveComment,
}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [content, setcontent] = useState<string>("");
  const [createComment, { isLoading }] = useCreateCommentMutation();
  const handleSubmit = async () => {
    try {
      const re = await createComment({
        authorId: user?.id,
        payload: { content },
        postId,
      }).unwrap();
      if (re) {
        setcontent("");
        toast.success("Comment created");
        onSaveComment(re);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const debouncedSendTypingEvent = useMemo(
    () =>
      debounce(() => {
        const client = getSocketClient();
        if (client?.connected) {
          console.log("Sending typing event");
          client.publish({
            destination: `/app/typing/${postId}`,
            body: JSON.stringify(user?.username),
          });
        } else {
          console.log("Not connected, cannot send typing event");
        }
      }, 300),
    [postId, user],
  );
  const handleTyping = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setcontent(event.target.value);
    debouncedSendTypingEvent();
  };
  if (isLoading) return <Loader />;
  return (
    <div className=" border-y-gray-500/20 border-y-2 p-2">
      <p>
        Rely to{" "}
        <Link className="text-blue-500" to={`/profile/${authorUsername}`}>
          @{authorUsername}
        </Link>
      </p>
      <div>
        <div className="grid grid-cols-12 p-3">
          <div className="col-span-1">
            <Avatar>
              <AvatarImage
                width={40}
                className="rounded-full"
                src={user?.avatarUrl}
              />
            </Avatar>
          </div>
          <div className="col-span-11 flex flex-col">
            <div className="border-b-2 border-b-gray-200">
              <Textarea
                value={content}
                onChange={handleTyping}
                maxLength={400}
                className="border-none resize-none focus-visible:border-none focus-visible:ring-0"
                placeholder="Post your reply"
              />
            </div>
            <div className="flex flex-row-reverse text-primary mt-2 ">
              <div>
                <Button
                  className="px-6 rounded-full"
                  disabled={isLoading || !content}
                  type="submit"
                  onClick={handleSubmit}
                >
                  Reply
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
