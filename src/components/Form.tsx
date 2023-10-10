import Product from "@/core/Product";
import Styles from "./Form.module.css";
import { Input } from "./Input";
import React from "react";
import { Button } from "./Button";

interface FormProps {
  product?: Product;
  save?: (product: Product) => void;
  exit?: () => void;
}

export function Form(props: FormProps) {
  const id = props.product?.id;
  const [name, setName] = React.useState(props.product?.name ?? "");
  const [value, setValue] = React.useState(props.product?.value ?? 0);

  return (
    <React.Fragment>
      <div className={Styles.form}>
        {id ? (
          <Input value={id} type="text" readOnly={true} label="Código" />
        ) : (
          false
        )}
        <Input
          value={name}
          type="text"
          readOnly={false}
          label="Nome"
          valueChange={setName}
        />
        <Input
          value={value}
          type="number"
          readOnly={false}
          label="Valor"
          valueChange={setValue}
        />
      </div>
      <div className={Styles.controlButtons}>
        <Button
          label={id ? "Alterar" : "Salvar"}
          color="#348DDB"
          action={() => {
            props.save?.(new Product(name, value, id));
          }}
        />
        <Button label="Cancelar" action={props?.exit} color="#F95862" />
      </div>
    </React.Fragment>
  );
}
