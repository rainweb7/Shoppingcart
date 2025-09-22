import { useEffect, useState } from "react";
import api from "../services/api";

const Cart = ({ token }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await api.get("/carts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data);
    } catch {
      alert("Error fetching cart");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Your Cart</h3>
      {cart.length > 0 ? (
        <ul className="list-group">
          {cart.map((c) => (
            <li key={c.id} className="list-group-item">
              Cart ID: {c.id} | Item ID: {c.item_id}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in cart</p>
      )}
    </div>
  );
};

export default Cart;
