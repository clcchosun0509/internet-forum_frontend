import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { addClassName } from "../../utils/utils";

type Props = {
  className?: string;
  viewCount: number;
};

const ViewCount = ({ className, viewCount }: Props) => {
  return (
    <div className={`flex flex-row items-center${addClassName(className)}`}>
      <FontAwesomeIcon icon={faEye} className="mr-1" />
      <p>{viewCount}</p>
    </div>
  );
};

export default ViewCount;
