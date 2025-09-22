import { useEffect, useState } from "react";
import api from "../services/api";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch {
      alert("Error fetching orders");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Your Orders</h3>
      {orders.length > 0 ? (
        <ul className="list-group">
          {orders.map((o) => (
            <li key={o.id} className="list-group-item">
              Order ID: {o.id}
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders placed</p>
      )}
    </div>
  );
};

export default Orders;
