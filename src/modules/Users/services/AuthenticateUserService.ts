import { getRepository} from 'typeorm';
import { compare } from 'bcryptjs';
import User from '../infra/typeorm/entities/Users';
import { sign } from 'jsonwebtoken';

import AppError from '@shared/err/AppError';

import authConfig from '@config/auth';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}
class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response>{
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: {email}});

    if(!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }
    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
      
    }

    const { secret} = authConfig.jwt;
    const token = sign({}, secret,{
      subject: user.id,
      
    });
    return {
      user,
      token,
    }
  }
}

export default AuthenticateUserService;
