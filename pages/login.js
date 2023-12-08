import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function Component() {
  const { data: session } = useSession()
  const router = useRouter()
    useEffect(() => {
      if (session && session?.user?.name !== process.env.NEXT_PUBLIC_ADMIN_URL) {
        // Set a timeout to call signOut after 10 seconds
        const timeoutId = setTimeout(() => {
          signOut();
        }, 10000);
  
        // Clear the timeout if the component is unmounted or session changes
        return () => clearTimeout(timeoutId);
      }
  
      // If the condition is not met, do nothing in the effect
    }, [session?.user?.name, signOut]);
  return (
    <div className="loginPage">
      <div className="loginImg">
        <img src="/images/logo.png" alt="" />
      </div>
      {!session &&

        <div className="loginContainer">
          <div className="title">
            <h1>Sign in with Github</h1>
          </div>
          <div className="sButton">
            <button onClick={() => signIn()}>Sign In</button>
          </div>
        </div>
      }
      {session && session?.user?.name !== process.env.NEXT_PUBLIC_ADMIN_URL &&
        <div className="loginContainer">
          <div className="title">
            <h1>Sorry! only Admins can sign in.🙂</h1>
          </div>
          <div className="sButton">
            <button onClick={() => signOut()}>Singed out in 10 seconds</button>
          </div>
        </div>
      }
      {session?.user?.name === process.env.NEXT_PUBLIC_ADMIN_URL &&
        <div className="loginContainer">
          <div className="title">
            <h1>Glad to see you BOSS!🤗</h1>
          </div>
          <div className="sSButton">
            <button onClick={() => router.push('/admin/newpost')}>Go to the Dashboard</button>
          </div>
          <div className="sButton" style={{ marginTop: '1rem' }}>
            <button onClick={() => signOut()}>Sign Out</button>
          </div>
        </div>
      }
    </div>
  )
}
