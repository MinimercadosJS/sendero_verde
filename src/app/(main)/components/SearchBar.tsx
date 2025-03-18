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
import "./components.css"

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
        <div className={clsx("search-bar", animate && "animate-searchbar")} >
            <input
                placeholder="Buscar producto"
                value={inputValue}
                onChange={(e) => {setInputValue(e.target.value); setQuery(e.target.value)}}
                ref={input}
            />
            {
                results.length > 0 &&
                <ul>
                    {results.map((result) => (
                        <ProductListItem key={result.barcode} product={result} />
                    ))}
                  { results.length >= 15 && <li className="see-more">
                        <Link href={`/buscar?query=${query}`} onClick={()=> resetSearch()}>
                            <span>Ver más resultados</span>
                        </Link>
                    </li>}
                </ul>
            }
            {
                results.length < 1 && inputValue.length > 0 && (
                    <div className="no-results">
                    {
                        loading ? <span>Buscando...</span> :
                        <span> Lo sentimos, no tenemos resultados para esta búsqueda</span>
                    }
                    </div>
                )
            } 
            
            <div className="icon">

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
        <li id="product-list-item">
            {stockStatus !== 'out' && <ProductDialogCard product={product} />}
            <ProductDialogCard product={product} />
            <div id="product-info">
                <div id="image">
                    <ProductImage src={image} alt={name} />
                </div>
                <div id="details">
                    <b>{name}</b>
                    <span >{brand}</span>
                    <span >{measure}</span>
                    {stockStatus === 'out' && <span id="out-of-stock">Agotado</span>}
                </div>
                <b className="mx-2 text-nowrap text-sm">
                    {formatPrice(price)}
                </b>
            </div>
        </li>
    )
}
export default SearchBar;