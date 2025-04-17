"use client";
import ProductImage from "@/components/ProductImage";
import { formatPrice } from "@/utils/functions";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  addItem,
  addProduct,
  CartProduct,
  removeItem,
} from "@/lib/redux/reducers/cart";

import { Product } from "@/model/product";
import React, { MouseEventHandler, useRef, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoIosArrowDown, IoIosCloseCircleOutline } from "react-icons/io";
import './components.css';

const ProductDialogCard = ({ product }: { product: Product }) => {
  const { barcode, name, price, image, measure, brand, category, stockStatus } =
    product;
  const cartProduct: CartProduct = {
    barcode,
    name,
    price,
    brand,
    image,
    category,
    measure,
    stockStatus,
    quantity: 1,
  };

  const labelPrice = formatPrice(price);
  const dialog = useRef<HTMLDialogElement>(null);
  const quantity = useAppSelector((state) =>
    state.cart.value.find((v) => v.barcode === barcode),
  )?.quantity;
  const dispatch = useAppDispatch();

  const closeDialogByBounding: MouseEventHandler = (e) => {
    const dialogDimensions = e.currentTarget.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      dialog.current?.close();
    }
  };

  const remove = () => {
    dispatch(removeItem(barcode));
  };
  const add = () => {
    if (quantity) {
      dispatch(addItem(barcode));
      return;
    }
    dispatch(addProduct(cartProduct));
  };

  return (
    <>
      <button
        className="product-dialog-button"
        title={name}
        onClick={() => dialog.current?.showModal()}
      />
      <dialog
        ref={dialog}
        className="product-dialog"
        onClick={closeDialogByBounding}
      >
        <IoIosCloseCircleOutline
          onClick={() => dialog.current?.close()}
          className="product-dialog-close-icon"
        />

        <div className="product-dialog-content">
          <div className="-z-10">
            {quantity && quantity > 0 && (
              <div className="quantity-container">
                {`añadido${quantity > 1 ? `s: ${quantity}` : ""}`}
              </div>
            )}
            <div className="product-image-container">
              <ProductImage src={image} alt={name} />
            </div>
            <div className="product-info">
              <span className="product-name">
                {name}
              </span>
              <span className="product-brand">{brand}</span>
            </div>
            <div className="product-details">
              <span className="product-measure">
                {measure}
              </span>

              <span className="product-price">
                {labelPrice}
              </span>
            </div>
          </div>
          <div className="product-actions">
            <div className="action-buttons">
              {stockStatus === "out" ? (
                <span className="out-of-stock">Agotado</span>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={remove}
                    disabled={!quantity}
                    className="action-button"
                  >
                    <FaMinus  style={{ width: "1.25rem", height: "1.25rem", fill: "#4b5563", transition: "transform 0.3s", cursor: "pointer" }} />
                  </button>
                  <div
                    className={`${quantity ? "has-quantity" : "cero-quantity"}`}
                  >
                    <span>
                      {quantity || 0}
                    </span>
                  </div>
                  <button type="button" onClick={add} className="action-button">
                  <FaPlus style={{ width: "1.25rem", height: "1.25rem", fill: "#4b5563", transition: "transform 0.3s", cursor: "pointer" }}/>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

// const Description = ({ description }: { description: string }) => {
//   const [openDescription, setOpenDescription] = useState(false);

//   return (
//     <>
//       <button
//         type="button"
//         className="peer mx-auto mt-2 flex gap-3 py-2 text-center text-sm text-blue-500"
//         onClick={() => {
//           setOpenDescription(!openDescription);
//         }}
//       >
//         <span className="font-medium">Detalles</span>
//         <IoIosArrowDown
//           className={`${!openDescription && "rotate-180"} text-xl`}
//         />
//       </button>
//       <p
//         className="absolute top-0 right-0 -z-10 h-[calc(100%-6rem)] overflow-auto bg-white p-5"
//         style={{
//           translate: `${openDescription ? "none" : "0 100%"}`,
//           zIndex: `${openDescription ? "10" : "-10"}`,
//           transition: "translate 0.3s ease-in-out",
//         }}
//       >
//         {description}
//       </p>
//     </>
//   );
// };

export default ProductDialogCard;
