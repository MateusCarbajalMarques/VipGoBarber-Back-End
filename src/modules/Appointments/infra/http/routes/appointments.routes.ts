import {  Router } from 'express';
import { parseISO} from 'date-fns';
import {getCustomRepository } from 'typeorm';
import AppointmentsRepository from '@modules/Appointments/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/Appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/Users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);


appointmentsRouter.get('/', async (request, response)=>{
    console.log(request.user)
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();
    return response.json(appointments)
})


appointmentsRouter.post('/',async (request, response)=> {
   
    const { provider_id, date } = request.body;
    const parseDate = parseISO(date)

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({date: parseDate, provider_id});
    
    return response.json(appointment);
  
    
  
});

export default appointmentsRouter;