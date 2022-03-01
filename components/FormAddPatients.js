import { useState, useEffect } from 'react';
import { countries, numberCodes } from '../util/data'
import Hashtag from './Hashtag'
import Link from 'next/link'
import dbConnect from "../util/dbConnect"
import Progress from './Progress';
import Message from './Message';
import 'nprogress/nprogress.css'
import Nprogress from 'nprogress'


const Input = ({ label, placeholder, value, onChange, type }) => {
    return (
        <div>
            <label className="text-xs text-blue-500 absolute font-bold">{label}</label>
            <input type={type} placeholder={placeholder} className="py-2 mt-4 lg:py-5 rounded border text-sm md:w-48 lg:w-48 w-full pl-4" value={value} onChange={onChange} />
        </div>
    )
}

const ModalBox = ({ classnames, closeBox , dataProps}) => {
    
    const [error,setError]=useState(false)
    const [success,setSuccess]=useState(false)
     const [showProgress,setProgress]=useState(false)
   
 
    const [message,setMessage]=useState('');
    const [messageSuccess,setMessageSuccess]=useState("Le patient a été créé avec succès")
    const [Tags, setTags] = useState([]);
    const [Tag, setTag] = useState("")


    const [tagsNumber, setTagsNumber] = useState(0)
    const [block, setBlock] = useState("block")

    // Inputs
    const IPPInit=dataProps.IPP==undefined ? '' : dataProps.IPP

    const [IPP, setIPP] = useState(IPPInit)
    const [SojournNb, setSojournNb] = useState(dataProps.SojournNb)

    const [firstName, setFirstName] = useState(dataProps.firstName)
    const [lastName, setLastName] = useState(dataProps.lastName)
    const [birthDate, setBirthDate] = useState(dataProps.birthDate)
    const maritalInit=dataProps.maritalStatus==undefined ? 'single' : dataProps.maritalStatus
    const [maritalStatus, setMaritalStatus] = useState(maritalInit);
    const nationalityInit=dataProps.nationality==undefined ? 'Afghanistan' : dataProps.nationality
    const [nationality, setNationality] = useState(nationalityInit)
    const [phoneNumber, setPhoneNumber] = useState(dataProps.phoneNumber)
    
    const [phonecode, setPhonecode] = useState(dataProps.phonecode)
    const bloodTypeInit=dataProps.bloodType==undefined ? 'Aplus' : dataProps.bloodType
    const [bloodType, setBloodType] = useState(bloodTypeInit)
    const vaccinatedInit=dataProps.vaccinated==undefined ? 'no' : dataProps.vaccinated
    const [vaccinated, setVaccinated] = useState(vaccinatedInit)
    const [vaccinationDate, setVaccinationDate] = useState(dataProps.vaccinationDate)
    const medicalAntecedentsInit=dataProps.medicalAntecedents==undefined ? [] : dataProps.medicalAntecedents.split(",")
    const [medicalAntecedents, setMedicalAntecedents] = useState(medicalAntecedentsInit)
    const [medicalAntecedent, setMedicalAntecedent] = useState("")
    const chirurgicalAntecedentsInit=dataProps.chirurgicalAntecedents==undefined ? [] : dataProps.chirurgicalAntecedents.split(",")
    const [chirurgicalAntecedents, setChirurgicalAntecedents] = useState(chirurgicalAntecedentsInit)
    const [chirurgicalAntecedent, setChirurgicalAntecedent] = useState("")
    const [allergy, setAllergy] = useState("")
    const allergiesInit=dataProps.allergies==undefined ? [] : dataProps.allergies.split(",")
    const [allergies, setAllergies] = useState(allergiesInit)
    const [allergyType, setAllergyType] = useState(dataProps.allergyType)
    const reformat=()=>{
        setIPP('');
        setSojournNb('');
        setFirstName('');
        setLastName('');
        setBirthDate('');
        setMaritalStatus('Single');
        setNationality('Afghanistan')
        setPhoneNumber('')
        setBloodType('AB+')
        setVaccinated(false)
        setVaccinationDate('')
        setMedicalAntecedents([])
        setMedicalAntecedent("")
        setChirurgicalAntecedents([])
        setChirurgicalAntecedent("")
        setAllergy("")
        setAllergies([])
        setAllergyType('Alimentaire')
    }
    async function addParent(data){
        const res = await fetch('/api/patient/add', {
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
               else if(res.status=="modified"){
                reformat();
                setSuccess(true)
                setError(false);
                setProgress(false);
                setMessageSuccess("Modified")
                Nprogress.done();}
               else{
                 setError(true);
                 setSuccess(false)
                 setMessage("ERROR");
                 setProgress(false);
                 Nprogress.done();
               }
             }
               
           
        
       });

    
       
    


    }
    const SubmitHandler =  (e) => {
        e.preventDefault();
        
        


            // Fetch the api in here
            
        const data = { IPP, SojournNb, firstName, lastName, birthDate, maritalStatus, nationality,phonecode,phoneNumber, bloodType, vaccinated, vaccinationDate, medicalAntecedents, chirurgicalAntecedents, allergyType, allergies }
        addParent(data)
    }
    return (<>
        <div className={`${classnames} grid place-items-center  text-3xl text-center bg-white rounded mx-auto shadow-2xl absolute ml-auto mr-auto left-0 right-0 mt-14`}>
        {showProgress && <Progress></Progress>}
        {error && <Message message={message} color="red"></Message> }
    {success && <Message message={messageSuccess} color="green"></Message> }
            <h1 className="text-gray-600 text-xl mt-10 font-bold">Ajoutez un patient</h1>
            <div className="mx-auto text-center">
                <form className="flex flex-col flex-wrap mx-auto" onSubmit={SubmitHandler} >
                    <div className="px-10 flex flex-col md:flex-row lg:flex-row gap-4 lg:gap-10 mx-auto pt-10 w-full">
                        <Input type="text" label="IPP" placeholder="IPP" value={IPP} onChange={(e) => setIPP(e.target.value)} />
                        <Input type="text" label="Numéro de séjour" placeholder="Numéro de séjour" value={SojournNb} onChange={(e) => setSojournNb(e.target.value)} />
                        <Input type="text" label="Prénom" placeholder="Prénom" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        <Input type="text" label="Nom de famille" placeholder="Nom de famille" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className="px-10 flex flex-col md:flex-row lg:flex-row gap-4 lg:gap-10 mx-auto pt-10 w-full">
                        <div>
                          
                            <Input type="date" label="Date de naissance" placeholder="Date de naissance" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />

                        </div>
                        <div>
                            <label className="text-xs text-blue-500 absolute font-bold">État civil</label>
                            <select className="py-2 mt-4 lg:py-5 rounded border text-sm md:w-40 lg:w-40 w-full" value={maritalStatus} defaultValue={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value)}>
                                <option value="single">Single</option>
                                <option value="married" >Married</option>
                                <option value="widow">Widow</option>
                                <option value="divorced">Divorced</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-xs text-blue-500 absolute font-bold">Nationalité</label>
                            <select className="py-2 mt-4 lg:py-5 rounded border text-sm w-full md:w-72 lg:w-72" value={nationality} onChange={(e) => setNationality(e.target.value)}>
                                {countries.map(country => <option key={Math.random()} value={country.name}>{country.name}</option>)}
                            </select>
                        </div>

                    </div>
                    <div className="px-10 flex flex-col md:flex-row lg:flex-row gap-4 lg:gap-10 mx-auto pt-10 w-full">

                        <div className="flex flex-col">
                            <label className="text-xs text-blue-500 font-bold absolute">Numéro de téléphone</label>
                            <select value={phonecode} defaultValue={phonecode} onChange={(e) => setPhonecode(e.target.value)} className="w-16 h-8 bg-yellow-200 text-yellow-400 relative top-20 lg:top-12 text-xs rounded-full font-bold pl-0 ml-2.5 border-1 border-yellow-200">
                                {numberCodes.map((country) => <option key={Math.random()} value={country.code.replace("+","plus")}>{country.code}</option>)}
                            </select>
                            <input type="text" className="py-2 lg:py-5 rounded border text-sm w-60 pl-20" placeholder="0655481976..." id="phone-number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                       
                        </div>

                        <div>
                            <label className="text-xs text-blue-500 absolute font-bold">Groupe sanguin</label>
                            <select className="py-2 mt-4 lg:py-5 rounded border text-sm w-full md:w-40 lg:w-40 pl-3" value={bloodType} onChange={(e) => setBloodType(e.target.value)}>
                                <option value="ABplus">AB+</option>
                                <option value="Aplus">A+</option>
                                <option value="Bplus">B+</option>
                                <option value="Oplus">O+</option>
                                <option value="ABmoins">AB-</option>
                                <option value="Amoins">A-</option>
                                <option value="Bmoins">B-</option>
                                <option value="Omoins">O-</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-xs text-blue-500 absolute font-bold">Covid19 vacciné</label>
                            <select className="py-2 mt-4 lg:py-5 rounded border text-sm w-full md:w-40 lg:w-40 pl-3" value={vaccinated}  onChange={(e) => {setVaccinated(e.target.value) }}>
                                <option value="no">No</option>
                                <option value="yes">Yes</option>
                            </select>
                        </div>
                    </div>

                    <div className="px-10 flex flex-col md:flex-row lg:flex-row gap-4 lg:gap-10 mx-auto pt-10 w-full">
                        <div>
                            <label className="text-xs text-blue-500 absolute font-bold">Date de vaccination</label>
                            <input type="date" className="py-2 mt-4 lg:py-5 rounded border text-sm md:w-40 lg:w-40 pl-3 w-full" value={vaccinationDate} onChange={e => setVaccinationDate(e.target.value)}/>
                        </div>

                        <Hashtag label="Antécédents médicaux" Tags={medicalAntecedents} Tag={medicalAntecedent} ChangeHandler={e => setMedicalAntecedent(e.target.value)} setTag={setMedicalAntecedent} setTags={setMedicalAntecedents} />
                        <Hashtag label="Antécédents chirurgicaux" Tags={chirurgicalAntecedents} Tag={chirurgicalAntecedent} ChangeHandler={e => setChirurgicalAntecedent(e.target.value)} setTag={setChirurgicalAntecedent} setTags={setChirurgicalAntecedents} />


                    </div>

                    <div className="px-10 flex flex-col md:flex-row lg:flex-row gap-4 lg:gap-10 mx-auto pt-10 w-full">
                        <div>
                            <label className="text-xs text-blue-500 absolute font-bold">Allergie type </label>
                            <select className="py-2 mt-4 lg:py-5 rounded border text-sm w-full md:w-40 lg:w-40 pl-3" value={allergyType} onChange={(e) => setAllergyType(e.target.value)}>
                                <option value="Alimentaire">Alimentaire</option>
                                <option value="Médicamenteuse">Médicamenteuse</option>
                            </select>
                        </div>
                        <Hashtag label="A renseigner" Tags={allergies} Tag={allergy} ChangeHandler={e => setAllergy(e.target.value)} setTag={setAllergy} setTags={setAllergies} />

                    </div>

<div>
                    <button type="submit" className="w-3/6 md:w-2/6 lg:w-1/6 bg-green-400 text-sm lg:text-lg py-2 lg:py-4 text-white font-bold rounded ml-10 mt-5">Envoyer</button>
                    <Link href="/dashboard"><button type="button" className="w-3/6 md:w-2/6 lg:w-1/6 bg-red-400 text-sm lg:text-lg py-2 lg:py-4 text-white font-bold rounded ml-10 mt-5">Retour</button></Link>
                    
                    </div>
                </form>
                <br></br><br></br>
            </div>
        </div>
    </>);
}

export default ModalBox;