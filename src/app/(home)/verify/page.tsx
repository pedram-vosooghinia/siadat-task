"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { verifyServices } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { VerifyFormInputs } from "@/types/verify";
import { verifySchema } from "@/validation/verifyShema";
import { AxiosError } from "axios";
export default function Verify() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VerifyFormInputs>({
    resolver: zodResolver(verifySchema),
  });

  const signInHandler = async (values: VerifyFormInputs) => {
    try {
      const res = await verifyServices(values);
      router.push("/");
      if (res.status == 200) {
        toast.success(res.data.message);
        router.push("/login");
      }
    } catch (error) {
      const err = error as AxiosError;
      const message =
        (err.response?.data as { message?: string })?.message ||
        "error, please try again";
      toast.error(message);
    } finally {
      reset();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-white/10 backdrop-blur-[40px]">
      <div className="p-[8px] rounded-[16px]  pt-[56px] pb-[148px]">
        <div className=" font-bold text-[24px] leading-[36px] text-customBlack">
          Connect with Moms
        </div>
        <div className=" font-normal text-[16px] leading-[24px] text-customGray">
          Share and learn with others
        </div>
      </div>
      <form
        className="flex flex-col w-[240px]  px-[8px] mt-[32px] "
        onSubmit={handleSubmit(signInHandler)}
      >
        <h1 className="pb-[16px] font-bold text-[14px] ">Sign up</h1>
        <label
          htmlFor="verifyCode"
          className="pb-[4px] text-customGray3 font-bold  text-[14px]"
        >
          Enter Code
        </label>
        <input
          {...register("verifyCode", { required: "Phone Number is requried" })}
          type="text"
          id="verifyCode"
          autoComplete="number"
          className="bg-customGray2 w-[240] h-[40] rounded-[12px] py-[11px] pl-[8px] font-normal text-[12px]"
        />
        {errors.verifyCode && (
          <div className="text-red-500">{errors.verifyCode.message}</div>
        )}
        <div className="flex justify-between items-center text-customGray4 font-[12px]  ">
          <div>01:25</div>
          <div>Send a code again</div>
        </div>
        <div className="flex justify-center items-center bg-customPurple rounded-[12px] mt-[60px]">
          <button
            type="submit"
            className="w-[240px] h-[40px] text-white rounded-[12px]"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
