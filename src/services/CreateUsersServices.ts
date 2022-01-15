import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import Users from '../models/Users';

interface Request{
    name: string,
    email: string,
    telefone: number,
    data_nascimento: Date
    password: string

}

class CreateUserService {
  public async execute({name, email, telefone, data_nascimento, password}:Request): Promise<Users> {
    const usersRepository = getRepository(Users);
    // Verificar se Email já existe.
    const checkerUserExists = await usersRepository.findOne({
      where: { email },
     })
     if(checkerUserExists) {
       throw new Error('Email address already used.');
     }

     const hashedPassword = await hash(password, 8);

     const user = usersRepository.create({
        name,
        email,
        telefone,
        data_nascimento,
        password: hashedPassword,
     });
     await usersRepository.save(user);

     return user;
  }

}
export default CreateUserService;
