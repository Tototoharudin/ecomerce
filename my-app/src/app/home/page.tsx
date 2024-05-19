/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import React from "react";
import { Products } from "@/interfaces";
import BaseNavbar from "@/components/BaseNavbar";

import Baner from "@/components/Baner";
import Footer from "@/components/Footer";
import { cookies } from "next/headers";
import AddButtonWishlist from "@/components/AddButtonWishlist";
import UserNavbar from "@/components/UseNavbar";
async function getData(): Promise<Products[]> {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/products", {
    cache: "no-store",
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function pageHome() {
  const data = await getData();

  const isLogin = cookies().toString();
  return (
    <>
      {isLogin ? <UserNavbar /> : <BaseNavbar />}
      <Baner />
      <div>
        {/* component */}
        {/* This is an example component */}
        <div className="px-10 mt-5 grid grid-cols-4 gap-5">
          {data.map((el, index) => {
            return (
              <div
                key={index}
                className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700"
              >
                <a href="#">
                  <img
                    className="rounded-t-lg w-full"
                    src={el.thumbnail}
                    alt=""
                  />
                </a>

                <div className="p-5">
                  <a href="#">
                    <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">
                      {el.name}
                    </h5>
                  </a>
                  <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
                    {el.price}
                  </p>
                  <div className="flex justify-around gap-20">
                    <Link
                      href={`/detail/${el.slug}`}
                      className="text-white justify-center  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Detail Product
                    </Link>
                    {isLogin && <AddButtonWishlist id={el._id} />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default pageHome;
