import { Router } from "express";
import { authMiddleware } from "../middleware";
import { SigninSchema, SignupSchema } from "../types";
import { prismaClient } from "../db";
import jwt  from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";
const router=Router();
//@ts-ignore
router.post("/signup",async (req,res)=>{
    const body=req.body;
  const parsedData=SignupSchema.safeParse(body);
  if(!parsedData.success){
    console.log(parsedData.error);
 return res.status(411).json({
        message:"Incorrect inputs"
    })
  }
  const userExists = await prismaClient.user.findFirst({
    where:{
    email:parsedData.data.username
    }
  });
  if(userExists){
 return res.status(403).json({
        message:"User already exists"
    })
  }
  await prismaClient.user.create({
    data:{
        email:
        parsedData.data.username,
        //ToDo do not store password in plain text,hash it
        password: parsedData.data.password,
        name:parsedData.data.name
    }
  })
  // await sendEmail();
return res.json({
    message:"Please verify your account by checking your email"
  });
})
//@ts-ignore
router.post("/signin",async (req,res)=>{
    const body=req.body;
  const parsedData=SigninSchema.safeParse(body);
  if(!parsedData.success){
 return res.status(411).json({
        message:"Incorrect inputs"
    })
  }
  const user=await prismaClient.user.findFirst({
    where:{
     email:parsedData.data.username,
     password:parsedData.data.password

    }
  });
  if(!user){
return res.status(403).json({
        message:"Sorry credentials are incorrect"
    })
  }
  //sign the jwt
  const token=jwt.sign({
    id:user.id
  },JWT_PASSWORD);
  return res.json({
    token:token,
  })
})
//@ts-ignore
router.get("/",authMiddleware,async (req,res)=>{
    //TODO:fix the type
    //@ts-ignore
 const id=req.id;
 const user=await prismaClient.user.findFirst({
    where:{
        id
    },
   select:{
    name:true,
    email:true
   }
 });
return res.json({
   user
 });
 
})

export const userRouter=router;