import Image from "next/image";
import AuthForm from "./components/AuthForm";

const Auth = () => {
  return (
    <div
      className="
        flex 
        min-h-full 
        flex-col 
        justify-center 
        sm:px-6 
        lg:px-8 
        bg-gray-100
      "
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          height="150"
          width="150"
          className="mx-auto w-auto"
          src="/images/logo.png"
          alt="Logo"
        />
        <h2
          className="
            text-center 
            text-2xl
            md:text-3xl 
            font-bold 
            tracking-tight 
            text-gray-900
          "
        >
          Inicia sesión en tu cuenta
        </h2>
      </div>
      <AuthForm />
    </div>
  );
};

export default Auth;
