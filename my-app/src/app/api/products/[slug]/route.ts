// export const GET = () => {
//   return Response.json({ message: "Hallo" });
// };
import Product from "../../../../database/model/products";
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    // return Response.json({ message: "Hallo" });
    const products = await Product.findBySlug(params.slug);

    return Response.json(products);
  } catch (error) {
    return Response.json(
      { message: "Internal server error " + error },
      { status: 500 }
    );
  }
}
