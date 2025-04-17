"use client";
import { querySearch } from "@/lib/mongo/products";
import { Product } from "@/model/product";
import { useEffect, useRef, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { IoIosClose, IoIosSearch } from "react-icons/io";
import ProductImage from "@/components/ProductImage";
import { formatPrice } from "@/utils/functions";
import ProductDialogCard from "./ProductDialogCard";
import Link from "next/link";

const SearchBar = () => {
  const [results, setResults] = useState<Product[]>([]);
  const [query, setQuery] = useDebounceValue<string>("", 600);
  const [loading, setLoading] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      if (query) {
        const response = await querySearch(query);
        const results = response as Product[];
        setResults(results);
        setLoading(false);
      } else {
        setResults([]);
      }
    };
    fetchResults();
  }, [query]);

  const resetSearch = () => {
    setLoading(false);
    setInputValue("");
    setQuery("");
    setResults([]);
  };

  return (
    <div className="relative z-50 flex max-w-xl grow flex-row rounded-full border-2 border-gray-200 bg-white py-2">
      <input
        className="w-full bg-transparent px-5 text-2xl outline-hidden"
        placeholder="Buscar producto"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setQuery(e.target.value);
        }}
        ref={input}
      />
      {results.length > 0 && (
        <ul className="fixed left-0 w-full translate-y-10 shadow-md md:absolute">
          {results.map((result) => (
            <ProductListItem key={result.barcode} product={result} />
          ))}
        </ul>
      )}
      {results.length < 1 && inputValue.length > 0 && (
        <div className="fixed left-0 w-full translate-y-10 bg-slate-50 p-4 text-center text-lg shadow-md md:absolute">
          {loading ? (
            <span>Buscando...</span>
          ) : (
            <span> Lo sentimos, no tenemos resultados para esta búsqueda</span>
          )}
        </div>
      )}

      <div className="px-3 text-4xl text-slate-600">
        {query.length === 0 ? (
          <IoIosSearch />
        ) : (
          <IoIosClose onClick={resetSearch} />
        )}
      </div>
    </div>
  );
};

const ProductListItem = ({ product }: { product: Product }) => {
  const { name, brand, measure, price, image, stockStatus } = product;
  return (
    <li className="relative w-full max-w-full odd:bg-gray-100 even:bg-gray-50">
      <div className="flex size-full items-center">
        <div className="min-w-16 md:min-w-20">
          <ProductDialogCard product={product} />
          <ProductImage src={image} alt={name} />
        </div>
        <Link href={`/admin/edit-product/${product.barcode}`}>
          <div className="max-w-full grow items-baseline *:mx-2">
            <b className="line-clamp-1">{name}</b>
            <span className="text-sm">{brand}</span>
            <span className="text-sm">{measure}</span>
            {stockStatus === "out" && (
              <span className="text-sm font-semibold text-red-600">
                Agotado
              </span>
            )}
          </div>
        </Link>
        <b className="mx-2 text-sm text-nowrap">{formatPrice(price)}</b>
      </div>
    </li>
  );
};
export default SearchBar;
