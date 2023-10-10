import React from "react";
import Styles from "./Input.module.css";

interface InputProps {
  label?: string;
  value: number | string;
  type: "text" | "number";
  readOnly: boolean;
  valueChange?: (value: any) => void;
}

export function Input(props: InputProps) {
  return (
    <React.Fragment>
      {props.label != null ? <label>{props.label}</label> : false}
      <input
        className={Styles.input}
        type={props.type}
        value={props.value}
        readOnly={props.readOnly}
        onChange={e => props.valueChange?.(e.target.value)}
      />
    </React.Fragment>
  );
}
