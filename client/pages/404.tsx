import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Page404() {

  const router = useRouter()

  // Always redirect the user to the homepage
  useEffect(() => {
    router.push('/')
  }, [])

  return <p>Redirecting...</p>
}