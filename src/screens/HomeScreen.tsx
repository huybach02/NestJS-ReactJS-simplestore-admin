import {supplierService} from "../service/supplierService";
import {useEffect} from "react";

const HomeScreen = () => {
  const getProducts = async () => {
    const response = await supplierService.findAll();
    console.log(response);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return <>Home</>;
};

export default HomeScreen;
