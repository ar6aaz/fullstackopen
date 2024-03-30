const Notification = ({ message, errorMessage }) => {
    if (message === null && errorMessage === null) {
      return null
    }
    else if(errorMessage){
      return (
          <div className='error'>
            {errorMessage}
          </div>
        )
  }
    else if(message){
        return (
            <div className='success'>
              {message}
            </div>
          )
    }
  }

  export default Notification