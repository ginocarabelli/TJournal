import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { IToken, IUser } from "./definitions";

export const authOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          username: { label: "Username", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
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
      async jwt({ token, user }: { token: IToken; user?: IUser }) {
        if (user) {
          return { ...token, ...user };
        }
        return token;
      },
      async session({ session, token }) {
        session.user = token;
        return session;
      },
    },
    pages: {
      signIn: "/login",
    },
};

export async function setErrorMessage(message: string) {
  const session = await getServerSession(authOptions);
  session.user.errorMessage = message;
}