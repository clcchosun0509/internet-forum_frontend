import { DetailedHTMLProps, HTMLAttributes, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
type Props = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {};

const Footer = ({ ...props }: Props) => {
  const [theme, setTheme] = useLocalStorage("theme", "dark");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  //modify data-theme attribute on document.body when theme changes
  useEffect(() => {
    const body = document.body;
    body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <footer {...props} className="flex flex-col items-center m-4">
      <button className="btn" onClick={toggleTheme}>
        색상 반전
      </button>
    </footer>
  );
};

export default Footer;
