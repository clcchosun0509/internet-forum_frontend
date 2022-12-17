type Props = React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> & {
  className?: string;
  children: React.ReactNode | string;
};

const Button = ({ className, children, ...props }: Props) => {
  return (
    <label
      className={`flex justify-center items-center self-center bg-lime-700 w-24 h-9 mr-2 rounded-md text-md ${className} cursor-pointer`}
      {...props}
    >
      {children}
    </label>
  );
};

export default Button;
