import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log("mo", data);
    if (!data.verifyCode)
      return NextResponse.json(
        {
          success: false,
          message: "please send verifyCode ",
        },
        {
          status: 400,
        }
      );
    const serverResponse = {
      access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
      refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
      token_type: "bearer",
    };

    cookies().set({
      name: "access_token",
      value: serverResponse.access_token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
    });

    cookies().set({
      name: "refresh_token",
      value: serverResponse.refresh_token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
    });

    return NextResponse.json(
      {
        success: true,
        message: "verify code accepted",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Network error, please try again",
      },
      { status: 500 }
    );
  }
}
