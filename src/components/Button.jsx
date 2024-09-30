import React from 'react'
//ek common button banaya gaya hai which can be used all over the projecct 
//this button will take the folllowing parameters i.e children,bgcolor,textcolor etc
//we have defined a few but we  can so explicitly define then which will overridew the current ones 
//these are used in the 'return" below 
function Button({
    children,  // children is just the text that appears on the button 
    type= 'button',
    bgColor= 'bg-blue-600',
    textColor= 'text-white',
    className = '',
    ...props  //ye jo props spread kiya hai ye isliye hai kyuki jo bhi ye component use kiya agar usne kuch alag properties pass kardi which we didnt mention then woh spread out hoke barabarse map hojayenge 
}) {
  return (

    <button className={`px-4 py-2 rounded-lg ${bgColor}
    ${textColor} ${className}`} {...props}> {children} </button>
  )
}

export default Button
