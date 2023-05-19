// import { IncomingMessage, ServerResponse } from 'http';

// export const basicAuth = (req: IncomingMessage, res: ServerResponse) => {
//   const basicAuthUsername = process.env.NEXT_PUBLIC_BASIC_AUTH_USERNAME;
//   const basicAuthPassword = process.env.NEXT_PUBLIC_BASIC_AUTH_PASSWORD;

//   const authHeader = req.headers.authorization;

//   if (basicAuthUsername && basicAuthPassword) {
//     if (!authHeader) {
//       res.setHeader('WWW-Authenticate', 'Basic realm="Authorization required"');
//       res.statusCode = 401;
//       res.end('Unauthorized');
//       return false;
//     }

//     const [username, password] = Buffer.from(authHeader.split(' ')[1], 'base64')
//       .toString()
//       .split(':');

//     if (username !== basicAuthUsername || password !== basicAuthPassword) {
//       res.statusCode = 403;
//       res.end('Forbidden');
//       return false;
//     }
//   }

//   return true;
// };
