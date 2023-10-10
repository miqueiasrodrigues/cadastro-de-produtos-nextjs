import Styles from "./Header.module.css"

interface HeaderProps {
  title: string;
  color?: string;
}

export function Header(props: HeaderProps){
  return (
    <div className={Styles.header} style={{ backgroundColor: !props.color ? "red" : props.color }}>
      <span>{props.title}</span>
    </div>
  );
}
