"use client";
import { useEffect } from "react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const Page = () => {
  const PageSize = 12;
  const [currentP, setCurrentP] = useState(1);
  const [product, setproduct] = useState();
  const router = useRouter();
  const [len, setlen] = useState([]);
  let skip = 0;
  const fetchdata = async () => {
    if (currentP > 1) {
      skip = (currentP - 1) * PageSize;
    }
    console.log(skip);
    const response = await fetch(
      `https://dummyjson.com/products?limit=${PageSize}&skip=${skip}`
    );
    const data = await response.json();
    setlen(Math.ceil(data?.total / PageSize));
    setproduct(data?.products);
    console.log(data);
  };
  console.log(len);
  const my_array = Array.from({ length: len }, (_, i) => i + 1);
  useEffect(() => {
    fetchdata();
  }, [currentP]);
  return (
    <div className="gap-[40px] flex flex-col">
      <div className="w-[100%] h-[10%] flex justify-center">
        <div className="w-[69%] h-[100px] flex justify-start items-end">
          <input
            className="w-[23%] h-[35%%] border-2"
            placeholder="Enter Product Name..."
            type="text"
          />
        </div>
      </div>
      <div className="w-[100%] h-[90%] flex justify-center">
        <div className="w-[70%] h-[100%] flex gap-[30px] flex-wrap">
          {product?.map((pro) => {
            return (
              <div key={pro.id}>
                <Card className="w-[350px] h-[600px] flex flex-col p-4">
                  <div className="w-[100%] h-[60%]">
                    <img
                      className="w-[100%] h-[100%]"
                      src={pro.images[0]}
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
      <div className="flex justify-center">
        <div className="flex gap-[20px]">
          {my_array.map((num) => {
            return (
              <Button
                key={num}
                className="w-[40px] h-[40px] flex justify-center items-center border-4"
                onClick={() => {
                  setCurrentP(num);
                  router.push(`?page=${num}`);
                }}
              >
                {num}
              </Button>
            );
          })}
        </div>
      </div>
      <div></div>
    </div>
  );
};
export default Page;
