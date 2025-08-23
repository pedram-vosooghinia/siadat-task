"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { logoutServices } from "@/services/auth";

const HomePage: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutServices(); 
      toast.success("User logged out successfully");

      router.push("/login");
    } catch (error) {
      console.error(error);
      toast.error("Network error, please try again");
    }
  };

  return (
    <div className="flex justify-center items-center bg-customPurple rounded-[12px] mt-[264px] mx-[84px] ">
      <button
        onClick={handleLogout}
        className="w-[152px] h-[40px] text-white rounded-[12px]"
      >
        Logout
      </button>
    </div>
  );
};

export default HomePage;
