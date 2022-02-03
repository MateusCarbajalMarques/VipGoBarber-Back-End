import {  Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import CreateUserService from '@modules/Users/services/CreateUsersServices';
import UpdateUserAvatarService from '@modules/Users/services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';


const usersRouter = Router();
const upload = multer(uploadConfig);


usersRouter.post('/',async (request, response)=> {
  
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
  

});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar') ,async (request, response) => {
    
        const updateUserAvatar = new UpdateUserAvatarService();
        
        const user = await updateUserAvatar.execute({
            user_id: request.user?.id,
            avatarFilename: request.file?.filename,
        });
        return response.json(user);
  
})

export default usersRouter;