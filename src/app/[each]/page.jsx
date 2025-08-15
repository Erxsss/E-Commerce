"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
const Page = () => {
  const [product, setproduct] = useState();
  const [category, setcategory] = useState();
  const router = useRouter();
  const [categ, setcat] = useState();
  const params = useParams();
  const id = Number(params.each);
  const fetchdata = async () => {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await res.json();
    setproduct(data);
    setcategory(data?.category);
  };
  const fetchs = async () => {
    const resp = await fetch(
      `https://dummyjson.com/products/category/${category}?limit=4`
    );
    const data = await resp.json();
    setcat(data.products);
    console.log("asdasd", data);
  };

  useEffect(() => {
    fetchdata();
  }),[];
  useEffect(() => {
    if (category) {
      fetchs();
    }
  }, [category]);
  return (
    <div className="flex w-[100vw] h-[100vh] justify-center items-start mt-[80px] ">
      <div className="w-[70%] h-[80%] flex flex-col gap-[50px]">
        <div className="flex gap-[20px]">
          <a href="E-Com">
            <div className="text-gray-600">Home /</div>
          </a>
          <a href="products">
            <div className="text-gray-600">Products /</div>
          </a>
          <div>{product?.title}</div>
        </div>
        <div className="flex gap-[30px]">
          <div className="w-[49%] h-[100%] bg-gray-100 rounded-xl border-1">
            <img src={product?.images[0]} alt="" />
          </div>
          <div className="w-[49%] h-[100%] flex flex-col pl-[20px] gap-[20px]">
            <div className="w-[100%] h-[80%] flex flex-col  items-start gap-[20px]">
              <div className="text-[30px] font-bold">{product?.title}</div>
              <div className="flex gap-[20px]">
                <div>
                  <Rating defaultValue={Math.ceil(product?.rating)}>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <RatingButton key={index} size={30} />
                    ))}
                  </Rating>
                </div>
                <div className="text-gray-600">Brand: {product?.brand}</div>
              </div>
              <div className="text-[30px] font-bold">${product?.price}</div>
              <div className="text-[17px] text-gray-600 w-[100%]">
                {product?.description}
              </div>
              <div className="flex font-bold">
                <div>Availability:</div>
                <div className="text-green-600">
                  {product?.availabilityStatus}
                </div>
              </div>
              <div className="text-[20px] font-bold w-[50px] h-[80px]">
                <div>Quantity</div>
                <div className="w-[50px] h-[20px] ">
                  <input type="number" className="border-2 rounded-lg" />
                </div>
              </div>
              <div className="flex w-[100%] justify-between">
                <div className="w-[47%]">
                  <Button className="w-[100%]">Add to Cart</Button>
                </div>
                <div className="w-[47%]">
                  <Button className="w-[100%]">Add to Wishlist</Button>
                </div>
              </div>
            </div>
            <div className="w-[100%] h-[20%] flex flex-col gap-[20px] justify-start">
              <div>
                <div className="flex gap-[20px]">
                  <div className="w-[30px] h-[30px]">
                    <img
                      src="https://static.thenounproject.com/png/2526085-200.png"
                      alt=""
                    />
                  </div>
                  <div>Free Shipping</div>
                </div>
                <div className="pl-[50px]">{product?.shippingInformation}</div>
              </div>
              <div>
                <div className="flex gap-[20px]">
                  <div className="w-[30px] h-[30px]">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1746/1746650.png"
                      alt=""
                    />
                  </div>
                  <div>Return Policy</div>
                </div>
                <div className="pl-[50px]">{product?.returnPolicy}</div>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex flex-col gap-[20px]">
          <div className="text-[30px] font-bold" >Related Products</div>
          <div className="flex justify-between ">
            {categ?.map((pro) => {
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
      </div>
    </div>
  );
};
export default Page;
