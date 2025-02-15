"use client";
import { Product } from "@/model/product";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { querySearch } from "@/lib/mongo/products";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";

const page = () => {
  return (
    <div>
      <Link
        href="/"
        className="flex items-center justify-center gap-1 text-green-600 sm:text-lg md:text-xl lg:text-2xl"
      >
        <IoIosArrowBack /> Inicio
      </Link>
      <Suspense fallback={<div>Cargando Productos...</div>}>
        <Products />
      </Suspense>
    </div>
  );
};

const Products = () => {
  const params = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const query = params.get("query");

  useEffect(() => {
    const fetchResults = async () => {
      if (query) {
        const response = await querySearch(query, 50);
        setProducts(response as Product[]);
      }
    };
    fetchResults();
  }, [query]);

  return (
    <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(9rem,1fr))] place-items-center gap-5 p-2 py-10">
      {products &&
        Array.isArray(products) &&
        products.map((product, key) => (
          <ProductCard product={product} key={key} />
        ))}
    </div>
  );
};
export default page;
