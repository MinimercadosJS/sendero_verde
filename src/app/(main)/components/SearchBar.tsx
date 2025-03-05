'use client'
import { querySearch } from "@/lib/mongo/products"
import { Product } from "@/model/product"
import { useEffect, useRef, useState } from "react"
import ProductImage from "@/components/ProductImage"
import { useDebounceValue } from "usehooks-ts"
import { formatPrice } from "@/utils/functions"
import { IoIosClose, IoIosSearch } from "react-icons/io"
import ProductDialogCard from "./ProductDialogCard"
import clsx from "clsx"
import Link from "next/link"

const SearchBar = () => {
    const [results, setResults] = useState<Product[]>([])
    const [query, setQuery] = useDebounceValue<string>("", 600);
    const [loading, setLoading] = useState(false)
    const input = useRef<HTMLInputElement>(null)
    const [inputValue, setInputValue] = useState<string>("")
    const [animate, setAnimate] = useState(false)

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
        setAnimate(true);
        setTimeout(() => {
            setAnimate(false);
        },500)
    }, [query]);


    const resetSearch = () => {
        setLoading(false)
        setInputValue('');     
        setQuery('');
        setResults([]);
    }

    return (
        <div className={clsx("h-fit bg-white relative flex flex-row grow max-w-xl z-50 rounded-full border-gray-200 border-2 py-2", animate && "animate-searchbar")} >
            <input
                className="w-full outline-hidden px-5 bg-transparent text-2xl"
                placeholder="Buscar producto"
                value={inputValue}
                onChange={(e) => {setInputValue(e.target.value); setQuery(e.target.value)}}
                ref={input}
            />
            {
                results.length > 0 &&
                <ul className="absolute top-12 left-0 md:absolute w-full shadow-md max-h-96 overflow-scroll" >
                    {results.map((result) => (
                        <ProductListItem key={result.barcode} product={result} />
                    ))}
                  { results.length >= 15 && <li className="bg-white">
                        <Link href={`/buscar?query=${query}`} onClick={()=> resetSearch()}>
                            <span className="text-center block text-blue-600 py-3">Ver más resultados</span>
                        </Link>
                    </li>}
                </ul>
            }
            {
                results.length < 1 && inputValue.length > 0 && (
                    <div className="absolute bg-slate-50 top-12 left-0 md:absolute   w-full shadow-md p-4 text-center text-lg">
                    {
                        loading ? <span>Buscando...</span> :
                        <span> Lo sentimos, no tenemos resultados para esta búsqueda</span>
                    }
                    </div>
                )
            } 
            
            <div className="text-4xl px-3 text-slate-600">

                {
                    query.length === 0 ? <IoIosSearch /> : <IoIosClose onClick={resetSearch} />
                }
            </div>
        </div>
    )
}

const ProductListItem = ({ product }: { product: Product }) => {
    const { name, brand, measure, price, image, stockStatus } = product;
    return (
        <li className="relative max-w-full w-full odd:bg-slate-100 even:bg-slate-50">
            {stockStatus !== 'out' && <ProductDialogCard product={product} />}
            <ProductDialogCard product={product} />
            <div className="flex size-full items-center">
                <div className="min-w-16 md:min-w-20">
                    <ProductImage src={image} alt={name} />
                </div>
                <div className="*:mx-2 items-baseline grow max-w-full ">
                    <b className="line-clamp-1">{name}</b>
                    <span className="text-sm">{brand}</span>
                    <span className="text-sm">{measure}</span>
                    {stockStatus === 'out' && <span className="text-red-600 font-semibold text-sm">Agotado</span>}
                </div>
                <b className="mx-2 text-nowrap text-sm">
                    {formatPrice(price)}
                </b>
            </div>
        </li>
    )
}
export default SearchBar;