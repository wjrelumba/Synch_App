import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest){
    if(req.method === 'GET'){
        cookies().delete('userloggedin');
        return NextResponse.json({status: "User has been logged out"})
    }
}