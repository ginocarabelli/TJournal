import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          username: { label: "Username", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}user/login`, {
            method: "POST",
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          });
          const data = await res.json();
          if (data.status === 401) {
            throw new Error("Las credenciales son inválidas o incorrectas");
          }
          return data;
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user }) {
        return { ...token, ...user };
      },
      async session({ session, token }) {
        session.user = token as any;
        return session;
      },
    },
    pages: {
      signIn: "/login",
    },
};
  
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };