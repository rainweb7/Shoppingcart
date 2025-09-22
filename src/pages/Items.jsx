import { useEffect, useState } from "react";
import api from "../services/api";

const Items = ({ token }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await api.get("/items");
    setItems(res.data);
  };

  const addToCart = async (itemId) => {
    try {
      await api.post("/carts", { item_id: itemId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Item added to cart!");
    } catch {
      alert("Error adding to cart");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Available Items</h3>
      <div className="row">
        {items.map((item) => (
          <div className="col-md-4 mb-3" key={item.id}>
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">Price: ${item.price}</p>
                <button
                  className="btn btn-success"
                  onClick={() => addToCart(item.id)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
