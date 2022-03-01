import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faArrowRight, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

const Hashtag = ({ label, Tags, Tag, setTag, setTags, ChangeHandler }) => {

    const [tagsNumber, setTagsNumber] = useState(0)
    const [errorMsg, setErrorMsg] = useState("")

    const KeyPressHandler = (e) => {
        if (tagsNumber >= 4) {
            setErrorMsg("Only four antecedents allowed")
            setTimeout(() => {
                setErrorMsg("")
            }, 2000)
        } else {
           
            if (Tag !== undefined) {
                if(Tag.length > 12){
                    setErrorMsg("too much characters")
                    setTimeout(() => {
                        setErrorMsg("")
                    }, 2000)
                }
                else if (!Tags.includes(Tag) ) {
                    setTags([...Tags, Tag])
                    setTagsNumber(tagsNumber + 1)
                    setTag('');
                }
                else {
                    setErrorMsg("You already have this tag")
                    setTimeout(() => {
                        setErrorMsg("")
                    }, 2000)
                }
            } else {
                setErrorMsg("You should enter a tag first")
                setTimeout(() => {
                    setErrorMsg("")
                }, 2000)
            }
        }
    }

    // You should update the removeTag

    const removeTag = (e) => {

        var Element = e.target.parentElement
        var poppedTag = Element.id

        console.log(e)

        const newTags = Tags.filter((tag) => tag !== poppedTag)

       

        setTags(newTags)
        setTagsNumber(tagsNumber - 1)
    }

    return (<>
        <div className="">

            <div className="w-full">
                <label className="text-xs font-bold text-left absolute text-blue-500">{label}</label>
                <input type="text" className="py-2 mt-4 lg:py-5 rounded border text-sm md:w-48 lg:w-72 w-full px-4" placeholder={label} onChange={ChangeHandler} value={Tag} />
                <i className="absolute"><FontAwesomeIcon icon={faPlusCircle} color="gray" onClick={KeyPressHandler} size="xs" className="cursor-pointer relative top-5 right-10 w-4 h-4 text-green-400" /></i>
                {errorMsg && <p className="text-red-400 text-xs font-bold text-left mt-1">{errorMsg}</p>}
            </div>

            <div className="h-full w-full">
                <ul className="text-sm w-full m-0 p-0 grid grid-cols-2 mt-1 gap-x-1 gap-y-3 mx-auto">
                    {Tags.map((tag) => <li key={tag} id={tag} className="mr-auto bg-green-100 rounded-lg text-green-400 font-bold border-0 text-xs w-32 py-2 px-2 mt-1">#{tag}<FontAwesomeIcon key={tag} id={tag} icon={faTimes} color="red" onClick={removeTag} size="xs" className='ml-1 absolute mt-1 cursor-pointer' /></li>)}
                </ul>
            </div>
        </div>
    </>);
}

export default Hashtag;