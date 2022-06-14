import { Address, User } from "../../src/entities";
import { TProduct } from "../../src/types";

declare global {
    namespace Express{
        interface Request {
            decoded: Pick<User, 'userId'> & JwtPayload
            validated: Address | TProduct | User
        }
    }
}