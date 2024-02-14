import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    if(req.method === 'GET'){
        const userCookie: any = cookies().get('userloggedin')
        if(userCookie !== undefined){
            return NextResponse.json({cookieExist: true})
        }
        else{
            return NextResponse.json({cookieExist: false})
        }
    }
}