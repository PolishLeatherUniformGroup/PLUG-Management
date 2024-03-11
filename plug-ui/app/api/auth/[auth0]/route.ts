// app/api/auth/[auth0]/route.js
import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
    login: handleLogin({
      authorizationParams: {
        audience: process.env.AUTH0_AUDIENCE, // or AUTH0_AUDIENCE
        // Add the `offline_access` scope to also get a Refresh Token
        scope: 'openid profile email offline_access' // or AUTH0_SCOPE
      }
    })
  });