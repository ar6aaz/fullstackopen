const Notification = ({ message, errorMessage }) => {
    if (message === null && errorMessage === null) {
      return null
    }
  
    else if(message){
        return (
            <div className='success'>
              {message}
            </div>
          )
    }
    else if(errorMessage){
        return (
            <div className='error'>
              {errorMessage}
            </div>
          )
    }
  }

  export default Notification