import { NextFunction, Request, Response } from 'express';

import { AppError } from '../errors';
import { UserRepository } from '../repositories';
import { CompanyRole } from '../types';
import { verifyRolePermission } from '../utils';

/**
 * It verifies the permission each user has and compares with the authorizedRole
 * parameter.
 *
 * Permission levels should be the same as companyRole enum, that being:
 * ADMIN > MANAGER > EMPLOYEE > CLIENT.
 *
 * This middleware will only verify the role if an id is found into
 * the decoded key inside the request object, if no decoded key is found
 * the middleware will just go to the next function.
 *
 * @param {[CompanyRole]} authorizedRole A minimum role accordingly to the
 * permission levels above to be accepted for the required route.
 *
 * @param {[boolean]} requireValidateToken Default value to true, can be set to
 * false so the route does not require a decoded key in the request parameter, useful
 * for routes that do not require a valid token for all its functions.
 */
export const verifyRoleMiddleware =
  (authorizedRole: CompanyRole, requireValidateToken: boolean = true) =>
  async (req: Request, _: Response, next: NextFunction): Promise<void> => {
    const { decoded } = req;

    if (requireValidateToken && !decoded) {
      throw new AppError(
        { error: 'A valid token is required to proceed' },
        400
      );
    }

    if (requireValidateToken) {
      const { id } = decoded;

      const user = await UserRepository.findOne({ userId: id });
      const userRole = user?.companyRole;

      verifyRolePermission(userRole!, authorizedRole);
    }

    return next();
  };
