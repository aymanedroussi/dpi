import dbConnect from "../../../../util/dbConnect"
import mongoose from 'mongoose'

const Rdv=require('../../../../models/Rdv')
export default async function handler(req, res) {
    const { id } = req.query
    await dbConnect();

    if(!mongoose.connections[0].readyState){
        return res.status(400).json({status:"errorbd"});

   }else{
     // check if user exists in db 
     const rdv= await Rdv.find().sort({_id: -1}) // order by date ' plus récent '
     

    if (!rdv) {
      return res.status(400).json({status:"none"});
      ;
    }
    
   
  return res.status(201).json({rdvs:rdv.slice(10*(id-1),10*id)});
   }
    
  }