type Props = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  className?: string;
  children: React.ReactNode | string;
};

const Button = ({ className, children, ...props }: Props) => {
  return (
    <button className={`btn btn-ghost bg-base-300 transition-none ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
