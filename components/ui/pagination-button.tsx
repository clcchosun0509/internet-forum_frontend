import { addClassName } from "../../utils/utils";
import Button from "./button";

type Props = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  className?: string;
  children?: React.ReactNode;
};

const PaginationButton = ({ className, children, ...props }: Props) => {
  return (
    <Button className={`h-10 min-h-0 px-3${addClassName(className)}`} {...props}>
      {children}
    </Button>
  );
};

export default PaginationButton;
