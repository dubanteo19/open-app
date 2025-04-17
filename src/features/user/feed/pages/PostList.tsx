import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { uuid } from "@/lib/utils";
import { Post } from "@/types/post";
import { User } from "@/types/user";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { FaComment, FaEye, FaHeart } from "react-icons/fa6";
import { IoIosMore } from "react-icons/io";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";
const AuthorInfo: React.FC<{
  author: User;
  updatedAt?: string;
  postId: number;
}> = (props) => {
  const author = props.author;
  return (
    <div id="author" className="flex justify-between">
      <div className="flex items-center space-x-1 m-0">
        <Link className="font-bold" to={`user/${author.id}`}>
          {author.displayName}
        </Link>
        {author.verified && <MdVerified color="green" />}
        <Link className="text-sm text-gray-500 " to={`user/${author.id}`}>
          @{author.username}-{props.updatedAt}
        </Link>
      </div>
      <div>
        <Button variant="ghost">
          <IoIosMore />
        </Button>
      </div>
    </div>
  );
};
const PostItem: React.FC<Post> = ({
  author,
  id,
  content,
  views,
  likes,
  comments,
  updatedAt,
}) => {
  return (
    <div className="grid grid-cols-12 p-x-3 w-full  border-t-2 border-t-gray-200">
      <div className="col-span-1  flex flex-row-reverse ">
        <Avatar className="mr-2  mt-2 ">
          <AvatarImage
            width={40}
            className="rounded-full"
            src={
              author.avatar || "https://randomuser.me/api/portraits/men/9.jpg"
            }
          />
        </Avatar>
      </div>
      <div className="col-span-11 flex flex-col">
        <AuthorInfo
          author={author}
          postId={id}
          updatedAt={updatedAt?.substring(0, 7)}
        />
        <div className="lg:my-1">{content}</div>
        <div className="flex w-full">
          <Button variant="ghost">
            <FaHeart />
            {likes || 0}
          </Button>
          <Button variant="ghost">
            <FaEye />
            {views || 0}
          </Button>
          <Button variant="ghost">
            <FaComment />
            {comments || 0}
          </Button>
        </div>
      </div>
    </div>
  );
};
interface PostListProps {
  posts?: Post[];
}
export const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div className="flex flex-col px-2 w-full">
      {posts && posts.map((post) => <PostItem {...post} key={uuid()} />)}
    </div>
  );
};
