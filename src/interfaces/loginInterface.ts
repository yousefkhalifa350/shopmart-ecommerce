export interface successLoginResponse{

message:string, 
token:string,
user:userResponse

}


export interface FailedLoginResponse{

message:string, 
statusMsg:string,

}



export interface userResponse { 


       name:string,
       email:string,
       role:string 

   



}