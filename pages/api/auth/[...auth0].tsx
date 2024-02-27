import { handleAuth, handleLogin, handleLogout } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export default handleAuth({
  login: async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handleLogin(req, res, {
        authorizationParams: { audience: process.env.AUTH0_AUDIENCE },
      });
    } catch (error) {
      console.error(error);
    }
  },
  logout: async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handleLogout(req, res, { returnTo: `${req.headers.referer}reset` });
    } catch (error) {
      console.error(error);
    }
  },
});
