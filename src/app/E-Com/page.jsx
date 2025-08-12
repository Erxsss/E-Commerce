"use client";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

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
    <div className="flex flex-col w-[100vw] h-[100vh] justify-between">
      <div className="w-[100%] h-[10%] "></div>
      <div className="w-[100%] h-[70%] flex justify-center items-start">
        <div className="w-[80%] h-[100%]">
          <div className="w-[100%] h-[20%] flex items-center flex-col justify-center">
            <h1 className="text-[40px]">Featured Products</h1>
            <p className="text-gray-600 text-[30px]">
              Check out our most popular items that customers love.
            </p>
          </div>
          <div className="flex justify-around w-[100%] h-[70%]">
            {product?.map((pro) => {
              return (
                <div key={pro.id}>
                  <Card className="w-[400px] h-[700px] flex flex-col p-4">
                    <div className="w-[100%] h-[60%]">
                      <img
                        className="w-[100%] h-[100%]"
                        src={pro.images}
                        alt=""
                      />
                    </div>
                    <div className="w-[100%] h-[20%]">
                      <div className="text-[30px] font-bold">{pro.title}</div>
                      <div className="text-[20px] text-gray-600">
                        {pro.category}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-[20px] font-bold">{pro.price}$</div>
                      <div>
                        <Button className="bg-gray-200 hover:bg-gray-600 hover:text-white text-black ">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-[100%] h-[5%] flex justify-center items-center">
        <div>
          <Button className="w-[200px] h-[50px] text-[20px]">
            View All Products
          </Button>
        </div>
      </div>
      <div className="w-[100%] h-[7%] border-2 border-gray-400 flex justify-around items-center">
        <div className="text-[25px] text-gray-600">
          © 2025 E-Commerce. All rights reserved.
        </div>
        <div className="flex">
          <div>
            <img
              className="w-[50px] h-[50px]"
              src="https://www.iconpacks.net/icons/1/free-chain-icon-868-thumb.png"
              alt=""
            />
          </div>
          <div>
            <img
              className="w-[50px] h-[50px]"
              src="https://www.iconpacks.net/icons/1/free-chain-icon-868-thumb.png"
              alt=""
            />
          </div>
          <div>
            <img
              className="w-[50px] h-[50px]"
              src="https://www.iconpacks.net/icons/1/free-chain-icon-868-thumb.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
