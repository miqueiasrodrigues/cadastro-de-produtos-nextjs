import Styles from "./Footer.module.css";

interface FooterProps{
    label:string;
}

export function Footer(props : FooterProps) {
  return <footer className={Styles.footer}>{props.label}</footer>;
}
