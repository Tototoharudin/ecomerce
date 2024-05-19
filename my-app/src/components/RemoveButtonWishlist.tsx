"use client";
import React from "react";
import { removeWishlist } from "@/method/event";

const RemoveButtonWishlist = ({ id }: { id: string }) => {
  return (
    <button
      className="text-white justify-center  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      onClick={async () => await removeWishlist(id)}
    >
      {" "}
      Remove Wishlist{" "}
    </button>
  );
};

export default RemoveButtonWishlist;
