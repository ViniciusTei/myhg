import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export default function AuthenticatedAction(request: NextRequest) {
  if (request.cookies.has('user.email') && request.cookies.has('user.id')) {
    return NextResponse.next()
  }

  redirect('/login')
}
