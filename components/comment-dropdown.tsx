import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useOnClickOutside } from "usehooks-ts";
import { useDeleteCommentMutation } from "../service/post";
import { BoardId } from "../types/board";
import { addClassName } from "../utils/utils";

type Props = {
  commentId: string;
  boardId: BoardId;
  postId: number;
  onClickEditComment: React.MouseEventHandler<HTMLAnchorElement>;
  className?: string;
};

const CommentDropdown = ({ commentId, boardId, postId, onClickEditComment, className }: Props) => {
  const { mutate: deleteComment } = useDeleteCommentMutation();

  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(dropdownRef, () => setOpenDropdown(false));

  const router = useRouter();

  const handleDeleteComment = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    deleteComment(
      { commentId },
      {
        onSuccess: () => {
          router.replace(`/${boardId}/${postId}`);
        },
        onError: () => {
          toast.error("댓글 삭제에 실패하였습니다");
        },
      }
    );
  };

  return (
    <div className={`dropdown dropdown-end ${openDropdown ? "dropdown-open" : ""}${addClassName(className)}`}>
      <FontAwesomeIcon
        tabIndex={0}
        icon={faEllipsis}
        size="2x"
        className="w-4 cursor-pointer align-middle"
        onClick={() => setOpenDropdown((prev) => !prev)}
      />
      <ul
        tabIndex={0}
        className={`dropdown-content menu shadow bg-base-200 dark:bg-neutral 
        text-black dark:text-white rounded-md w-16 text-xs [&_a]:p-2 [&_a]:block [&_a]:text-center
        ${openDropdown ? "" : "hidden"}`}
      >
        <li>
          <a
            onClick={(e) => {
              setOpenDropdown(false);
              onClickEditComment(e);
            }}
          >
            수정하기
          </a>
        </li>
        <li>
          <a onClick={handleDeleteComment}>삭제하기</a>
        </li>
      </ul>
    </div>
  );
};

export default CommentDropdown;
