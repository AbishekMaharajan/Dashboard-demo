import { ThreeDots } from "react-loader-spinner";

const SuspenseFallback = () => (
  <div className="w-full h-full flex justify-center items-center">
    <ThreeDots height="50" width="50" radius="9" color="#fff" visible={true} />
  </div>
);

export default SuspenseFallback;
