import dbConnect from "../../../../util/dbConnect"
import mongoose from 'mongoose'

const Patient=require('../../../../models/Patient')
export default async function handler(req, res) {
    const { id } = req.query
    await dbConnect();

    if(!mongoose.connections[0].readyState){
        return res.status(400).json({status:"errorbd"});

   }else{
     // check if user exists in db 
     const patients= await Patient.find().sort({_id: -1}) // order by date ' plus récent '
     

    if (!patients) {
      return res.status(400).json({status:"none"});
      ;
    }
    
   
  return res.status(201).json({patients:patients.slice(6*(id-1),6*id)});
   }
    
  }