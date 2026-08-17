import { Trash2, Plus, Minus } from "lucide-react";

function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  const product = item.product;

  return (
    <div className="flex flex-col md:flex-row gap-5 items-center bg-white p-5 rounded-2xl shadow">
      <img
        src={product.image}
        alt={product.name}
        className="w-28 h-28 object-contain rounded-xl bg-gray-100 p-3"
      />

      <div className="flex-1 w-full">
        <h2 className="font-bold text-lg">
          {product.name}
        </h2>

        <p className="text-gray-500">
          ₹{product.price}
        </p>

        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={() => onDecrease(product._id)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            <Minus size={16} />
          </button>

          <span className="font-bold w-8 text-center">
            {item.quantity}
          </span>

          <button
            onClick={() => onIncrease(product._id)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="text-right">
        <p className="font-bold text-xl">
          ₹{product.price * item.quantity}
        </p>

        <button
          onClick={() => onRemove(product._id)}
          className="text-red-500 mt-3 hover:text-red-700"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
