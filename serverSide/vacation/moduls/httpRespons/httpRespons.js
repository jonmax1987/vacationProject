class httpResponse{
    constructor(){
        this.success = true;
        this.error = false;
        this.message ='';
        this.data = [];
    }
}
module.exports = httpResponse;