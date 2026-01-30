import React, { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { GetUserToken } from "@/app/Helpers/GetUserToken";
import { AddressInterface } from "@/interfaces";
type AddressProps = {
  setallAddresses: React.Dispatch<React.SetStateAction<AddressInterface[]>>;
};

export default function Address({ setallAddresses }: AddressProps) {

  
let addressnameinput=useRef<HTMLInputElement | null>(null)
let addressdetailsinput=useRef<HTMLInputElement | null>(null)
let phoneinput=useRef<HTMLInputElement|null>(null)
let citysinput=useRef<HTMLInputElement| null>(null)

async function addNewAddress (){ 




const updateaddress = {
  name: addressnameinput.current?.value,
  details: addressdetailsinput.current?.value,
  phone: phoneinput.current?.value,
  city: citysinput.current?.value,
};


const token = await GetUserToken()

 try {
   const response = await fetch('https://ecommerce.routemisr.com/api/v1/addresses', {
    headers:{token:token!, "content-type":"application/json"}, 


            method:'POST',
           body: JSON.stringify(updateaddress)
    
  });

  const data = await response.json();

  console.log("POST response data of Your New Address:", data);
  
  
 } catch (erro){
  console.log('Have a massing!');
  
 }


}







  return (
    <>
      <div
        className="flex justify-center self-start pt-6 w-full"
        style={{
          all: "revert",
          display: "flex",
          justifyContent: "center",
          alignSelf: "flex-start",
          paddingTop: "1.5rem",
          width: "100%",
          fontSize: "14px",
          lineHeight: "1.5",
          letterSpacing: "normal",
        }}
      >
     <Sheet>
         <SheetTrigger asChild>
           <Button variant="outline" className="w-full">Add New Address</Button>
         </SheetTrigger>
     
     
        <SheetContent>
           <SheetHeader>
             <SheetTitle>New Address</SheetTitle>
             <SheetDescription className='text-muted-foreground'>
     Fill in your new address information.
             </SheetDescription>
           </SheetHeader>
     
           <div className="grid gap-6 px-4">
     
             <div className="grid gap-3">
               Address Name:
               <input ref={addressnameinput}  id="city"  className="border rounded-md p-2" />

             </div>
     
             <div className="grid gap-3">
               Address Details:
               <input ref={addressdetailsinput}  id="details"    className="border rounded-md p-2" />
             </div>
     
               <div className="grid gap-3">
               Phone Number:
               <input ref={phoneinput}  id="phone"  className="border rounded-md p-2" />
             </div>
     
              <div className="grid gap-3">
               City:
               <input ref={citysinput}  id="City"  className="border rounded-md p-2" />
             </div>

           </div>
     
           <SheetFooter>
             <Button onClick={()=>addNewAddress()}  type="submit" >Add</Button>
          
             <SheetClose asChild>
               <Button variant="outline">Close</Button>
             </SheetClose>
           </SheetFooter>
         </SheetContent>
     
       </Sheet>
      </div>
    </>
  );
}
