import { addClassName } from "../../utils/utils";

type Props = React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> & {
  className?: string;
  children: React.ReactNode | string;
};

const AuthButton = ({ className, children, ...props }: Props) => {
  return (
    <label
      className={`flex justify-center items-center self-center 
      bg-lime-700 min-w-[5rem] h-9 mr-2 rounded-md text-md 
      cursor-pointer${addClassName(className)}`}
      {...props}
    >
      {children}
    </label>
  );
};

export default AuthButton;
