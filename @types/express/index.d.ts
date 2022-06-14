import { Address, User } from "../../src/entities";
import { TProduct } from "../../src/types";

declare global {
    namespace Express{
        interface Request {
            validated: Address | TProduct | User
        }
    }
}