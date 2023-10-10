import Product from "@/core/Product";
import ProductRepo from "@/core/ProductRepo";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  deleteDoc, query, orderBy,
} from "firebase/firestore";
import app from "../config";

const firestore = getFirestore(app);
const collectionName = "products";
const toFirebase = (product: Product) => {
  return { name: product.name, value: product.value };
};

export default class ProductCollection implements ProductRepo {
  async save(product: Product): Promise<Product> {
    if (product.id) {
      await updateDoc(
        doc(firestore, collectionName, product.id),
        toFirebase(product)
      );
      return product;
    } else {
      const docRef = await addDoc(
        collection(firestore, collectionName),
        toFirebase(product)
      );
      return new Product(product.name, product.value, docRef.id);
    }
  }

  async delete(product: Product): Promise<void> {
    await deleteDoc(doc(firestore, collectionName, product.id));
  }

  async getAll(): Promise<Product[]> {
    const products: Product[] = [];
    const query_ = query(
      collection(firestore, collectionName),
      orderBy("name")
    );
  
    const querySnapshot = await getDocs(query_);
  
    querySnapshot.forEach((doc) => {
      const product = new Product(doc.data().name, doc.data().value, doc.id);
      products.push(product);
    });
  
    return products;
  }
  
}
