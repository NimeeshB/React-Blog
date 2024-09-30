import {React , useCallback, useEffect} from 'react'
import { useForm } from 'react-hook-form' 
import { Button, Input, Select, RTE } from '../index'
import service from '../../appwrite/postService'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({post}) {
  const {register, handleSubmit, watch, setValue, control, getValues } = useForm({  //watching capabilities: agar kisi bhi field ko continously watch karna hia ya monitor karna hia
    // ye form tab use hoga jab koi new post bana rha hai ya fir koi existing post edit kar raha hai
    //new post banana hoga tab hum Postform me post parameter empty rakhenge and edit karna hoga tab pass kardenge
    //toh uss hisaab se default values set hongi 
    defaultValues: {
      title: post?.title || '',
      slug: post?.$id || '',
      content: post?.content || '',
      status: post?.status || 'active',

}
})  
const navigate = useNavigate()
const userData = useSelector((state) => state.auth.userData)

const submit = async (data) => {
  //agar post ki value already hai toh update karo aur agar nahi hai toh nayi entry create karo
  console.log(data)
  if(post){   // agar post me data hai toh update karoge existing post
    const file = data.image[0] ? await service.uploadFile(data.image[0]): null  // sabse pehele file lo aur file ko upload kardo, i.e agar image user ne di hai toh upload kardo DB me aur nahi hai toh null kardo  
    
    if(file)
      {
        //jis post ko edit kar rahe uski purani image delete karenge 
        service.deleteFile(post.featuredImage)
      }
      // updated information of the post needs to be stored 
      const dbPost = await service.updatePost(post.$id, {...data,
        featuredImage: file? file.$id : undefined
      })
      
      if(dbPost){
        navigate(`/post/${dbPost.$id}`)
      }

  }
  else { // user naya post create karna chahta hai 
    const file = data.image[0] ? await service.uploadFile(data.image[0]): null

    if(file){
      const fileId = file.$id
      data.featuredImage = fileId
      const dbPost = await service.createPost({
        ...data, userId : userData.$id,
        //store se liya tha user ka data, toh post ke liye wahi use kardiya 
      })
      if(dbPost){
        navigate(`/post/${dbPost.$id}`)
      }

    }

  }

}

// ye Title field ko watch karega aur slug field me value generate karega
//usecallbck runs a memoized call back function  to optimize performance. 
//as slug transform will e called again and again as the title changes we memoize this function so same function instance is used between r-enders provided the dependencies dont change 
const slugTransform = useCallback((value) => {
  if (value && typeof value === "string")
      return value
          .trim()
          .toLowerCase()
          .replace(/[^a-zA-Z\d\s]+/g, "-")
          .replace(/\s/g, "-");

  return "";
}, []);


useEffect(() => {
  const subscription = watch((value, { name }) => {
      if (name === "title") {
          setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
  });

  return () => subscription.unsubscribe();
}, [watch, slugTransform, setValue]);
return (
  <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
          <Input
              label="Title :"
              placeholder="Title"
              className="mb-4"
              {...register("title", { required: true })}
          />
          <Input
              label="Slug :"
              placeholder="Slug"
              className="mb-4"
              {...register("slug", { required: true })}
              onInput={(e) => {
                  setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
              }}
          />
          <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
      </div>
      <div className="w-1/3 px-2">
          <Input
              label="Featured Image :"
              type="file"
              className="mb-4"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("image", { required: !post })}
          />
          {post && (
              <div className="w-full mb-4">
                  <img
                      src={service.getFilePreview(post.featuredImage)}
                      alt={post.title}
                      className="rounded-lg"
                  />
              </div>
          )}
          <Select
              options={["active", "inactive"]}
              label="Status"
              className="mb-4"
              {...register("status", { required: true })}
          />
          <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
              {post ? "Update" : "Submit"}
          </Button>
      </div>
  </form>
);
}


export default PostForm
