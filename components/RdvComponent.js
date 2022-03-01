import React, { useState } from 'react';
import AjouterRdvButton from './AjouterRdvButton';
import RdvItem from './RdvItem';
import axios from 'axios';
import { useEffect } from 'react';

const RdvComponent = () => {
    const onclickPagination=(page)=>{
        console.log(page)
    }

    const [data,setData]=useState([]);
    async function getrdvs(id){
        
        if(id==undefined){
          id=1;
        }   
        
        axios.get(`/api/rdv/getall/${id}`,{
          headers: {
            'Access-Control-Allow-Origin':'*' //the token is a variable which holds the token
          }
         }).then(response => {
          setData(response.data.rdvs);
        }); }


    const getall=()=>{
        getrdvs();
    }
    useEffect(() => {
        getall(); 
      },[]);

      const deteleByid=async (id)=>{
        await fetch(`/api/rdv/delete/${id}`, {
            method: 'GET',
      
            headers: { 'Content-Type': 'application/json' ,
            
              'Access-Control-Allow-Origin': '*',
             mode:'no-cors'}
        }).then(res => res.json())
      }
  
      const deleteRdv=async (id)=>{
        await deteleByid(id);
        await getall(); 
      }
  return(
   <div>
        <div className="grid place-items-center h-screen">
   <AjouterRdvButton></AjouterRdvButton>
    <div className="w-full max-w-6xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200 ">
        <header className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800 titleLinge">Liste des rendez-vous</h2>
        </header>
        <div className="p-3">
            <div className="overflow-x-auto">
                <table className="table-auto w-full">
                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                        <tr>
                            <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-center">Actions</div>
                            </th>
                      
                            <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-left">IPP </div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-left">Nom du patient</div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-left">Nom du docteur</div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-left">Type du rendez-vous</div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-left">Date</div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-left">Heure</div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-left">Motif</div>
                            </th>
                          
                        </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100">
                    {data.map((rdv)=>{
        return (<RdvItem key={Math.random()} data={rdv} deleteHandlerRdv={deleteRdv}></RdvItem>)
    })}
                    
                   
                    </tbody>
                </table>
            </div>
           
        </div>
        
    </div>
    
    </div>
  
   </div>
  );
};

export default RdvComponent;
