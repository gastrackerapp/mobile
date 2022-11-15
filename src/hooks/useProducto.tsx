import { useState, useEffect } from 'react';
import axios from "axios";



export default function useProducto() {
    type ProductoJSON = {
        IDProducto: string;
        NombreProducto: string;
    };
    
    const [Productos, setProductos] = useState<ProductoJSON[]>([]);
      useEffect(() => {
        const getProductos = async () => {
          try {
            const ProductoURL = "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/ProductosPetroliferos/";
            const { data } = await axios.get(`${ProductoURL}`);
            const ProductosJSON: ProductoJSON[] = new Array<ProductoJSON>();
            data.map((Producto: ProductoJSON) => {
              const ProductoJSON: ProductoJSON = {
                IDProducto: Producto.IDProducto,
                NombreProducto: Producto.NombreProducto,
              };
              ProductosJSON.push(ProductoJSON);
            });
            setProductos(ProductosJSON);
          } catch (e) {
            console.error(e);
          }
        };
        getProductos();
      }, []);
    
    return Productos;
}