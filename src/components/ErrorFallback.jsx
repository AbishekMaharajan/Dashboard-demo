import { Link } from "react-router-dom";

const ErrorFallback = () => (
  <div
    className="w-full h-full flex flex-col gap-10 justify-center items-center"
    role="alert"
  >
    <p className=" text-white text-xl font-bold">何かが間違っていた</p>

    <Link to="/dashboard" replace>
      <button className="bg-black text-white p-10 py-3 hover:bg-black/90 ">
        再挑戦
      </button>
    </Link>
  </div>
);

export default ErrorFallback;
