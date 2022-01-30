import {  Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUsersServices';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';


const usersRouter = Router();
const upload = multer(uploadConfig);


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

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar') ,async (request, response) => {
    try{
        const updateUserAvatar = new UpdateUserAvatarService();
        
        const user = await updateUserAvatar.execute({
            user_id: request.user?.id,
            avatarFilename: request.file?.filename,
        });
        return response.json(user);
    } catch(err:any){
        return response.status(400).json({error: err.message})
    }
})

export default usersRouter;