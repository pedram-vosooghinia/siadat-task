import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  try {
    if (req.method !== "GET") {
      return NextResponse.json(
        { message: "Method not allowed" },
        { status: 405 }
      );
    }

    cookies().set({
      name: "access_token",
      value: "",
      httpOnly: true,
      path: "/",
      maxAge: 0,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    cookies().set({
      name: "refresh_token",
      value: "",
      httpOnly: true,
      path: "/",
      maxAge: 0,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return NextResponse.json({
      success: true,
      message: "User logged out successfully",
      status: 200,
    });
  } catch {
    return NextResponse.json({
      success: false,
      message: "Network error, please try again",
      status: 500,
    });
  }
}
