import { DetailedHTMLProps, HTMLAttributes, useState, useEffect } from "react";
import { useTheme } from "next-themes";
type Props = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {};

const Footer = ({ ...props }: Props) => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return <button onClick={() => setTheme("light")}>라이트 모드</button>;
    }

    return <button onClick={() => setTheme("dark")}>다크 모드</button>;
  };

  return <footer {...props}>{renderThemeChanger()}</footer>;
};

export default Footer;
