import dbConnect from "../../../../../util/dbConnect"
import mongoose from 'mongoose'

const Patient=require('../../../../../models/Patient')
export default async function handler(req, res) {
    const { label } = req.query
    await dbConnect();

    if(!mongoose.connections[0].readyState){
        return res.status(400).json({status:"errorbd"});

   }else{
     // check if user exists in db 
     let patients= await Patient.find({IPP: { "$regex": label, "$options": "i" } }) // order by date ' plus récent '
    
   
    
   
  return res.status(201).json({patients: patients});
   }
    
  }