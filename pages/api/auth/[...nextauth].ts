import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from '@/lib/axios';

async function refreshAccessToken(refresh_token, user) {
  try {
    const response = await axios('/auth/refresh-token', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      data: { refresh_token },
    });

    //store all tokens in one variable
    const refreshedTokens = response.data;

    if (!response) {
      throw response.data;
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('access-token', refreshedTokens.access_token);
    }

    return {
      accessToken: refreshedTokens.access_token,
      refreshToken: refreshedTokens.refresh_token ?? refresh_token, // Fall back to old refresh token
      accessTokenExpires: Date.now() + 15 * 60 * 1000,
      user,
    };
  } catch (error) {
    return {
      error: 'RefreshAccessTokenError',
    };
  }
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: 'cafila',
      name: 'cafila',
      credentials: {
        login_id: { label: 'login_id', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials: any) {
        try {
          const payload = {
            email: credentials.login_id,
            password: credentials.password,
          };

          const response = await axios.post(
            '/auth/login',
            JSON.stringify(payload)
          );

          const { data } = response;

          if (!data) throw new Error('Données erronées');

          const { access_token, refresh_token, shipper, carrier } = data;

          const token: any = {};

          // add tokens to user object
          token.accessToken = access_token;
          token.refreshToken = refresh_token;
          (token.accessTokenExpires = Date.now() + 15 * 60 * 1000),
            (token.user = { shipper, carrier });

          if (token) {
            return token;
          } else {
            throw new Error("L'utilisateur n'existe pas");
          }
        } catch (error) {
          throw new Error(error.response.data);
        }
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user, account }: any) {
      if (account && user) {
        return {
          ...token,
          ...user,
        };
      }
      // Convert Date.now from milliseconds to seconds
      if (new Date().getTime() < token.accessTokenExpires) {
        return token;
      }
      return refreshAccessToken(token.refreshToken, token.user);
    },

    async session({ session, token }): Promise<any> {
      return {
        ...session,
        error: token.error,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        accessTokenExpires: token.accessTokenExpires,
        user: token.user,
      };
    },
  },

  // Enable debug messages in the console if you are having problems
  //debug: process.env.NODE_ENV === 'development',
});
