import { NextRequest, NextResponse } from "next/server";
import mysql2 from 'mysql2/promise'
import DBConnect from "../dbConnect/dbConnect";

export async function POST(req: NextRequest){
    if(req.method === 'POST'){
        try {
            const dataArray: any = []
            const dataReceived = await req.json()
            console.log("Received data: ",dataReceived)
            const conn = mysql2.createConnection(DBConnect())
            const taskQuantityQuery = `SELECT task_id, task_status FROM task_detail WHERE task_id = '${dataReceived.task_id}'`
            const [taskQuantityResult] = <any> await (await conn).query(taskQuantityQuery)
            console.log("Tasks quantity: ",taskQuantityResult)
            for(var i=0;i<taskQuantityResult.length;i++){
                if(taskQuantityResult[i].task_status == 1){
                    dataArray.push(taskQuantityResult[i].task_status)
                }
            }
            console.log("Done tasks quantity: ", dataArray)
            const dataReturn = {
                taskQuantity: taskQuantityResult.length,
                doneTasks: dataArray.length
            }
            ;(await conn).end()
            return NextResponse.json(dataReturn)
        } catch (error) {
            
        }
    }
}