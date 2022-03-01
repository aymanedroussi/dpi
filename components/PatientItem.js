import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
const PatientItem = ({patientData,patientHandlerItem}) => {
  const router =useRouter();
    const supprimerPatient=async (ipp)=>{
       await deletePatient(ipp);
       patientHandlerItem();
       
       router.replace('/dashboard')
    }
   const deletePatient=async (ipp)=>{
        await fetch(`/api/patient/delete/${ipp}`, {
        method: 'GET',
  
        headers: { 'Content-Type': 'application/json' ,
        
          'Access-Control-Allow-Origin': '*',
         mode:'no-cors'}
    }).then(res => res.json())}

    
  return (

<div className="flex max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
    <div className="w-1/3 bg-cover" ><img src="https://freepikpsd.com/file/2019/10/logo-contact-person-png-Transparent-Images.png"></img></div>

    <div className="w-2/3 p-4 md:p-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{patientData.firstName} {patientData.lastName}</h1>

        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400"><span className='text-1xl font-bold text-gray-800 dark:text-white'>IPP: </span>{patientData.IPP}</p>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400"><span className='text-1xl font-bold text-gray-800 dark:text-white'>Numéro de séjour: </span>{patientData.SojournNb}</p>

        <div className="flex mt-2 item-center">
           
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400"><span className='text-1xl font-bold text-gray-800 dark:text-white'>Date de naissance: </span>{patientData.birthDate!=undefined && patientData.birthDate.substring(0,10)}</p>

        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400"><span className='text-1xl font-bold text-gray-800 dark:text-white'>État civil:</span> {patientData.maritalStatus}</p>

        <div className="flex mt-2 item-center">
           
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400"><span className='text-1xl font-bold text-gray-800 dark:text-white'>Nationalité:</span> {patientData.nationality}</p>

        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400"><span className='text-1xl font-bold text-gray-800 dark:text-white'>Numéro de téléphone: </span><span>{patientData.phonecode!=undefined && patientData.phonecode.replace("plus","+")} {patientData.phoneNumber}</span></p>

        <div className="flex mt-2 item-center">
           
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400"><span className='text-1xl font-bold text-gray-800 dark:text-white'>Groupe sanguin: </span>{patientData.bloodType}</p>

        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400"><span className='text-1xl font-bold text-gray-800 dark:text-white'>Covid19 vacciné:</span> {patientData.vaccinated==true ?'Oui' :'Non'}</p>

        <div className="flex mt-2 item-center">
           
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400"><span className='text-1xl font-bold text-gray-800 dark:text-white'>Date de vaccination: </span>{patientData.vaccinationDate!=undefined && patientData.vaccinationDate.substring(0,10)}</p>

        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400"><span className='text-1xl font-bold text-gray-800 dark:text-white'>Antécédents médicaux: </span>{patientData.medicalAntecedents!=undefined && patientData.medicalAntecedents.map((medical)=>{
          return (<span key={Math.random()}> - {medical}</span>)
        })}</p>

        <div className="flex mt-2 item-center">
           
           <p className="mt-2 text-sm text-gray-600 dark:text-gray-400"><span className='text-1xl font-bold text-gray-800 dark:text-white'>Antécédents chirurgicaux: </span>{patientData.chirurgicalAntecedents!=undefined && patientData.chirurgicalAntecedents.map((medical)=>{
          return (<span key={Math.random()}> - {medical}</span>)
        })}</p>
   
           </div>
           <p className="mt-2 text-sm text-gray-600 dark:text-gray-400"><span className='text-1xl font-bold text-gray-800 dark:text-white'>Allergie Type: </span>{patientData.allergyType}</p>

           <div className="flex mt-2 item-center">
           
           <p className="mt-2 text-sm text-gray-600 dark:text-gray-400"><span className='text-1xl font-bold text-gray-800 dark:text-white'>A renseigner: </span>{patientData.allergies!=undefined && patientData.allergies.map((medical)=>{
          return (<span key={Math.random()}> - {medical}</span>)
        })}</p>
   
           </div>

        <div className="flex justify-between mt-3 item-center">
            <Link href={`/addPatient?${patientData.IPP!=undefined ?`IPP=${patientData.IPP}`:''}${patientData.SojournNb != undefined ?`&SojournNb=${patientData.SojournNb}`:''}${patientData.firstName != undefined ?`&firstName=${patientData.firstName}`:''}&maritalStatus=${patientData.maritalStatus}${patientData.birthDate!=undefined ? `&birthDate=${patientData.birthDate.substring(0,10)}`:''}${patientData.lastName != undefined ?`&lastName=${patientData.lastName}`:''}&nationality=${patientData.nationality}&phonecode=${patientData.phonecode!= undefined ? patientData.phonecode.replace("+","plus") : 'plus212'}${patientData.phoneNumber != undefined ?`&phoneNumber=${patientData.phoneNumber}`:''}&bloodType=${patientData.bloodType!= undefined ? patientData.bloodType.replace("+","plus").replace("-","moins") : 'ABplus'}&vaccinated=${patientData.vaccinated==false ? 'no' : 'yes'}${patientData.vaccinationDate!=undefined ? `&vaccinationDate=${patientData.vaccinationDate.substring(0,10)}`:''}${patientData.medicalAntecedents.length!=0 ? "&medicalAntecedents=":""}${patientData.medicalAntecedents}${patientData.chirurgicalAntecedents.length!=0 ?"&chirurgicalAntecedents=":""}${patientData.chirurgicalAntecedents}&allergyType=${patientData.allergyType}${patientData.allergies.length!=0 ? "&allergies=":""}${patientData.allergies}`}><button className="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-200 transform bg-blue-800 rounded dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:bg-blue-700 dark:focus:bg-blue-600">Modifier</button></Link>
            <button onClick={()=>supprimerPatient(patientData.IPP)} className="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-200 transform bg-red-800 rounded dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-600 focus:outline-none focus:bg-red-700 dark:focus:bg-red-600">Supprimer</button>

        </div>
    </div>
</div>


  );

  
};

export default PatientItem;
