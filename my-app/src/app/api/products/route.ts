// export const GET = () => {
//   return Response.json({ message: "Hallo" });
// };
import Product from "../../../database/model/products";
export async function GET() {
  try {
    const products = await Product.findAll();

    return Response.json(products);
  } catch (error) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
