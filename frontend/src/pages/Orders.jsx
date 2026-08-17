import { useEffect, useState } from "react";
import API from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await API.get("/orders/my");
        setOrders(res.data.orders || []);
      } catch (error) {
        console.error("Orders error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-xl">Loading orders...</p>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold">No Orders Yet</h1>
        <p className="text-gray-500 mt-3">
          Your orders will appear here after checkout.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">
        My Orders
      </h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-2xl shadow p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="font-bold">
                  Order #{order._id.slice(-8)}
                </p>

                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold">
                {order.status}
              </span>
            </div>

            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 border-b pb-4"
                >
                  <img
                    src={item.product?.image || item.image}
                    alt={item.product?.name || item.name}
                    className="w-20 h-20 object-contain bg-gray-100 rounded-xl p-2"
                  />

                  <div className="flex-1">
                    <h2 className="font-semibold">
                      {item.product?.name || item.name}
                    </h2>

                    <p className="text-gray-500">
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>

                  <p className="font-bold">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <span className="font-semibold">
                Order Total
              </span>

              <span className="text-2xl font-bold">
                ₹{order.totalAmount}
              </span>
            </div>

            {order.shippingAddress && (
              <div className="mt-6 border-t pt-5">
                <h3 className="font-bold mb-2">
                  Delivery Address
                </h3>

                <p className="text-gray-600">
                  {order.shippingAddress.address},{" "}
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.pincode}
                </p>

                <p className="text-gray-600">
                  Phone: {order.shippingAddress.phone}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
