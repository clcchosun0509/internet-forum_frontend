import { useRef } from "react";
import useAutoResizeTextarea from "../hooks/useAutoResizeTextarea";
import { addClassName } from "../utils/utils";

type Props = {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
};

const CommentTextarea = ({ content, setContent, className }: Props) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutoResizeTextarea(textAreaRef.current, content);

  return (
    <textarea
      className={`textarea bg-base-300 dark:bg-neutral transition-none !outline-none 
      resize-none overflow-hidden break-words min-h-0 h-16 dark:text-white${addClassName(className)}`}
      placeholder="댓글을 작성해주세요"
      ref={textAreaRef}
      onChange={(event) => {
        setContent(event.target.value);
      }}
      value={content}
    ></textarea>
  );
};

export default CommentTextarea;
