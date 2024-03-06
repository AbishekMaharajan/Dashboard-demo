import { useState } from "react";
import { auth } from "../../firebase";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { t } = useTranslation();
  const { setCurrentUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsLoading(false);

        const user = userCredential.user;
        setCurrentUser(user);
        toast.success("Logged In Successful");
        // ...
      })
      .catch((error) => {
        setIsLoading(false);

        if (error.code === "auth/invalid-email") {
          toast.error("Please check the Email");
        } else if (
          error.code === "auth/wrong-password" ||
          error.code === "auth/missing-password"
        ) {
          toast.error("Please check the Password");
        } else if (error.code === "auth/user-not-found") {
          toast.error("Please check the Email");
        } else {
          toast.error(error?.message);
        }
      });
  };
  return (
    <motion.form
      className="flex flex-col gap-10 px-16 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-center">{t("auth.login")}</h1>
      <div className="flex flex-col gap-5">
        <input
          type="text"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="username"
          placeholder={t("auth.email")}
          className="bg-[#262626] py-3 px-5 text-white font-medium text-2xl leading-10 focus:outline-none tracking-wide"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          placeholder={t("auth.password")}
          className="bg-[#262626] py-3 px-5 text-white font-medium text-2xl leading-10 focus:outline-none tracking-wide"
        />
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-[#4d62bc] hover:bg-blue-700/75 px-5 py-2 rounded-full text-white w-32 text-center flex items-center justify-center gap-2"
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ThreeDots
              height="24"
              width="30"
              radius="9"
              color="#fff"
              ariaLabel="three-dots-loading"
              visible={true}
            />
          ) : (
            t("auth.signIn")
          )}
        </button>
      </div>
    </motion.form>
  );
};

export default Login;
