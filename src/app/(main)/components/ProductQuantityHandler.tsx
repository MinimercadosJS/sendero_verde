import { useAppDispatch } from "@/lib/redux/hooks"
import { addItem, removeItem } from "@/lib/redux/reducers/cart"
import { FaMinus, FaPlus, FaRegTrashCan } from "react-icons/fa6"

const ProductQuantityHandler = ({quantity, barcode}: {quantity: number, barcode: string}) => {
    const dispatch = useAppDispatch()
    return (
  
      <div className='product-quantity-handler'>
        <div className='icon' onClick={() => dispatch(removeItem(barcode))}>
          {quantity > 1 ? <FaMinus /> : <FaRegTrashCan />}
        </div>
        <span className='quantity'>{quantity}</span>
        <div className='icon' onClick={() => dispatch(addItem(barcode))}>
          <FaPlus /></div>
      </div>
    )
  }

export default ProductQuantityHandler