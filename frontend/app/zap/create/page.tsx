"use client"
import { Input } from "@/components/Input";

import { BACKEND_URL } from "@/app/config";
import { PrimaryButton } from "@/components/Buttons/PrimaryButton"
import { SecondaryButton } from "@/components/Buttons/SecondaryButton";
import { ZapCell } from "@/components/ZapCell"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
function useAvailableActionsAndTriggers(){
    const [availableActions,setAvailableActions]=useState([]);
        const [availableTriggers,setAvailableTriggers]=useState([]);
        useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/trigger/available`).then(x=>setAvailableActions(x.data.availableTriggers))
        axios.get(`${BACKEND_URL}/api/v1/action/available`).then(x=>setAvailableTriggers(x.data.availableActions))
        },[])
        return {
            availableActions,
            availableTriggers
        }

}
export default function CreateZap() {
  const router=useRouter();
    const {availableActions,availableTriggers}=useAvailableActionsAndTriggers();

  const [selectedTrigger, setSelectedTrigger] = useState<{ name:string; id: string; }>()
  const [selectedActions, setSelectedActions] = useState<{ index:number; availableActionId: string; availableActionName: string;metadata:any; }[]>(
    [],
  )
const [selectedModalIndex,setselectedModalIndex]=useState<null|number>(null);
  return (
    
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col items-center py-12 px-4">
      <div className="w-full flex justify-end ">
  <SecondaryButton
    onClick={async () => {
   
      if (!selectedTrigger?.id) {
        return;
      }
      try {
        await axios.post(`${BACKEND_URL}/api/v1/zap`, {
          availableTriggerId: selectedTrigger.id,
          triggerMetadata: {},
          actions: selectedActions.map(a=>({
            availableActionId:a.availableActionId,
            actionMetadata:a.metadata
          })) 
        },{
          headers:{
            Authorization:localStorage.getItem("token")
          }
        });
        // Optional: success handling here
      } catch (err) {
        console.error("Failed to publish zap:", err);
        // Optional: show error to user
      }
      router.push("/dashboard");
    }}
  >
    Publish
  </SecondaryButton>
</div>

      <div className="max-w-2xl w-full">
        <h1 className="text-2xl font-bold text-slate-800 mb-8 text-center">Create Automation</h1>

        <div className="relative flex flex-col items-center">
          {/* Trigger Cell */}
          <div className="mb-8 z-10">
            <ZapCell onClick={()=>{
            setselectedModalIndex(1);
          }} name={selectedTrigger?.name || "Select a Trigger"} index={1} />
          </div>

          {/* Action Cells */}
          <div className="w-full space-y-8 mb-8" >
            {selectedActions.map((action, index) => (
              <div key={index} className="flex justify-center z-10">
                <ZapCell onClick={()=>{
            setselectedModalIndex(action.index);
          }} name={action?.availableActionName || "Select an Action"} index={action.index} />
              </div>
            ))}
          </div>

          {/* Add Action Button */}
          <div className="z-10">
            <PrimaryButton
              onClick={() => {
                setSelectedActions((a) => [
                  ...a,
                  {
                    index:a.length+2,
                    availableActionId: "",
                    availableActionName: "",
                    metadata:{}

                  },
                ])
              }}
            >
              <div className="text-2xl">+</div>
            </PrimaryButton>
          </div>
        </div>

       
      </div>

      {selectedModalIndex && <Modal availableItems={selectedModalIndex===1?availableTriggers:availableActions} onSelect={(props:null| {name:string,id:string;metadata:any;})=>{
        if(props===null){
    setselectedModalIndex(null);
    return;
        }
        if(selectedModalIndex===1){
            setSelectedTrigger({
                 name:props.name,id:props.id
            })
        }else{
       setSelectedActions(a=>{
        const newActions=[...a];
        newActions[selectedModalIndex-2]={
              index:selectedModalIndex,
              availableActionId:props.id,
              availableActionName:props.name,
              metadata:props.metadata

        }
        return newActions;
       }
        
       )
        }
    setselectedModalIndex(null);
      }} index={selectedModalIndex}/>}
    </div>
  )}
  function Modal({
        index,
        onSelect,
       availableItems
}: {
      index: number;
           onSelect: (props: null | { name: string; id: string; metadata: any }) => void;
           availableItems:{id:string,name:string,image:string;}[]
}) {
  const [step,setStep]=useState(0);
  const[selectedAction,setSelectedAction]=useState<{
    id:string;
    name:string;
  }>()
   const isTrigger=index===1;

    return <div>





<div  className=" fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full  bg-slate-100/55 flex">
    <div className="relative p-4 w-full max-w-2xl max-h-full">
  
        <div className="relative bg-white rounded-lg shadow-sm">
          
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
               <div className="text-black text-xl">
                Select {index===1 ? "Trigger":"Action"}
               </div>
                <button onClick={()=>{
                    onSelect(null);
                }} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:text-white" data-modal-hide="default-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <div className="p-4 md:p-5 space-y-4 text-black">
           
            {(step===1&&selectedAction?.id==="email")&&<EmailSelector setMetadata={(metadata)=>{
              onSelect({
              ...selectedAction,metadata
              })
            }}/>}

{(step===1&&selectedAction?.id==="send-sol")&& <SolanaSelector setMetadata={(metadata)=>{
onSelect({
              ...selectedAction,metadata
              })
}}/>

}

{step===0&&<div>{availableItems.map(({ id, name, image }) => (
    <div
      key={id}
      onClick={() => {
        if(isTrigger){
          onSelect({ id, name });
        }else{
          setStep(s=>s+1);
          setSelectedAction({
            id,name,
          })
        }
      
      }}
      className="flex items-center border p-4 cursor-pointer hover:bg-slate-100 rounded-lg"
    >
      <img src={image} width={30} height={30} className="rounded-full" alt={name} />
      <div className="ml-3 text-sm font-medium">{name}</div>
    </div>
  ))}</div>}

</div>


           
        </div>
    </div>
</div>

    </div>

}

function EmailSelector({setMetadata}:{
  setMetadata:(params: any)=>void;
}){
  const [email,setEmail]=useState("");
  const [body,setBody]=useState("");
  return <div> 
    <Input label={"To"} type={"text"} placeholder="To" onChange={(e)=>setEmail(e.target.value)}/>
     <Input label={"Body"} type={"text"} placeholder="Body" onChange={(e)=>setBody(e.target.value) }/>
     <SecondaryButton onClick={() => {
  setMetadata({
    email,
    body,
  });
}}>Submit</SecondaryButton>

  </div>
}

function SolanaSelector({setMetadata}:{
  setMetadata:(params: any)=>void;
}){
const [address,setAddress]=useState("");
  const [amount,setAmount]=useState("");
  return <div> 
    <Input label={"To"} type={"text"} placeholder="Recipient Address" onChange={(e)=>setAddress(e.target.value)}/>
     <Input label={"Amount"} type={"text"} placeholder="Amount" onChange={(e)=>setAmount(e.target.value) }/>
   <SecondaryButton onClick={() => {
  setMetadata({
    amount,
    address,
  });
}}>
  Submit
</SecondaryButton>

  </div>
}