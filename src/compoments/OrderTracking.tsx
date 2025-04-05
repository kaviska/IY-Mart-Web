import React from "react";

interface Order {
  id: number;
  order_number: string;
  order_status: string;
  total: number;
  currency: string;
  payment_status: string;
  order_items: {
    product_name: string;
    unit_quantity: number;
    line_total: number;
  }[];
}

interface OrderTrackingProps {
  orders: Order[];
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ orders }) => {
  return (
    <div className="min-h-screen p-6 ">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
          >
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-700">
                Order #{order.order_number}
              </h2>
              <p className="text-sm text-gray-500">
                Status:{" "}
                <span
                  className={`font-bold ${
                    order.order_status === "completed"
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                >
                  {order.order_status}
                </span>
              </p>
            </div>
            <div className="mb-4">
              <p className="text-gray-600">
                <strong>Total:</strong> {order.currency}{" "}
                {order.total.toFixed(2)}
              </p>
              <p className="text-gray-600">
                <strong>Payment Status:</strong> {order.payment_status}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Items:</h3>
              <ul className="space-y-4">
                {order.order_items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg"
                  >
                    <img
                      src="/sauce.svg" // Placeholder image
                      alt={item.product_name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <p className="text-gray-700 font-medium">
                        {item.product_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.unit_quantity} pcs - {order.currency}{" "}
                        {item.line_total.toFixed(2)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTracking;