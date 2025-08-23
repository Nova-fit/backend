import { Hono } from "hono";

const profile = new Hono();

profile.get("/",()=>{
    console.log("profile") 
})

export default profile;