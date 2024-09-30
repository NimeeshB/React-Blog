import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
import config from '../config/config'

export default function RTE({name, control, label, defaultValue = ''}) { //Controller is responsible to pass all the state information from the RTE to the PostForm(the component which uses RTE)
  //jo bhi parent element iss component ko call karega woh pass karega control taaki woh control le paye iske events ka 
  return (
    <div className='w-full'>
        {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
      
        <Controller
        name={name || "content"} 
        control={control} // jo bhi parent element isko call karega woh control lega, hum as it is yaha pass karenge taaki woh pura control le paye , jitne bhi events ho rhe hai, state hai etc 
        render={({field: {onChange  }}) => ( //jo bhi field ki tracking karni hai woh yaha ayegi(Editor in this case), is field ke andar kuch bhi change hota hia toh mujhe inform kardena
                //jo bhi field render karwana hai woh yaha ayega 
                <Editor
                apiKey = {config.tinyMCEAPIkey}
        initialValue={defaultValue}
        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange={onChange} /*ye wahi onchange hai controller wala, editor me kuch bhi change hoga woh track hoga aur "field" k through hame pata chalega */
        />
        )}  
        >

        </Controller>
      
    </div>
  )
}


