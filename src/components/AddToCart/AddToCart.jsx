import { useDispatch } from "react-redux";
import { addToCart } from "../../Slices/CartSlice";
import axios from "axios";
import { toast } from "react-toastify";

const AddToCart = ({ prodId, price, name, image, stock }) => {

  const dispatch = useDispatch();

  const handleAdd = async () => {
    const _id = localStorage.getItem("userId");
    console.log(_id)
    const data = { prodId, _id, price, name, image };

    const res = await axios.post("http://localhost:5000/cart/add", data);

    if (res) {
      console.log(res)
      dispatch(addToCart({_id, prodId, price, name, image, stock }));
      toast.success (res?.data?.message)
    }
  };

  return (
    <button
      onClick={handleAdd}
      className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold px-4 py-2 rounded-lg 
      shadow-md hover:shadow-lg hover:scale-105 transition duration-300" disabled={stock<1}
    >
      {/* Cart Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007 17h12m-5 
          4a1 1 0 100-2 1 1 0 000 2zm-6 0a1 1 0 100-2 1 1 0 000 2z"
        />
      </svg>

      Add to Cart
    </button>
  );
};

export default AddToCart;