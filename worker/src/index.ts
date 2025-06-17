import { PrismaClient } from "@prisma/client";
import { Kafka } from "kafkajs";
const TOPIC_NAME="quickstart-events"
const prismaClient=new PrismaClient();

const kafka = new Kafka({
    clientId: 'outbox-processor-2',
    brokers: ['localhost:9092']
  })
 
 
 async function main(){
   
  const consumer=kafka.consumer({  
      groupId:'main-worker-2' 

   });
   await consumer.connect();
      const producer = kafka.producer();
    await producer.connect();
  await consumer.subscribe({topic:TOPIC_NAME,fromBeginning:true})
  await consumer.run({
    autoCommit:false,
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value?.toString(),
      })
      if(!message.value?.toString()){
        return;
      }
      const parsedValue=JSON.parse(message.value?.toString());
      const zapRunId=parsedValue.zapRunId;
      const stage=parsedValue.stage;

      const zapRunDetails=await prismaClient.zapRun.findFirst({
        where:{
          id:zapRunId
        },include:{
          zap:{
            include:{
              actions:{
                include:{
                  type:true
                }
                
              }
            }
          },
        }

      });

      //send a query  to get back zap id
      //send a query to getback the actions associated with this zap id
      //find the available actions

       const currentAction=zapRunDetails?.zap.actions.find(x=>x.sortingOrder===stage)

       if(!currentAction){
      console.log("Current action not found?");
      return;
       }

       if(currentAction.type.id==="email"){
       console.log("Sending out an email");
       }

       if(currentAction.type.id==="send-sol"){
        console.log("Sending out solana");
       }

      await new Promise(r=>setTimeout(r,5000)); 
      const zapId= message.value?.toString();
      const lastStage=(zapRunDetails?.zap.actions.length||1)-1;
      if(lastStage!==stage){

   await producer.send({
    topic:TOPIC_NAME,
    messages: 
         [{
          value:JSON.stringify({
         stage:stage+1,
         zapRunId 

         })
   }]
      
     })

      }
       console.log("processing done");
      await consumer.commitOffsets([{
        topic:TOPIC_NAME,
        partition:partition,
        offset:(parseInt(message.offset)+1).toString()
      }])
    },

  })
}

main()