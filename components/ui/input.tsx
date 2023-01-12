import { addClassName } from "../../utils/utils";

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  className?: string;
};

const Input = ({ className, ...props }: Props) => {
  return (
    <input
      type="text"
      className={`input input-bordered border-[#ccc]/100 transition-none !outline-none${addClassName(className)}`}
      {...props}
    />
  );
};

export default Input;
