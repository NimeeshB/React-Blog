import React from 'react'

function Logo({ width = '100px'}) {
  return (
    <div>
      {<img className='150px 'src="../../blog.jpg" alt="Blog Image" style={{ width: width, height: 'auto' }} />}
    </div>
  )
}

export default Logo
