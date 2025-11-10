import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { jwtDecode } from "jwt-decode";

const handler = NextAuth({
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
  ],

  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        if (account.access_token) {
          const decodedToken = jwtDecode(account.access_token);

          console.log("📝 Decoded token claims:", {
            sub: decodedToken.sub,
            email: decodedToken.email,
            name: decodedToken.name,
            employee_id: decodedToken.employee_id,
            realm_access: decodedToken.realm_access,
          });

          const realmRoles = decodedToken.realm_access?.roles || [];

          const customRoles = realmRoles.filter(
            (role) => role === "employee" || role === "finance" || role === "manager"
          );

          token.accessToken = account.access_token;
          token.refreshToken = account.refresh_token;
          token.idToken = account.id_token;
          token.roles = customRoles;
          token.employee_id = decodedToken.employee_id;
          token.email = decodedToken.email;
          token.name = decodedToken.name;
        }
      } else {
        console.log("Token has idToken:", !!token.idToken);
      }

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;
      session.user.roles = token.roles || [];
      session.user.employee_id = token.employee_id;
      session.user.email = token.email;
      session.user.name = token.name;

      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  events: {
    async signOut({ token }) {
      if (token?.idToken) {
        try {
          const issuerUrl = process.env.KEYCLOAK_ISSUER;

          const logOutUrl = new URL(
            `${issuerUrl}/protocol/openid-connect/logout`
          );
          logOutUrl.searchParams.append("id_token_hint", token.idToken);

          const finalUrl = logOutUrl.toString();

          const response = await fetch(finalUrl, {
            method: "GET",
          });

          if (response.ok) {
            console.log("Keycloak SSO session terminated from backend");
          } else {
            const text = await response.text();
          }
        } catch (error) {
          console.error("Error details:", {
            message: error.message,
            stack: error.stack,
          });
        }
      } else {
        console.warn("No idToken in token object for backend logout");
      }
    },
  },

  debug: true,
});

export { handler as GET, handler as POST };
