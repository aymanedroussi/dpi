import React from 'react';

const RdvItem = ({data,deleteHandlerRdv}) => {
    const deleteHandler=(id)=>{
        deleteHandlerRdv(id)
    }
  return (
       <tr>
                          <td className="p whitespace-nowrap ">
                    
    <button onClick={()=>{deleteHandler(data._id)}} className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80">
        Supprimer
    </button>
                            </td>
                        
                            <td className="p whitespace-nowrap">
                                <div className="text-start font-medium text-green-500">{data.IPP}</div>
                            </td>
                            <td className="p whitespace-nowrap">
                                <div className="text-lg text-start">{data.patientName}</div>
                            </td>
                            <td className="p whitespace-nowrap">
                                <div className="text-lg text-start">{data.doctor}</div>
                            </td>
                            <td className="p whitespace-nowrap">
                                <div className="text-lg text-start">{data.typeRdv}</div>
                            </td>
                            <td className="p whitespace-nowrap">
                                <div className="text-lg text-start">{data.day!=undefined ? data.day.substring(0,10) : ''}</div>
                            </td>
                            <td className="p whitespace-nowrap">
                                <div className="text-lg text-start">{data.timing}</div>
                            </td>
                            <td className="p whitespace-nowrap">
                                <div className="text-lg text-start">{data.motif}</div>
                            </td>
                        </tr>
                        
                        
  )
  
};

export default RdvItem;
