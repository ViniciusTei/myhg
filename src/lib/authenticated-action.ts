import { redirect } from "next/navigation";
import { cookies } from "next/headers"

export default function AuthenticatedAction() {
  const ck = cookies()
  if (ck.has('user.email') && ck.has('user.id')) {
    return
  }

  redirect('/login')
}
