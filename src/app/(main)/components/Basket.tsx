"use client";
import useCart from "./useCart";
import { useEffect, useState } from "react";
import CartList from "./CartList";
import { LuShoppingBasket } from "react-icons/lu";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import "./components.css";

const Basket = () => {
  const pathname = usePathname();
  const [openCartList, setOpenCartList] = useState(false);
  const [currentCount, setCurrentCount] = useState(0);
  const { itemsCount } = useCart();
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    setCurrentCount((current) => {
      if (current < itemsCount) {
        if (!bounce) {
          setBounce(true);

          setTimeout(() => {
            setBounce(false);
          }, 500);
        }
      }
      return itemsCount;
    });
  }, [itemsCount]);

  const moveBasketToCorner =
    pathname === "/checkout" || pathname.startsWith("/order") || pathname === "/politica-de-privacidad";
  return (
    <>
      <section
        className="basket-section"
        title="Ver canasta"
        style={{
          left: moveBasketToCorner ? "3rem" : "50%",
          transition: "left 0.5s ease-out",
        }}
        onClick={() => setOpenCartList(!openCartList)}
      >
        <div
          className={`basket-container ${bounce && "animate-basket"}`}
          id="basket"
        >
          {itemsCount > 0 && (
            <div className="basket-item-count">
              <b>{currentCount}</b>
            </div>
          )}
          <LuShoppingBasket />
        </div>
      </section>
      <CartList openCartList={openCartList} setOpenCartList={setOpenCartList} />
      {moveBasketToCorner && (
        <Link
          href="/"
          className="basket-link"
        >
          <IoIosArrowBack className="text-xl" />
          <span>Ir a inicio</span>
        </Link>
      )}
    </>
  );
};

export default Basket;
