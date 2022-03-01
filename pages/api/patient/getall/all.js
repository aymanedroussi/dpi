import dbConnect from "../../../../util/dbConnect"
import mongoose from 'mongoose'

const Patient=require('../../../../models/Patient')
export default async function handler(req, res) {

    await dbConnect();

    if(!mongoose.connections[0].readyState){
        return res.status(400).json({status:"errorbd"});

   }else{
     // check if user exists in db 
     const patients= await Patient.find() // order by date ' plus récent '
     

   
  return res.status(201).json({patients: patients.length%6==0 ? patients.length/6 : Math.floor(patients.length/6)+1});
   }
    
  }