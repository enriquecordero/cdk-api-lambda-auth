
export const handler = async function(event:any){
  console.log("request",JSON.stringify(event,undefined,2));
  return{
    statusCode:200,

    body: `Hello from Here`
  };
};
