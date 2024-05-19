import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import Swal from "sweetalert2";

function page() {
  const handleLogin = async (FormData: FormData) => {
    "use server";

    const rawFormData = {
      email: FormData.get("email"),
      password: FormData.get("password"),
    };
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/login",
      {
        method: "POST",
        headers: {
          "Conten-type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify(rawFormData),
      }
    );
    const result = await response.json();

    if (!response.ok) {
      Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
      });
      redirect("login?err=" + result.error);
    }
    // throw new Error(JSON.stringify(result));

    cookies().set("Authorization", `Bearer ${result.accessToken}`);
    // Tambahkan nama user ke cookies
    cookies().set("x-user-name", result.username);
    cookies().set("x-user-id", result.userId);

    redirect("/home");
  };

  return (
    <>
      <div>
        <>
          <div className="bg-gray-100 flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
              <div className="flex justify-center mb-6">
                <span className="inline-block bg-gray-200 rounded-full p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
                    />
                  </svg>
                </span>
              </div>
              <h2 className="text-2xl font-semibold text-center mb-4"></h2>
              <p className="text-gray-600 text-center mb-6"></p>
              <form action={handleLogin}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                    placeholder="hello@alignui.com"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Password *
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </>
      </div>
      <button>buton</button>
    </>
  );
}

export default page;
