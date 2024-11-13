import React, { useId } from 'react'

function Input({
    label,
    placeholder="",
    type="text",
    className="",
    ...props
},ref) {

    const id = useId()

  return (
    <div className="mb-4">
        {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700 ">
            {label} </label>}
        <input
            ref={ref}
            placeholder={placeholder}
            id={id}
            type={type}
            className={`border border-gray-300 rounded-md m-1 px-3 py-2 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
            {...props}
        />
    </div>
  )
}

export default React.forwardRef(Input)