import { getProductsByCategory } from "@/lib/mongo/products";
import { Category } from "@/model/product";
import { kebabToLowerCase } from "@/utils/functions";
import ProductCard from "../components/ProductCard";
import './category.css'

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ category: Category }>;
}) => {
  const { category } = await params;
  const decodedCategory = decodeURI(kebabToLowerCase(category)) as Category;

  const products = await getProductsByCategory(decodedCategory);

  return (
    <div className="category-container">
      <section>
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
