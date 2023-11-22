import { useNavigate } from "react-router-dom";
import axios from 'axios';
const getUserAuth = async()=> {
       const userItem = localStorage.getItem('userItem');
       console.log(userItem)
       if (userItem != null)
       {
         
         const response = await axios.post('http://localhost:8000/api/v1/userauth',{
           token:userItem
         })
 
         if (response.status == 403)
         {
             return {'status':'UnAuthorized','data':''}
         }
         else if(response.status == 200){
           return {'status':'Authorized','data':response.data}
         }
       }
       return {'status':'UnAuthorized','data':''}
     }

export default getUserAuth;