import React, {useId} from 'react'

function Select({
    options,
    label,
    className='', 
    ...props
}, ref) {
const id = useId()
  return (
    <div className='w-full'>
        {/*The same id which is for label using html for is used for the corresponding select element to ensure link between label and select elemet */ }
        {label && <label htmlFor={id} className=''></label>}
        <select
        {...props}
        id= {id}
        ref={ref}
        className={`px-3 py-w rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}>
           {/*Options is first checked if array is null or not, if its nul and we apply map then app will crash*/ }
            {options?.map((option) => (
                <option key = {option} values={option}>
                    {option}
                </option>
            ))}
        </select>

      
    </div>
  )
}

export default React.forwardRef(Select)
   