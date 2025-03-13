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
import "./components.css";
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
    <section className="products-slider-section">
      <div className="products-slider-header">
        <h2 className="products-slider-title">{title}</h2>
        <Link
          href={`/${toKebabCase(category)}`}
          className="products-slider-link"
        >
          Ver más <IoIosArrowForward />{" "}
        </Link>
      </div>
      <div className="products-slider-container">
        <div className="products-slider-grid" id="products-slider">
          {Icon[category] && (
            <Link
              href={`/${toKebabCase(category)}`}
              className="products-slider-icon-link"
            >
              {Icon[category]}
            </Link>
          )}
          {products
            .filter((product) => product.category === category)
            .map((product) => (
              <ProductCard product={product} key={product.barcode} />
            ))}

          <Link
            href={`/${toKebabCase(category)}`}
            className="products-slider-more-link"
          >
            <span className="products-slider-more-text">Ver más</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsSlider;