import { Product } from "@/model/product";
import AddToCart from "./AddToCart";
import { formatPrice } from "@/utils/functions";
import ProductImage from "@/components/ProductImage";
import "./components.css";

const ProductCard = ({ product }: { product: Product }) => {
  const { name, image, measure, price, stockStatus , brand} = product;

  const labelPrice = formatPrice(price);
  return (
    <div className="product-card">
      {stockStatus !== "out" && <AddToCart product={product} />}
      <div className="product-card-content">
        <div className="product-card-image-container">
          <ProductImage src={image} alt={name} />
        </div>
        <span className="product-card-brand">{brand}</span>
        <h3 className="product-card-name">
          {name}
        </h3>
        <div className="product-card-details">
          <span className="product-card-measure">{measure}</span>
          <span className="product-card-price">
            {labelPrice}
          </span>
        </div>
        {stockStatus === "out" && (
          <span className="product-card-out-of-stock">
            Agotado
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
