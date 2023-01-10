import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { addClassName } from "../../utils/utils";

type Props = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  className?: string;
  likeCount: number;
};

const LikeButton = ({ className, likeCount, ...props }: Props) => {
  return (
    <button className={`btn btn-outline btn-primary h-11 min-h-0 px-4${addClassName(className)}`} {...props}>
      <FontAwesomeIcon tabIndex={0} icon={faThumbsUp} size="2x" className="w-4 mr-2 outline-none" />
      <p>{`추천 ${likeCount}`}</p>
    </button>
  );
};

export default LikeButton;
