import { DefaultUser } from "@auth/core/types";
import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        User: {
            id:string;
            role:string;
        } & DefaultSession["user"];
    }

    interface User extends DefaultUser{
        role: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT{
        id: string | number;
        role: string;
    }
}
