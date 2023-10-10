import Styles from "./Button.module.css";
interface ButtonProps {
  label: string;
  color?: string;
  action?: () => void;
}

export function Button(props: ButtonProps) {
  return (
    <button
      style={{ backgroundColor: props.color ? props.color : "#898989" }}
      className={Styles.button}
      onClick={props?.action}
    >
      {props.label}
    </button>
  );
}
