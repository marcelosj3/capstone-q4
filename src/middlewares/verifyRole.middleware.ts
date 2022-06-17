import { NextFunction, Request, Response } from 'express';

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
 * This middleware should be used after the validateToken middleware.
 *
 * @param {[CompanyRole]} authorizedRole
 * @returns void
 */
export const verifyRoleMiddleware =
  (authorizedRole: CompanyRole) =>
  async (req: Request, _: Response, next: NextFunction): Promise<void> => {
    const { id } = req.decoded;

    const user = await UserRepository.findOne({ userId: id });
    const userRole = user?.companyRole;

    verifyRolePermission(userRole!, authorizedRole);

    return next();
  };
