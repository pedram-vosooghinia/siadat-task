"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { loginServices } from "@/services/auth";
import { LoginFormInputs } from "@/types/login";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { loginSchema } from "@/validation/loginSchema";
import { AxiosError } from "axios";
export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const loginInHandler = async (values: LoginFormInputs) => {
    const withoutPlus = values.mobile.replace("+", "");

    const country_code = withoutPlus.slice(0, 2);
    const local_phone = withoutPlus.slice(2);
    const data = {
      country_code,
      local_phone,
      language: "Persian",
    };
    try {
      const res = await loginServices(data);
      if (res.status == 200) {
        toast.success(res.data.message);
        router.push("/verify");
      }
    } catch (error) {
      const err = error as AxiosError;
      const message =
        (err.response?.data as { message?: string })?.message ||
        "An error has occurred";
      toast.error(message);
    } finally {
      reset();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-white/10 backdrop-blur-[40px]">
      <div className="p-[8px] rounded-[16px]  pt-[56px] pb-[148px]">
        <div className=" font-bold text-[24px] leading-[36px] text-customBlack">
          AI Support, Anytime
        </div>
        <div className=" font-normal text-[16px] leading-[24px] text-customGray">
          Quick answers to your questions
        </div>
      </div>
      <form
        className="flex flex-col w-[240px]  px-[8px] mt-[32px] "
        onSubmit={handleSubmit(loginInHandler)}
      >
        <h1 className="pb-[16px] font-bold text-[14px] ">Sign up</h1>
        <label
          htmlFor="mobile"
          className=" pb-[4px] text-customGray3 font-bold  text-[14px]"
        >
          Enter Phone Number
        </label>
        <input
          {...register("mobile", { required: "Phone Number is requried" })}
          type="text"
          id="mobile"
          autoComplete="tel"
          placeholder="+989167652024"
          className="bg-customGray2 w-[240] h-[40] rounded-[12px] py-[11px] pl-[8px] font-normal text-[12px]"
        />
        {errors.mobile && (
          <div className="text-red-500">{errors.mobile.message}</div>
        )}

        <div className="flex justify-center items-center bg-customPurple rounded-[12px] mt-[60px]">
          <button
            type="submit"
            className=" w-[240px] h-[40px] text-white rounded-[12px]"
          >
            Get code
          </button>
        </div>
      </form>
    </div>
  );
}
