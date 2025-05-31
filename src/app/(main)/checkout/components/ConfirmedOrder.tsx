import BancolombiaLogo from "@/assets/icons/BancolombiaLogo";
import { WhatsappIcon } from "@/assets/icons/whatsappLogo";
import ProductImage from "@/components/ProductImage";
import { Order } from "@/model/order";
import { formatPrice } from "@/utils/functions";
import Link from "next/link";

const ConfirmedOrder = ({ order }: { order: Order | null }) => {
  const estado = {
    pending: "Tu pedido esta siendo preparado...",
    packed: "Tu pedido está en camino...",
    delivered: "Tu pedido ha sido entregado",
  };
  return (
    <>
      {order && (
        <div className="flex w-full flex-col items-center justify-center pb-24">
          <div className="my-10 text-center text-2xl font-light">
            <h1>Gracias por tu compra </h1>
            <span className="text-blue-500">{estado[order.status]}</span>
          </div>

          <div className="px-3 *:my-5">
            <h2 className="my-1 text-center text-gray-400">Resumen del pedido</h2>
            <h3 className="text-center text-2xl">
              Total: <b>{formatPrice(order.subtotal + order.deliveryFee)}</b>
            </h3>

            <p className="px-10 flex flex-col text-lg">
              <span >Los precios y disponibilidad de los productos pueden estar sujetos a cambios. </span>
              <span className="font-semibold">Confirma con el domiciliario tu pedido.  </span>
            </p>

            <div className="my-5 flex flex-col gap-5 py-10">
              <Link
                href="http://api.whatsapp.com/send?phone=573025287020"
                className="flex flex-row items-center gap-10"
              >
                <WhatsappIcon className="text-5xl" />
                <span className="font-semibold">302 5287020</span>
              </Link>
              <figure className="flex flex-row gap-10 text-5xl">
                <BancolombiaLogo />
                <p className="flex flex-col gap-2">
                  <span className="text-base">Ahorros Bancolombia:</span>
                  <span className="text-base font-semibold tracking-wider">
                    60900006092
                  </span>
                </p>
              </figure>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-3">
                <span>
                  Cliente: <b>{order.customerName}</b>
                </span>
                <div className="flex gap-5">
                  <span>
                    T: <b>{order.deliveryAddress.building}</b>
                  </span>
                  <span>
                    Apto: <b>{order.deliveryAddress.apartment}</b>
                  </span>
                </div>
                <span>
                  Teléfono: <b>{order.customerPhone}</b>
                </span>
              </div>
            </div>

            <ul className="">
              {order.products.map((product) => (
                <li
                  key={product.barcode}
                  className="flex items-center justify-between gap-5 border-b-2 border-gray-300 py-1 first:border-t-2"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16">
                      <ProductImage src={product.image} alt={product.name} />
                    </div>
                    <div className="flex flex-col items-start text-left">
                      <span className="leading-4">{product.name}</span>
                      <span className="mt-2 text-xs">
                        {formatPrice(product.unitPrice)} c/u
                        <b className="mx-2">
                          {" "}
                          {formatPrice(product.totalPrice)}
                        </b>
                      </span>
                    </div>
                  </div>
                  <div className="w-7 rounded-full bg-green-500 text-center text-white">
                    <span className="font-mono text-xl">
                      {product.quantity}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
const BackHomeButton = () => {
  return (
    <Link href="/" className="">
      <button className="rounded-full bg-blue-500 px-5 py-2 text-xl text-white">
        Volver al inicio
      </button>
    </Link>
  );
};

export default ConfirmedOrder;
