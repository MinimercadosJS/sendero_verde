import { camelCaseToTitleCase, toKebabCase } from "@/utils/functions";
import { Category } from "@/model/product";
import Link from "next/link";
import clsx from "clsx";

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
    <Link className="flex flex-col items-center" href={`/${decodedCategory}`}>
      <figure
        className="aspect-square w-24 rounded-lg p-1 sm:w-20 md:w-24 *:drop-shadow-[0px_0px_2px_#ffffff]"
        // style={{ backgroundColor: categoryColors[category] }}
      >
        {children}
      </figure>
      <span className="font-light sm:text-lg">
        {camelCaseToTitleCase(category)}
      </span>
    </Link>
  );
};
export default CategoryCard;
