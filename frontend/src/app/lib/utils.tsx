import CredentialsProvider from "next-auth/providers/credentials";

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
          console.log(data)
          if (data.status === 401) {
            throw new Error("Las credenciales son inválidas o incorrectas");
          }
          return {
            id: data.id,
            name: data.user.nombre,
            email: data.user.email,
            token: data.token,
          };
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user }) {
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