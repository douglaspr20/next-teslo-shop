import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { jwt } from "../../utils";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  // const { token = "" } = req.cookies;
  // try {
  //   await jwt.isValidToken(token);
  //   return NextResponse.next();
  // } catch (error) {
  //   return NextResponse.redirect(`auth/logun?p=${req.page.name}`);
  // }

  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    const requestedPage = req.page.name;
    return NextResponse.redirect(`/auth/login?=${requestedPage}`);
  }

  return NextResponse.next();
}
