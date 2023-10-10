"use client";

import Product from "../core/Product";
import React from "react";
import { Card } from "@/components/Card";
import { Header } from "@/components/Header";
import { Table } from "@/components/Table";
import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import ProductCollection from "@/backend/database/ProductCollection";

export default function Home(): React.ReactNode {
  const repo: ProductCollection = new ProductCollection();
  const [product, setProduct] = React.useState<Product>(new Product());
  const [products, setProducts] = React.useState<Product[]>([]);
  const [visible, setVisible] = React.useState<"table" | "form">("table");

  async function getAllProducts(): Promise<void> {
    try {
      const products = await repo.getAll();
      setProducts(products);
      setVisible("table");
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  }

  React.useEffect(() => {
    getAllProducts();
  }, []);

  function productEdit(product: Product) {
    setProduct(product);
    setVisible("form");
  }
  function productDelete(product: Product) {
    getAllProducts();
    repo.delete(product);
  }

  function productSave(product: Product) {
    repo.save(product);
    setVisible("table");
    getAllProducts();
  }

  return (
    <React.Fragment>
      <main>
        <Card header={<Header title="Loja de Produtos" color="#0A0D12"/>}>
          {visible === "table" ? (
            <React.Fragment>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingBottom: "12px",
                }}
              >
                <Button
                  label="Novo Produto"
                  color="#9AC026"
                  action={() => {
                    setVisible("form");
                    setProduct(new Product());
                  }}
                />
              </div>
              <Table
                products={products}
                header={["Código", "Produto", "Valor", "Ações"]}
                productDelete={productDelete}
                productEdit={productEdit}
                preview={{ visible: true, view: 5 }}
              ></Table>
            </React.Fragment>
          ) : (
            <Form
              product={product}
              save={productSave}
              exit={() => {
                setVisible("table");
              }}
            ></Form>
          )}
        </Card>
      </main>
    </React.Fragment>
  );
}
