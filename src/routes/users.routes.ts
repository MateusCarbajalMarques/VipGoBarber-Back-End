import {  Router } from 'express';
import CreateUserService from '../services/CreateUsersServices';


const usersRouter = Router();

usersRouter.post('/',async (request, response)=> {
   try {
       const { 
           name,
           email,
           telefone,
           data_nascimento,
           password
           } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            telefone,
            data_nascimento,
            password
        })
        return response.json(user);
   } catch (err:any) {
       return response.status(400).json({error: err.message})
   }
    
  
});

export default usersRouter;