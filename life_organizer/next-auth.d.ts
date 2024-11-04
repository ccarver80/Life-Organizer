import { DefaultSession, DefaultUser } from "next-auth";
import {JWT, DefaultJWT} from 'next-auth/jwt'
import { decl } from "postcss";


declare module 'next-auth'{

    interface Session {
        rec_id: number,
        username: string,
        
    }

    interface User {
        rec_id: number,
        username: string,
        
    }
}


declare module 'next-auth/jwt'{
    interface JWT extends DefaultJWT {
        rec_id: number,
        username: string,
        
    }
}