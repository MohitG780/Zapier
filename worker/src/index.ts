
import { Kafka } from "kafkajs";
const TOPIC_NAME="quickstart-events"

const kafka = new Kafka({
    clientId: 'outbox-processor',
    brokers: ['localhost:9092']
  })
 
 
 async function main(){
   
  const consumer=kafka.consumer({  
      groupId:'main-worker' 

   });
   await consumer.connect();
  await consumer.subscribe({topic:TOPIC_NAME,fromBeginning:true})
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value?.toString(),
      })
      await new Promise(r=>setTimeout(r,1000)); 
    },
  })
}

main()