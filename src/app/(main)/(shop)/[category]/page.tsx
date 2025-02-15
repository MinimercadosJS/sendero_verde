import { getProductsByCategory } from "@/lib/mongo/products";
import { Category } from "@/model/product";
import { kebabToLowerCase } from "@/utils/functions";
import ProductCard from "../components/ProductCard";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ category: Category }>;
}) => {
  const { category } = await params;
  const decodedCategory = decodeURI(kebabToLowerCase(category)) as Category;

  const products = await getProductsByCategory(decodedCategory);

  return (
    <div className="w-full">
      <section className="grid w-full grid-cols-[repeat(auto-fill,minmax(9rem,1fr))] place-items-center gap-5 p-2 py-10 ">
        {products &&
          Array.isArray(products) &&
          products.map((product, key) => (
            <ProductCard product={product} key={key} />
          ))}
      </section>
    </div>
  );
};

export default CategoryPage;
