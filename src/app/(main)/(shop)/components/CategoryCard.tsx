import { camelCaseToTitleCase, toKebabCase } from "@/utils/functions";
import { Category } from "@/model/product";
import Link from "next/link";
import "./components.css";

const CategoryCard = ({
  category,
  children,
}: {
  category: Category;
  children: React.ReactNode;
}) => {
  const decodedCategory = toKebabCase(category) as Category;

  const categoryColors: { [k in Category]: string } = {
    mecato: "#fbbf24",
    bebidas: "#0ea5e9",
    "alimentos básicos": "#17ba5c",
    licor: "#fc3c25",
    mascotas: "#fbbf24",
    "cuidado e higiene": "#5eead4",
    aseo: "#67e8f9",
    cárnicos: "#fca5a5",
    "frutas y verduras": "#8dda51",
    otra: "#a1a1aa",
  };

  return (
    <Link className="category-card-link" href={`/${decodedCategory}`}>
      <figure className="category-card-figure">
        {children}
      </figure>
      <span className="category-card-span">
        {camelCaseToTitleCase(category)}
      </span>
    </Link>
  );
};
export default CategoryCard;
