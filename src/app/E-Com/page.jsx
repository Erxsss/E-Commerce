"use client";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";

export default function Home() {
  const [product, setproduct] = useState();
  const fetchdata = async () => {
    const response = await fetch(`https://dummyjson.com/products?limit=4`);
    const data = await response.json();
    setproduct(data?.products);
    console.log(data);
  };
  useEffect(() => {
    fetchdata();
  }, []);
  console.log(product);
  return (
    <div className="flex flex-col w-[100vw] h-[100vh]">
      <div className="w-[100%] h-[20%] bg-blue-400"></div>
      <div className="w-[100%] h-[70%] flex justify-center items-center">
        <div className="w-[80%] h-[90%] bg-amber-400">
          <div className="w-[100%] h-[20%] flex items-center flex-col justify-center">
            <h1 className="text-[33px]">Featured Products</h1>
            <p className="text-gray-600">
              Check out our most popular items that customers love.
            </p>
          </div>
          <div className="flex justify-around w-[100%] h-[80%]">
            {product?.map((pro) => {
              return (
                <div key={pro.id}>
                  <Card className="w-[23%] h-[95%]">{pro.price}</Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
