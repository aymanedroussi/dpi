import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import Progress from './Progress';
import Message from './Message';
import 'nprogress/nprogress.css'
import Nprogress from 'nprogress'
const FormAddRdv = () => {
    const reformat=()=>{
        setIPP('');
        setPatientName('');
        settypeRdv('');
        setDay('');
        setTiming('');
        setDoctor('');
        setmotif('')
       
    }
    const [error,setError]=useState(false)
    const [success,setSuccess]=useState(false)
     const [showProgress,setProgress]=useState(false)
   
 
    const [message,setMessage]=useState('');
    const [messageSuccess,setMessageSuccess]=useState("Le rendez-vous a été créé avec succès")
    const addRdvHandler=(e)=>{
e.preventDefault();
addRdvMethod({IPP:IPP,patientName:patientName,typeRdv:typeRdv,day:day,timing:timing,doctor:doctor,motif:motif
            })

    }

    const addRdvMethod=async(data)=>{
        const res = await fetch('/api/rdv/add', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json()
        )
       .then(res => {
           if(res.error){
             setError(true);
             setSuccess(false)
             setMessage(res.error);
             setProgress(false);
             Nprogress.done();
           }else{
               
               if(res.status=="created"){
                 reformat();
                 setSuccess(true)
                 setError(false);
                 setProgress(false);
                 Nprogress.done();
               }
               else{
                 setError(true);
                 setSuccess(false)
                 setMessage("ERROR");
                 setProgress(false);
                 Nprogress.done();
               }
             }
       
    })}
    const [IPP, setIPP] = useState("")
    const [patientName, setPatientName] = useState("")
    const [typeRdv, settypeRdv] = useState("")
    const [day, setDay] = useState("")
    const [timing, setTiming] = useState("")
    const [doctor, setDoctor] = useState("")
    const [motif, setmotif] = useState("")
    



  return <div>
        {showProgress && <Progress></Progress>}
        {error && <Message message={message} color="red"></Message> }
    {success && <Message message={messageSuccess} color="green"></Message> }
 <section className="w-full max-w-2xl px-6 py-4 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">Ajouter un nouveau rendez-vous</h2>
        
  
        <form onSubmit={addRdvHandler}>
        <div className="mt-6 ">
            <div className="items-center -mx-2 md:flex">
                <div className="w-full mx-2">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Identifiant Patient Permanent</label>

                    <input value={IPP} onChange={(e)=>setIPP(e.target.value)} name="service" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" type="text"/>
                </div>

             
                <div className="w-full mx-2 mt-4 md:mt-0">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Le nom du patient</label>

                    <input  value={patientName} onChange={(e)=>setPatientName(e.target.value)} className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>
            </div>
            <br></br>
            <div className="items-center -mx-2 md:flex">
                <div className="w-full mx-2">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Type du rendez vous</label>

                    <input value={typeRdv} onChange={(e)=>settypeRdv(e.target.value)} className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" type="text"/>
                </div>

                <div className="w-full mx-2 mt-4 md:mt-0">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Jour</label>

                    <input  value={day} onChange={(e)=>setDay(e.target.value)} type="date" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>
                <div className="w-full mx-2 mt-4 md:mt-0">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Heure</label>

                    <input value={timing} onChange={(e)=>setTiming(e.target.value)} className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" type="time" />
                </div>
             
            </div>
            <br></br>
            <div className="items-center -mx-2 md:flex">
         
                <div className="w-full mx-2 ">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Nom du médecin
</label>

                    <input value={doctor} onChange={(e)=>setDoctor(e.target.value)} className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" type="text"/>
                </div>
             
            </div>
            <div className="w-full mt-4">
                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Motif </label>

                <textarea  value={motif} onChange={(e)=>setmotif(e.target.value)} className="block w-full h-40 px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"></textarea>
            </div>

            <div className="flex justify-center mt-6">
                <button type="submit" className="marginbuttons px-4 py-2 text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600" >Ajouter</button>
               <Link href="/rdv"><button type="button" className="px-4 py-2 text-white transition-colors duration-200 transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600" >Retour</button></Link>
            </div>
        </div>
        </form>
    </section>
      </div>;
};

export default FormAddRdv;
