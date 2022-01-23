import {  Router } from 'express';
import { parseISO} from 'date-fns';
import {getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import Users from '../models/Users';

const appointmentsRouter = Router();


appointmentsRouter.get('/', async (request, response)=>{
    console.log(request.user)
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();
    return response.json(appointments)
})


appointmentsRouter.post('/',async (request, response)=> {
   try {
    const { provider_id, date } = request.body;
    const parseDate = parseISO(date)

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({date: parseDate, provider_id});
    
    return response.json(appointment);
   } catch (err:any) {
       return response.status(400).json({error: err.message})
   }
    
  
});

export default appointmentsRouter;