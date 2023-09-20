import React from 'react'

const Message = ({message, className}) => {
  return (
    <h1 className={`message ${className}`}>
      {message}
    </h1>
  )
}

export default Message
