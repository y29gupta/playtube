class apiError extends Error{
    constructor(statusCode,error=[],stack,message='something went wrong')
    {
        super(message)
        this.statusCode=statusCode
        this.data=null
        this.message=message
        this.stack=stack
        this.succes=false
        this.error=error

            if(stack){
                this.stack=stack 
            }else{
                Error.captureStackTrace(this,this.constructor)
            }

    }
}
export {apiError}