import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
    }),
  ],
  cookies: {
    secure: process.env.NODE_ENV === 'production',
  },
  session: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: '1234567890987654321', // Specify your own secret key

}


export default NextAuth(authOptions);
