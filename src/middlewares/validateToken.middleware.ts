// import { NextFunction, Request, Response } from 'express';
// import { JwtPayload, verify, VerifyErrors } from 'jsonwebtoken';

// import { User } from '../entities';
// import { AppError } from '../errors';

// export const validateTokenMiddleware = async (
//   req: Request,
//   _: Response,
//   next: NextFunction
// ) => {
//   const token: string | undefined = req.headers.authorization?.split(' ')[1];

//   if (!token) {
//     throw new AppError('Missing authorization token', 401);
//   }

//   return verify(
//     token,
//     process.env.SECRET_KEY as string,
//     (error: VerifyErrors, decoded: string | JwtPayload) => {
//       if (error) {
//         throw new AppError(error.message, 401);
//       }

//       req.decoded = decoded as Pick<User, 'userId'> & JwtPayload;

//       return next();
//     }
//   );
// };
