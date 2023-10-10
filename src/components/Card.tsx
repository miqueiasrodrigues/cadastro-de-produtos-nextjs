import Styles from "./Card.module.css";

interface CardProps {
  header?: JSX.Element;
  children: any;
}

export function Card(props: CardProps){
  return (
    <div className={Styles.card}>
      {props.header}
      <div className={Styles.content}>{props.children}</div>
    </div>
  );
}
