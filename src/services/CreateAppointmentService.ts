import Appointment from "../models/Appointment";
import {getCustomRepository} from 'typeorm';
import { startOfHour } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

import AppError from '../err/AppError';

interface Request {
    provider_id: string;
    date: Date;

}
class CreateAppointmentService {
    public async execute({ date, provider_id }: Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentsRepository)

        const appointmentDate = startOfHour(date);
        
        const findAppointmentSameDate = await appointmentsRepository.finfByDate(appointmentDate);

        if ( findAppointmentSameDate) {
            throw new AppError('This appointment is already booked', 401)
        }

        const appointment = appointmentsRepository.create({
            provider_id,
            date: appointmentDate
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;