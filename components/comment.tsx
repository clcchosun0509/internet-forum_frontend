import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { useWriteCommentReplyMutation } from "../service/post";
import { Comment } from "../types/comment";
import { addClassName, getRelativeTime } from "../utils/utils";
import CommentTextarea from "./comment-textarea";
import CommentButton from "./ui/comment-button";
import _ from "lodash";

type Props = {
  comment: Comment;
  boardId: string;
  postId: number;
  className?: string;
};

const Comment = ({ comment, boardId, postId, className }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [childCommentContent, setChildCommentContent] = useState<string>("");
  const { mutate: writeCommentReply } = useWriteCommentReplyMutation();
  const router = useRouter();

  const handleWriteCommentReply = () => {
    writeCommentReply(
      { commentId: comment.id, content: childCommentContent },
      {
        onSuccess: () => {
          setChildCommentContent("");
          setIsOpen(false)
          router.replace(`/${boardId}/${postId}`);
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message);
        },
      }
    );
  };

  return (
    <div
      className={`collapse ${isOpen ? "collapse-open" : ""} flex flex-col ${
        comment.parentCommentId ? "ml-4" : ""
      }${addClassName(className)}`}
    >
      <div className="flex flex-row justify-between items-center text-sm mb-2">
        <div className="flex flex-row items-center">
          <Image
            className="w-5 h-5 mr-2 rounded-full"
            src={comment.author.avatar}
            width={32}
            height={32}
            alt="user avatar"
          />
          <p className="mr-2">{comment.author.username}</p>
          <p>{getRelativeTime(comment.createdAt)}</p>
        </div>
        <p
          className="cursor-pointer select-none"
          onClick={() => {
            setIsOpen((prevState) => !prevState);
          }}
        >
          {isOpen ? "닫기" : "댓글"}
        </p>
      </div>
      <div className="text-black dark:text-white flex flex-row">
        {comment.parentCommentUsername ? (
          <p className="bg-lime-400 px-2 rounded-full dark:bg-lime-800 text-sm flex items-center mr-2">{`@${comment.parentCommentUsername}`}</p>
        ) : null}
        <p>{comment.content}</p>
      </div>
      <div className="collapse-content flex flex-col p-0 pl-4">
        <CommentTextarea className="mb-2 mt-2" content={childCommentContent} setContent={setChildCommentContent} />
        <CommentButton onClick={handleWriteCommentReply} />
      </div>
      <div className="divider my-2" />
    </div>
  );
};

export default Comment;
