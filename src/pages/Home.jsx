import React from 'react'
import service from '../appwrite/postService'
import { Postcard } from '../components'
import {Container} from '../components'
import { useState, useEffect } from 'react'


function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
      service.getPosts([]).then((posts) => {
        console.log(posts)
          if (posts) {
              setPosts(posts.documents);
          }
      })
      .catch((error) => {
        console.error('Failed to fetch posts:', error);
    }).finally(() => {
        setLoading(false);
    });
  }, [])

  if (loading) 
    {
        return <div className="text-center mt-10">Loading posts...</div>;
    }
  if (posts.length === 0) {
      return (
          <div className="w-full py-8 mt-4 text-center">
              <Container>
                  <div className="flex flex-wrap">
                      <div className="p-2 w-full">
                          <h1 className="text-2xl font-bold hover:text-gray-500">
                              No Posts available
                          </h1>
                      </div>
                  </div>
              </Container>
          </div>
      )
  }
  return (
      <div className='w-full py-8'>
          <Container>
              <div className='flex flex-wrap'>
                  {posts.map((post) => (
                      <div key={post.$id} className='p-2 w-1/4'>
                          <Postcard {...post} />
                      </div>
                  ))}
              </div>
          </Container>
      </div>
  )
}

export default Home
