import {productService} from "../service/productService";
import {useEffect} from "react";

const HomeScreen = () => {
  const getProducts = async () => {
    const response = await productService.findAll();
    console.log(response);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return <>Home</>;
};

export default HomeScreen;
