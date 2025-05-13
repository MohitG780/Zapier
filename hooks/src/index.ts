import express from "express";

const app =express();
app.use(express.json());
import { PrismaClient,Prisma } from "@prisma/client";
const client=new PrismaClient();
 app.post("/hooks/catch/:userId/:zapId",async(req,res)=>{
const userId=req.params.userId;
const zapId=req.params.zapId;
const body=req.body;
console.log("Received webhook:", { userId, zapId, body });
await client.$transaction(async tx=>{
    const run=await tx.zapRun.create({
        
            data:{
                zapId:zapId,
                metadata:body
            }

    });
    await  tx.zapRunOutbox.create({
        data:
        {
            zapRunId:run.id
        }
    })
})
res.json({
    message:"Webhook recieved"
})

 })
 app.listen(3000);
  