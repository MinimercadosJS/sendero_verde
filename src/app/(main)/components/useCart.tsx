import { useAppSelector } from "@/lib/redux/hooks";
import { selectItemsCount, selectSubtotal } from "@/lib/redux/reducers/cart";
import "./components.css";
const useCart = () => {
    const subtotal = useAppSelector(selectSubtotal)
    const itemsCount = useAppSelector(selectItemsCount)

    return { subtotal, itemsCount}
}


export default useCart 