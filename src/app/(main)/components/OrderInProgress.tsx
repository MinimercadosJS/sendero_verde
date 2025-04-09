"use client";
import { camelCaseToTitleCase, formatPrice } from "@/utils/functions";
import { setAllowedToShopOvertime } from "@/lib/actions";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { getInitialOrders } from "@/lib/redux/reducers/clientOrders";
import { Order } from "@/model/order";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import { MdDeliveryDining } from "react-icons/md";
import "./components.css";

const OrderInProgress = () => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.clientOrders);

  useLayoutEffect(() => {
    dispatch(getInitialOrders());
    setAllowedToShopOvertime();
  }, [dispatch]);

  const dialog = useRef<HTMLDialogElement>(null);
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      {orders.length > 0 && (
        <div className="order-in-progress">
          <div className="order-count">
            {orders.length}
          </div>
          <MdDeliveryDining onClick={() => setOpenModal((v) => !v)} />
          <dialog
            open={openModal}
            ref={dialog}
            className="order-dialog"
          >
            <div className="order-dialog-header">
              <span>{orders.length > 1 ? "Tus pedidos" : "Tu pedido"}</span>
              <button
                onClick={() => setOpenModal(false)}
              >
                Cerrar <CgClose />
              </button>
            </div>
            {orders.map((order, index) => (
              <OrderListItem
                order={order}
                closeDialog={() => setOpenModal(false)}
                key={index}
              />
            ))}
          </dialog>
        </div>
      )}
    </>
  );
};
const OrderListItem = ({
  order,
  closeDialog,
}: {
  order: Order;
  closeDialog: () => void;
}) => {
  const {
    deliveryAddress: { unit, apartment, building },
    subtotal,
    deliveryFee,
    status,
    _id,
  } = order;
  const estado = {
    pending: "en progreso...",
    packed: "en camino...",
    delivered: "entregado",
  };
  const totalPrice = deliveryFee + subtotal;
  return (
    <Link
      href={`/order/${_id}`}
      className="order-list-item"
      onClick={closeDialog}
    >
      <div className="order-header">
        <span className="text-sm">{camelCaseToTitleCase(`${unit} verde`)}</span>
      <span className="status">{estado[status]}</span>
      </div>
      <div className="order-details">
        <span className="address">
          <span>
            T<b>{building}</b>
          </span>
          <span>
            AP <b>{apartment}</b>
          </span>
        </span>
        <span className="price">{formatPrice(totalPrice)}</span>
      </div>
    </Link>
  );
};

export default OrderInProgress;
