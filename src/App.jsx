import { React, useState, useEffect } from 'react'

import { useDispatch } from 'react-redux';
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom'

function App() {
  // jab bhi database se ya network se kuch fetch karna hai tab ek loading state banaana chahiye which can be used to do condiional redering.
  //i.e loading agar true hai toh loading icon dikahyenge and false hai toh jo bhi content hai woh dikahenge
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch(); // allows react components to interact with redux store and trigger state changes.


  /*
  useEffect executes in the following scenarios:

-After Initial Render: It runs after the first render when the component mounts.
-On Dependency Change: If a dependency array is provided, it runs when any of the dependencies change.
-On Every Render: If no dependency array is provided, it runs after every render.
-Cleanup Phase: Before running the effect again (if dependencies change) or before the component unmounts, the cleanup function (if provided) runs.
  */ 
  useEffect(() => {
    authService.getCurrentUser()  // as the app component renders we first ask the service if there is any current user logged in 
    .then((userData) => 
    {         // then ke andar milta hai data returned by getCurrentUser and ek callback milta hia 
      if(userData){   // yahape check karte hai ki agar userdata mila hai from getCurrentUser to store me update kardo using login function
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())  // agar user data nahi aaya matlab logged in nahi hai tab logout call kardo 
      }

    })
    .catch((error) =>
      {
      console.log("getCurrentUser call in App.jsx  :: error", error)
    })    
    .finally(() => setLoading(false))
  }, [])
  return !loading ? (<div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block'>
      <Header></Header>
      <main> <Outlet /> </main>  {/* Outlet serves as a place holder for the child components. Header aur footer ke bichme jo bhi alag alag compoenents hai woh show honge based on the routing*/ } 
      <Footer></Footer>
      </div>
      </div>) : null
}

export default App
