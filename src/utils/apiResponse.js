class apiResponse{
    constructor(statusCode,data,message="success"){
        this.message=message
        this.data=data
        this.statusCode=statusCode
        this.succes=statusCode<400
    }
}
export {apiResponse}