import { Category } from "@/model/product";
import ProductCard from "./ProductCard";
import { getSamplesByCategory } from "@/lib/mongo/products";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { toKebabCase } from "@/utils/functions";
import CanastaFamiliarIcon from "@/assets/icons/categories/canastaFamiliar";
import { ReactNode } from "react";
import BebidasIcon from "@/assets/icons/categories/bebidas";
import MecatoIcon from "@/assets/icons/categories/mecato";
import MascotasIcon from "@/assets/icons/categories/mascotas";
import LicorIcon from "@/assets/icons/categories/licor";

const ProductsSlider = async ({
  title,
  category,
}: {
  title: string;
  category: Category;
}) => {
  const products = await getSamplesByCategory(category, 15);
  const Icon: { [k in Category]?: ReactNode } = {
    "alimentos básicos": <CanastaFamiliarIcon />,
    bebidas: <BebidasIcon />,
    mecato: <MecatoIcon />,
    mascotas: <MascotasIcon />,
    licor: <LicorIcon />,
  };

  return (
    <section className="my-10">
      <div className="flex items-center justify-between px-5">
        <h2 className="pb-0 text-xl font-semibold text-gray-500">{title}</h2>
        <Link
          href={`/${toKebabCase(category)}`}
          className="flex flex-row items-center text-green-600"
        >
          Ver más <IoIosArrowForward />{" "}
        </Link>
      </div>
      <div className="w-full overflow-x-auto overflow-y-hidden px-5">
        <div
          className="grid w-fit grid-flow-col place-items-center gap-6 py-5 pr-1"
          id="products-slider"
        >
          {Icon[category] && (
            <Link
              href={`/${toKebabCase(category)}`}
              className="flex h-28 w-28 flex-row items-center text-green-600"
            >
              <div className="flex h-28 w-28 items-center justify-center text-xl text-gray-500">
                {Icon[category]}
              </div>
            </Link>
          )}
          {products
            .filter((product) => product.category === category)
            .map((product) => (
              <ProductCard product={product} key={product.barcode} />
            ))}

          <Link
            href={`/${toKebabCase(category)}`}
            className="flex h-full w-32 items-center justify-center text-xl text-gray-500"
          >
            <span className="text-center">Ver más</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsSlider;
