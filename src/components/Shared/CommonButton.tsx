import { ReactElement, useCallback } from "react";
import { useThemeStore } from "../../store/themeStore";

function CommonButton({
  Icon,
  text,
  onClick = () => {},
  variant = "primary",
  disabled = false,
  iconPosition = "left",
  customClass = "",
  href,
  target,
  rel,
}: {
  Icon?: ReactElement;
  iconPosition?: "left" | "right";
  text?: string;
  onClick?: () => void;
  variant?: "primary" | "outline";
  disabled?: boolean;
  customClass?: string;
  href?: string;
  target?: string;
  rel?: string;
}) {
  const { darkMode } = useThemeStore();

  const mouseEnterAndExit = useCallback(
    (enter: boolean) => {
      const customMouse = document.querySelector(
        ".custom-mouse"
      ) as HTMLElement;
      if (customMouse && variant === "outline") {
        if (enter) {
          customMouse.style.backgroundColor = "var(--white)";
        } else {
          customMouse.style.backgroundColor = darkMode
            ? "var(--black)"
            : "var(--black)";
        }
      }
    },
    [darkMode]
  );

  const buttonContent = (
    <>
      {Icon && <div className="icon">{Icon}</div>}
      {text && <p className="text">{text}</p>}
    </>
  );

  if (href) {
    return (
      <a
        className={`btn ${variant} ${customClass}`}
        href={href}
        target={target}
        rel={rel}
        style={{
          flexDirection: iconPosition === "right" ? "row-reverse" : "row",
        }}
        onMouseEnter={() => mouseEnterAndExit(true)}
        onMouseLeave={() => mouseEnterAndExit(false)}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      className={`btn ${variant} ${customClass}`}
      onClick={onClick}
      style={{
        flexDirection: iconPosition === "right" ? "row-reverse" : "row",
      }}
      onMouseEnter={() => mouseEnterAndExit(true)}
      onMouseLeave={() => mouseEnterAndExit(false)}
    >
      {buttonContent}
    </button>
  );
}

export default CommonButton;
