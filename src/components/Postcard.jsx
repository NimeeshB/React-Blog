import React from 'react'
import service from '../appwrite/postService'
import { Link } from 'react-router-dom'

function Postcard({$id, title, featuredImage}) {
  return (
    //sara ka sara card clickable hona chhiaye islie Link me wrap karenge aur 
    //Link me pura url nai dena padta, jahape ho wahase url de sakte hai 
    //In Appwrite, $id is a system attribute automatically assigned to documents and users. It uniquely identifies each document or user within a collection or user base.
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={service.getFilePreview(featuredImage)} alt={title} className='rounded-xl'/>   {/*gefilePreview se sidha woh preview image ka url return hota hia  */}
            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>
  )
}

export default Postcard
