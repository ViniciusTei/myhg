import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function useCheckLogin() {
  const ck = cookies()

  if (!ck.has('user.email') && !ck.has('user.id')) {
    console.error('User not logged in')
    redirect('/login')
  }
}
