import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";
import Swal from "sweetalert2";

function page() {
  const handleRegister = async (FormData: FormData) => {
    "use server";
    try {
      const data = {
        name: FormData.get("name"),
        email: FormData.get("email"),
        username: FormData.get("username"),
        password: FormData.get("password"),
      };
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/register",
        {
          method: "POST",
          cache: "no-cache",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      if (!response.ok) {
        throw result;
      }
    } catch (error: any) {
      console.log(error);
    }

    revalidatePath("/login");
    redirect("/login");
  };

  return (
    <>
      <div>
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
            <h2 className="text-2xl font-semibold text-center mb-4">
              Create a new account
            </h2>
            <form action={handleRegister}>
              <div className="mb-4">
                <label
                  htmlFor="fullName"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="fullName"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                />
              </div>
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
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
