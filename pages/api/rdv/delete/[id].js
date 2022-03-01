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
    await Rdv.deleteOne({ _id: id }) // order by date ' plus récent '
     

   
   
  return res.status(201).json({staus:'deleted'});
   }
    
  }