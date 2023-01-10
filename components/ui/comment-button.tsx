import { addClassName } from "../../utils/utils";

type Props = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  className?: string;
};

const CommentButton = ({ className, ...props }: Props) => {
  return (
    <button
      className={`btn border-none bg-lime-500 dark:bg-lime-800 font-thin 
      text-white transition-none min-h-0 h-9 w-16 self-end${addClassName(className)}`}
      {...props}
    >
      등록
    </button>
  );
};

export default CommentButton;
