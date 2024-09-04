import { redirect } from "next/navigation";
import { cookies } from "next/headers"

export default function getAuthenticatedUserAction() {
  const ck = cookies()
  if (ck.has('user.email') && ck.has('user.id')) {
    return {
      id: ck.get('user.id')!
    }
  }

  redirect('/login')
}
