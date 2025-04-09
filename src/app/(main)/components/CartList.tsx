"use client";
import ProductQuantityHandler from "./ProductQuantityHandler";
import { formatPrice } from "@/utils/functions";
import { useAppSelector } from "@/lib/redux/hooks";
import { CartProduct } from "@/lib/redux/reducers/cart";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { CgClose } from "react-icons/cg";
import useCart from "./useCart";
import { BiArrowBack } from "react-icons/bi";
import dynamic from "next/dynamic";
import "./components.css";


const LottieAnimation = dynamic(
  () => import("@/components/LottieAddToCartAnimation"),
  { ssr: false },
);

type props = {
  openCartList: boolean;
  setOpenCartList: Dispatch<SetStateAction<boolean>>;
};
const CartList = ({ openCartList, setOpenCartList }: props) => {
  const cartList = useAppSelector((state) => state.cart.value);
  const { subtotal, itemsCount } = useCart();
  return (
    <>
      {openCartList && (
        <div
          className="cart-backdrop"
          onClick={() => setOpenCartList(false)}
        />
      )}

      <div
        className={`${openCartList ? "openCart" : "closeCart"} cart-list`}
        id="cartList"
      >
        <div className="cart-list-header">
          <span>Tu canasta</span>
          <button

            onClick={() => setOpenCartList(false)}
          >
            Cerrar <CgClose />
          </button>
        </div>
        {itemsCount === 0 ? (
          <div className="cart-list-empty">
            <span>Tu canasta esta vacía</span>
            <figure>
              <LottieAnimation />
            </figure>
            <button
              onClick={() => setOpenCartList(false)}
            >
              <BiArrowBack
                className="rotate"
              /> Añade productos
            </button>
          </div>
        ) : (
          <>
            <div className="cart-list-items">
              {cartList.map((product) => (
                <ProductListItem product={product} key={product.barcode} />
              ))}
            </div>

            <div className="cart-list-footer">
              <span>
                Subtotal:{" "}
                <b>{formatPrice(subtotal)}</b>
              </span>
              <Link
                href="/checkout"
                onClick={() => setOpenCartList(false)}
              >
                Revisar y pedir
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};
const ProductListItem = ({ product }: { product: CartProduct }) => {
  const { barcode, quantity, image, name, price } = product;

  return (
    <div className="product-list-item">
      <figure>
        <CldImage
          src={image}
          fill
          alt={`${name} ${price}`}
          className="object-cover"
        />
      </figure>
      <div className="product-info">
        <span>{name}</span>
        <span className="product-price">{formatPrice(price)} c/u</span>
        <span className="product-total">{formatPrice(price * quantity)}</span>
      </div>
      <ProductQuantityHandler barcode={barcode} quantity={quantity} />
    </div>
  );
};

export default CartList;
