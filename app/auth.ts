import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
}

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },

  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentialsData) {
        if (!credentialsData?.email || !credentialsData?.password) {
          return null;
        }

        try {
          const res = await fetch(
            `${process.env.API}/api/v1/auth/signin`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentialsData.email,
                password: credentialsData.password,
              }),
            }
          );

          const payload = await res.json();

          if (!res.ok || payload.message !== "success") {
            return null;
          }

          const decoded: DecodedToken = jwtDecode(payload.token);

          return {
            id: decoded.id,
            name: payload.user.name,
            email: payload.user.email,
            role: payload.user.role,
            token: payload.token,
          } as AuthUser;
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },

    async jwt({ token, user }) {
      if (user) {
        token.user = {
          name: user.name,
          email: user.email,
          role: (user as AuthUser).role,
        };
        token.accessToken = (user as AuthUser).token;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user as {
        name: string;
        email: string;
        role: string;
      };

      (session as any).accessToken = token.accessToken;
      return session;
    },
  },
};
