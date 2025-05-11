import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { MdEmojiEmotions } from "react-icons/md";
import { FaImage } from "react-icons/fa6";
import { FC, useState } from "react";
import { useCreatePostMutation } from "../api";
import { Loader } from "@/components/common/Loader";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/store";

interface PostFormProps {
  onPostCreated: () => void;
}
export const PostForm: FC<PostFormProps> = ({ onPostCreated }) => {
  const [content, setcontent] = useState<string>("");
  const [createPost, { isLoading }] = useCreatePostMutation();
  const { user } = useSelector((state: RootState) => state.auth);
  const handleSubmit = async () => {
    try {
      await createPost({ openerId: user?.id, payload: { content } }).unwrap();
      setcontent("");
      onPostCreated();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="grid grid-cols-12 p-3 border-t-2 border-t-gray-200">
      {isLoading && <Loader />}
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
            onChange={(event) => {
              setcontent(event.target.value);
            }}
            maxLength={400}
            className="border-none resize-none focus-visible:border-none focus-visible:ring-0"
            placeholder="What's happening"
          />
        </div>
        <div className="flex justify-between text-primary mt-2 ">
          <div id="buttons">
            <Button variant="ghost">
              <FaImage />
            </Button>
            <Button variant="ghost">
              <MdEmojiEmotions />
            </Button>
          </div>
          <div>
            <Button
              className="px-6 rounded-full"
              disabled={isLoading || !content}
              type="submit"
              onClick={handleSubmit}
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
