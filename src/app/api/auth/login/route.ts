import { NextResponse, NextRequest } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (!data)
      return NextResponse.json(
        {
          success: false,
          message: "please send phone number",
        },
        {
          status: 400,
        }
      );

    return NextResponse.json(
      {
        success: true,
        message: "verify code sended",
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
