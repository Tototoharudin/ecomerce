/* eslint-disable @next/next/no-img-element */
import { cookies } from "next/headers";
import React from "react";
import RemoveButtonWishlist from "@/components/RemoveButtonWishlist";
import UserNavbar from "@/components/UseNavbar";
import BaseNavbar from "@/components/BaseNavbar";

const getWishlist = async () => {
  const userId = (await cookies().get("x-user-id")?.value) as string;
  const data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/wishlist`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      // Cookie: cookies().toString(),
      "x-user-id": userId,
    },
  }).then((response) => response.json());
  // throw new Error(JSON.stringify(data))
  return data;
};

const page = async () => {
  const data = await getWishlist();
  const isLogin = cookies().toString();
  return (
    <>
      {" "}
      {isLogin ? <UserNavbar /> : <BaseNavbar />}
      <div className="p-5 border border-1 border-gray-50 rounded-xl pt-20">
        {data.map((el: any, index: any) => (
          <div
            key={index}
            className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="#">
              <img
                className="rounded-t-lg w-full"
                src={el.products[0].thumbnail}
                alt=""
              />
            </a>

            <div className="p-5">
              <a href="#">
                <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">
                  {el.products[0].name}
                </h5>
              </a>
              <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
                {el.products[0].price}
              </p>
            </div>

            <RemoveButtonWishlist id={el._id} />
          </div>
        ))}
      </div>
    </>
  );
};

export default page;
