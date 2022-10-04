import { useSelector } from "react-redux";
import "./Cart.css";

const Cart = ({ open, onClose, onRemove }) => {
    const items = useSelector(({ cart }) => cart);

    const handleClose = () => {
        onClose();
    }

    const handleRemove = (item) => {
        onRemove(item);
    }

    let total = 0;
    const map = items.map((item) => {
        total += item.price;
        return (
            <li key={item.name} className="cart-item">
                <div className="cart-item-image-wrapper">
                    <img 
                        alt={item.name}
                        className="cart-item-image"
                        src={item.sprite}
                    />
                </div>
                <div className="cart-item-details">
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                    <button type="button" onClick={() => handleRemove(item)}>Remover</button>
                </div>
            </li>
        )
    })

    return(
        <div className={`cart-wrapper${open ? ' open' : ''}`}>
            <button type="button" onClick={handleClose}>Fechar</button>
            <ul>
                {map}
            </ul>
            <p>{`Total: ${total}`}</p>
        </div>
    )
}

export default Cart; 