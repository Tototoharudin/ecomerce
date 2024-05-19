"use client";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getUsername, handleLogout } from "../method/event";

function UserNavbar() {
  // Menyimpan Username
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function invoke() {
      const username = await getUsername();

      setUsername(`${username}`);
    }

    invoke();
  }, []);
  return (
    <>
      <nav className="w-full py-1 bg-white shadow-lg border-b border-blue-400 fixed z-50">
        <div className="w-full flex items-center justify-between mt-0 px-6 py-2">
          <input className="hidden" type="checkbox" id="menu-toggle" />
          <div
            className="md:flex md:items-center md:w-auto w-full order-3 md:order-100"
            id="menu"
          >
            <nav>
              <ul className="md:flex items-center justify-between text-base text-black pt-4 md:pt-0">
                <li>
                  <div>
                    <Link href="/home">
                      <img
                        src="https://www.adidas.co.id/media/logo/adidas-logo.png"
                        className="mr-5 h-6 sm:h-9"
                        alt="logo"
                      />
                    </Link>
                  </div>
                </li>
                <li>
                  <Link
                    className="inline-block no-underline hover:text-black font-medium text-lg py-2 px-4 lg:-ml-2"
                    href="/home"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className="inline-block no-underline hover:text-black font-medium text-lg py-2 px-4 lg:-ml-2"
                    href="/wishlist"
                  >
                    Wishlist
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div
            className="order-2 md:order-3 flex gap-10 flex-wrap items-center justify-end mr-0 md:mr-4"
            id="nav-content"
          >
            <p>{`Welcome, ${username ? username : "Guest"}`}</p>

            <button
              className="bg-blue-600 text-gray-200 p-2 rounded hover:bg-blue-500 hover:text-gray-100"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default UserNavbar;
