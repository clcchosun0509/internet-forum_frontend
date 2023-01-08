import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useDeletePostMutation } from "../service/post";
import { BoardId } from "../types/board";

type Props = {
  postId: number;
  boardId: BoardId;
};

const PostDropdown = ({ postId, boardId }: Props) => {
  const { mutate: deletePost } = useDeletePostMutation();
  const router = useRouter();

  const handleDeletePost = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    deletePost(
      { postId: postId },
      {
        onSuccess: () => {
          router.push(`/${boardId}`);
        },
        onError: () => {
          toast.error("글 삭제에 실패하였습니다.");
        },
      }
    );
  };

  return (
    <div className="dropdown dropdown-end">
      <FontAwesomeIcon tabIndex={0} icon={faEllipsis} size="2x" className="w-6 cursor-pointer align-middle" />
      <ul tabIndex={0} className="dropdown-content menu p-1 shadow bg-base-200 rounded-md w-36">
        <li>
          <Link href={`/${boardId}/${postId}/edit`}>수정하기</Link>
        </li>
        <li>
          <a onClick={handleDeletePost}>삭제하기</a>
        </li>
      </ul>
    </div>
  );
};

export default PostDropdown;
