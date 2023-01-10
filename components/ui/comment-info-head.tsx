import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import { addClassName } from "../../utils/utils";

type Props = {
  className?: string;
};

const CommentInfoHead = ({ className }: Props) => {
  return (
    <div className={`flex flex-row items-center text-xl font-bold mb-4${addClassName(className)}`}>
      <FontAwesomeIcon icon={faComments} className="mr-2" />
      <p>댓글</p>
    </div>
  );
};

export default CommentInfoHead;
