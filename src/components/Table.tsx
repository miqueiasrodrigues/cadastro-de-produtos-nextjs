import Product from "../core/Product";
import { Button } from "./Button";
import { trashIcon, editIcon } from "./utils/Icons";
import Styles from "./Table.module.css";
import React from "react";

interface TableProps {
  products: Product[];
  header: Array<string>;
  preview?: { visible: boolean; view: number };
  productEdit?: (product: Product) => void;
  productDelete?: (product: Product) => void;
}

export function Table(props: TableProps) {
  const actionView = props.productEdit || props.productDelete;
  const [currentView, setCurrentView] = React.useState(0);

  function createHeader(header: Array<string>) {
    return header.map((name, index) => {
      if (!actionView) {
        return index != header.length - 1 ? <th key={index}>{name}</th> : false;
      } else {
        return <th key={index}>{name}</th>;
      }
    });
  }

  function createBody(
    products: Product[],
    header: Array<string>,
    preview: number
  ) {
    return products.length > 0 ? (
      products.map((product, index) => {
        if (index >= currentView && index < currentView + preview) {
          return (
            <tr
              key={product.id}
              className={index % 2 === 0 ? Styles.trbody : Styles.trbodyz}
            >
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.value}</td>
              {actionView ? createIcons(product) : false}
            </tr>
          );
        }
      })
    ) : (
      <tr className={Styles.trbodyz}>
        <td colSpan={header.length}>Não existe produtos cadastrados</td>
      </tr>
    );
  }

  function createIcons(product: Product) {
    return (
      <td>
        {props.productEdit ? (
          <button
            className={Styles.buttonIconEdit}
            onClick={() => props.productEdit?.(product)}
          >
            {editIcon}
          </button>
        ) : (
          false
        )}

        {props.productDelete ? (
          <button
            className={Styles.buttonIconTrash}
            onClick={() => props.productDelete?.(product)}
          >
            {trashIcon}
          </button>
        ) : (
          false
        )}
      </td>
    );
  }

  function adPreview(products: Product[], preview: number = 0) {
    if (products.length <= currentView + preview) {
      return;
    }
    setCurrentView(currentView + preview);
  }

  function rwPreview(preview: number = 0) {
    if (currentView - preview < 0) {
      return;
    }
    setCurrentView(currentView - preview);
  }

  return (
    <React.Fragment>
      <table>
        <thead className={Styles.thead}>
          <tr className={Styles.trhead}>{createHeader(props.header)}</tr>
        </thead>
        <tbody>
          {createBody(
            props.products,
            props.header,
            props.preview?.view ?? props.products.length
          )}
        </tbody>
      </table>
      {props.preview != null &&
      props.preview.visible == true &&
      props.preview.view - props.products.length < 0 ? (
        <div className={Styles.controlButtons}>
          <Button
            label="Voltar"
            color="#F95862"
            action={() => rwPreview(props.preview?.view)}
          />
          <Button
            label="Avançar"
            color="#348DDB"
            action={() => adPreview(props.products, props.preview?.view)}
          />
        </div>
      ) : (
        false
      )}
    </React.Fragment>
  );
}
