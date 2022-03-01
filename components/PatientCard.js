import React from 'react';
import SearchParent from './SearchParent';
import AjouterPatientButton from './AjouterPatientButton';
import Pagination from './Pagination';
import { useState } from 'react';
import PatientItem from './PatientItem';
import {server} from '../config/index'
import axios from 'axios';


const PatientCard = () => {
  const [data,setData]=useState([])
  const [size,setSize]=useState(undefined)
    async function getAllPatients(){
       await axios.get(`/api/patient/getall/all`,{
          headers: {
            'Access-Control-Allow-Origin':'*' //the token is a variable which holds the token
          }
         }).then(response => {
          setSize(response.data.patients);
        });
/*
        const res = await fetch(`${server}/api/patient/getall/all`,{
            method: "GET",
           headers:{
            'Access-Control-Allow-Origin': '*'
           },
          mode:'no-cors',
          
          })
          .then(res=>{
            
            setSize(res.patients);
          }).catch((e)=>console.log(e)).finally(()=>console.log("done"))
          */
      }
      

  async function getPatients(id){
        if(id==undefined){
          id=1;
        }   
        
        axios.get(`/api/patient/getall/${id}`,{
          headers: {
            'Access-Control-Allow-Origin':'*' //the token is a variable which holds the token
          }
         }).then(response => {
          setData(response.data.patients);
        }); 

      /*
    const res = await fetch(`${server}/api/patient/getall/${id}`,{
        method: "GET",
        headers:{
          'Access-Control-Allow-Origin': '*'
         },
         mode:'no-cors',
      }).then(res=>res.json())
      .then(res=>{
        if(res!=undefined){setData(res.patients);}
          
      })*/
  }



  const patientdata=async ()=>{
   
     getPatients(1);
    if(size==undefined){
         getAllPatients();
    }
    
    
  }

  const getPatientsSearch=async (label)=>{
  
    const res = await fetch(`/api/patient/getall/allforsearch/${label}`,{
        method: "GET",
        headers:{
          'Access-Control-Allow-Origin': '*'
         },
         mode:'no-cors',
      }).then(res=>res.json())
      .then(res=>{
        if(res!=undefined){setData(res.patients);}
      })
  }
 
  const searchHandleData=(label)=>{
      if(label==''){
        patientdata(1);
      }else{
         getPatientsSearch(label);
      }
  
  }
  const patient1  ={IPP:"qfs",name:"qssqf"}
const numHandlerr=(newData)=>{
  getPatients(newData)
}


const [initState,setInitState]=useState(true);
const [patientsData,setPatientsData]=useState([]);
const patientdataHandler=()=>{
patientdata();
}
/*
const getPatients=()=>{
  initButton();
  setInitState(false);
}
/*
{data,size,patiendataHandler,initButton,init,updateHandler,}
 data={data.patients!=undefined ?  data.patients : []} size={size} patiendataHandler={patientdata} initButton={patientdata} init={true} updateHandler={patientdata}
 */
 return (
      <div>
          
      <div className='grid place-items-center h-screen'>
          
      <SearchParent searchHandleData={searchHandleData}></SearchParent>
<div>
    
<div><AjouterPatientButton></AjouterPatientButton></div>
{initState && (<div className="paddingtop10"><button onClick={patientdata} className=" w-96 px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
       Afficher les patients
    </button></div>) }
</div> 


<div className="grid grid-cols-2 mt-2 lg:grid-cols-3 gap-x-3 gap-y-8">
    {data.map((patient)=>{
        return (<PatientItem key={Math.random()} patientData={patient} patientHandlerItem={patientdataHandler}></PatientItem>)
    })}

{patientsData}

</div>
    <Pagination size={size} numHandler={numHandlerr}></Pagination>
  
</div>
</div>
  );
};

export default PatientCard;
