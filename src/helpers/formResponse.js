// const message = (status)=>{
//     switch(status){
//         case 200: return 'Success'||'Login Success'; break;
//         case 201: return 'Success Create Data'; break;
//         case 400: return 'Failed! , Bad Request'; break;
//         case 401: return 'Authentication Failed'; break;
//         case 401: return 'Forbidden, you can not access this page'; break;
//         case 404: return 'Sorry, Not Found'; break;
//     }
// }

const formResponse = (data, res, status, message) => {
    const post = {
        success: (status === 200 || status === 201) ? true : false ,
        status: status,
        message: message,
        data: data
    }
    return res.status(status).send(post)
}
module.exports = formResponse