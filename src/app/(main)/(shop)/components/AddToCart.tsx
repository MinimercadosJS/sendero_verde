'use client'
import { Product } from "@/model/product"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { addProduct, CartProduct } from "@/lib/redux/reducers/cart"
import { IoAdd } from "react-icons/io5"
import ProductDialogCard from "../../components/ProductDialogCard"
import "./components.css"

const AddToCart = ({ product }: { product: Product }) => {
    const { name, barcode, price, brand, image, measure, category, stockStatus } = product

    const dispatch = useAppDispatch()

    const cartProduct: CartProduct = {
        name,
        barcode,
        price,
        brand,
        image,
        category,
        measure,
        stockStatus,
        quantity: 1
    }

    const addToCart = () => {

        dispatch(addProduct(cartProduct))
    }
    const quantity = useAppSelector(state => state.cart.value.find((v) => v.barcode === barcode))?.quantity

    return (
        <div className="cart-container">
            {quantity &&
                <div className="quantity-badge">
                    <b className="quantity-text">{quantity}</b>
                </div>
            }
            <IoAdd className="add-icon"
                title="Añadir al carrito"
                onClick={() => addToCart()}
            />
            <ProductDialogCard product={product} />
        </div>
    )
}

export default AddToCart