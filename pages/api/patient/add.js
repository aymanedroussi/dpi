import dbConnect from "../../../util/dbConnect"
import mongoose from 'mongoose'

const Patient=require('../../../models/Patient')
export default async function handler(req, res) {
  await dbConnect();

 

 
if(!mongoose.connections[0].readyState){
        return res.status(400).json({status:"errorbd"});

   }else{
     // check if user exists in db 
     const patient = await Patient.findOne({
        IPP: req.body.IPP,
    });

    
    if (patient) {
      await Patient.updateOne({ _id: patient._id }, { $set: req.body});
      return res.status(201).json({status:"modified"});
      ;
    }
    
     
      const newPatient=new Patient({...req.body,bloodType:req.body.bloodType.replace("plus","+").replace("moins","-")});
  await newPatient.save().then(()=>console.log("saved!")).catch((error)=>console.log(`erreur lors du save ${error}`));
      

  return res.status(201).json({status:"created"});
   }
    
   

  // save
  
   
   
  }
  