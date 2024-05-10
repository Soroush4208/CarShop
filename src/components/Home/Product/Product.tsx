import axios from "axios";
import { useEffect, useState } from "react";
import { BSE_URL } from "../../../constant/const";

type ProductProps = {
  id: number;
  name: string;
  price: number;
  desc: string;
  image: string;
  condition: string;
};

function Product() {
  const [products, setProduct] = useState([] as ProductProps[]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios.get(`${BSE_URL}/products`);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      }
    }
    getData();
  }, []);
  return (
    <div>
      <h1 className="font-bold ">Product List</h1>
      {loading ? (
        <h1 className="flex justify-center items-center font-extrabold">
          Loading...
        </h1>
      ) : error ? (
        <h1 className="flex justify-center items-center font-extrabold">
          Error: {error}
        </h1>
      ) : (
        <div className="flex flex-wrap justify-center gap-4 p-2">
          {products.map((product) => {
            return (
              <div
                className=" flex flex-col justify-between h-fit p-2 border border-gray-300 rounded-sm w-52"
                key={product.id}
              >
                <div className="flex flex-col gap-1 mb-3">
                  <img
                    className="rounded-sm"
                    src={product.image}
                    alt={product.name}
                  />
                  <h2 className="font-bold">{product.name}</h2>
                  <h3 className="font-medium text-sm">{`$ ${product.price} Millions`}</h3>
                </div>
                <div className="flex flex-col justify-between h-16">
                  <p className="text-gray-500 text-[10px]">{product.desc}</p>
                  <button className="flex justify-center items-center bg-[#3b82f6] w-full py-1 text-white rounded-sm">
                    {product.condition}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Product;
