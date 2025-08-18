"use client";
import { useEffect } from "react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const Page = () => {
  const [input, setinput] = useState("");
  const PageSize = 12;
  const [currentP, setCurrentP] = useState(1);
  const [product, setproduct] = useState();
  const router = useRouter();
  const [len, setlen] = useState([]);

  const fetchdata = async () => {
    let skip = 0;

    if (currentP > 1) {
      skip = (currentP - 1) * PageSize;
    }
    let response;
    let url = `https://dummyjson.com/products?limit=${PageSize}&skip=${skip}`;
    if (input !== "") {
      response = await fetch(
        `https://dummyjson.com/products/search?q=${input}&limit=${PageSize}&skip=${skip}`
      );
    } else {
      response = await fetch(url);
    }
    const data = await response.json();
    setlen(Math.ceil(data?.total / PageSize));
    setproduct(data?.products);
    console.log("url", url);
  };
  const my_array = Array.from({ length: len }, (_, i) => i + 1);
  useEffect(() => {
    fetchdata();
  }, [currentP, input]);
  useEffect(() => {
    if (currentP > 1) {
      setCurrentP(1);
    }
  }, [input]);
  console.log(Number(setCurrentP));
  return (
    <div className="gap-[40px] flex flex-col">
      <div className="w-[100%] h-[10%] flex justify-center">
        <div className="w-[69%] h-[100px] flex justify-start items-end">
          <input
            className="w-[23%] h-[35%] border-2 rounded-lg ml-[-15px]"
            placeholder="Enter Product Name..."
            type="text"
            value={input}
            onChange={(e) => {
              setinput(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="w-[100%] h-[90%] flex justify-center">
        <div className="w-[70%] h-[100%] flex gap-[30px] flex-wrap">
          {product?.map((pro) => {
            return (
              <div key={pro.id}>
                <Card
                  className="w-[350px] h-[600px] flex flex-col p-4"
                  onClick={() => {
                    router.push(`/${pro.id}`);
                  }}
                >
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
      <div className="flex justify-center gap-[20px] items-center">
        <Button
          variant="outline"
          className="w-[40px] h-[40px] p-0"
          onClick={() => {
            if (currentP > 1) {
              setCurrentP(currentP - 1);
              router.push(`?page=${currentP - 1}`);
            }
          }}
          disabled={currentP === 1}
        >
          <img
            src="https://www.iconpacks.net/icons/2/free-arrow-right-icon-2817-thumb.png"
            alt="Previous"
            className="transform -rotate-180 w-6 h-6"
          />
        </Button>

        <div className="flex gap-[20px]">
          {my_array.map((num) => (
            <Button
              key={num}
              variant={currentP === num ? "default" : "outline"}
              className="w-[40px] h-[40px] p-0"
              onClick={() => {
                setCurrentP(num);
                router.push(`?page=${num}`);
              }}
            >
              {num}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          className="w-[40px] h-[40px] p-0"
          onClick={() => {
            if (currentP < len) {
              setCurrentP(currentP + 1);
              router.push(`?page=${currentP + 1}`);
            }
          }}
          disabled={currentP === len}
        >
          <img
            src="https://www.iconpacks.net/icons/2/free-arrow-right-icon-2817-thumb.png"
            alt="Next"
            className="w-6 h-6"
          />
        </Button>
      </div>
      <div></div>
    </div>
  );
};
export default Page;
