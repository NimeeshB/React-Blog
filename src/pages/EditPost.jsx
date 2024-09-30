import React from 'react'
import { useEffect, useState, } from 'react'
import { Container, PostForm } from '../components'
import service from '../appwrite/postService'
import { useNavigate,useParams } from 'react-router-dom'

function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams() // url se post ki slug value nikalni hai so that using that we can retrieve the post which needs to be edited. url se value nikalni ho toh we use use params 
    const navigate = useNavigate()

    useEffect(() => {  // sari data values leke aani hai aur slug me post ki value hai, toh slug me kuch changes hoga toh useeffect run karo 
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost
