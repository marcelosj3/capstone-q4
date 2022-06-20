import { NextFunction, Request, Response } from 'express';

import { validateToken } from '../../utils/auth/validateToken.util';

export const verifyForKeyInBodyAndValidateToken =
  (keys: string[]) =>
  async (req: Request, _: Response, next: NextFunction): Promise<void> => {
    const bodyKeys = Object.keys(req.body);

    const hasKey = keys.some((key) => bodyKeys.includes(key));

    if (hasKey) {
      validateToken(req);
    }

    return next();
  };
