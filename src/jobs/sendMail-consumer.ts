import { MailerService } from "@nestjs-modules/mailer";
import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { CreateUserDto } from "src/create-user/dto/create-user-dto";


@Processor('sendMail-queue')
export class SendMailConsumer {
    constructor(private mailService: MailerService){}

    @Process('sendMail-job')
    async sendMailJob(job: Job<CreateUserDto>){
        const { data } = job;
        await this.mailService.sendMail({
            to: data.email,
            from: "Equipe Nosso Teste",
            subject: "Seja bem vindo(a)",
            text: `Olá ${data.name} seu cadastro foi realizado com sucesso!`
        })
    }
}