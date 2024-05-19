/* eslint-disable @next/next/no-img-element */
import React, { cache } from "react";
import Navbar from "@/components/Navbar";
import { Products } from "@/interfaces";
async function getData(): Promise<Products[]> {
  const data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/products`, {
    cache: "no-store",
  });
  return data.json();
}
async function page({ params }: { params: { slug: string } }) {
  const data: Array<Products> = await getData();
  const result = data.filter((item) => item.slug == params.slug)[0];
  return (
    <>
      <Navbar />
      {/* component */}
      {/* This is an example component */}
      <div className="max-w-2xl mx-auto pt-24 w-4/5 w-ful">
        <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <img className="rounded-t-lg w-full" src={result.image[1]} alt="" />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">
                Name: {result.name}
              </h5>
            </a>
            <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
              <b> Description : </b> {result.description}
            </p>
            <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
              <b>Price :</b> {result.price}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
