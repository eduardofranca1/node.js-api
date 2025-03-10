import { getCustomRepository } from "typeorm";
import { ComplimentsRepositoires } from "../repositories/ComplimentsRepositoires";
import { UserRepositories } from "../repositories/UsersRepositories";


interface IComplimentRequest {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentService {

    async excute ( { tag_id, user_sender, user_receiver, message } : IComplimentRequest ) {
        const complimentsRepositories = getCustomRepository(ComplimentsRepositoires);
        const userRepositories = getCustomRepository(UserRepositories);

        // verificando se user sender e user receiver não são os mesmo
        if (user_sender === user_receiver) {
            throw new Error ("Incorrect User Receiver.");
        }

        const userReceiverExists = await userRepositories.findOne(user_receiver);

        if (!userReceiverExists) {
            throw new Error ("User Receiver doest not exists!");
        }

        const compliment = complimentsRepositories.create({
            tag_id,
            user_receiver,
            user_sender,
            message
        });

        await complimentsRepositories.save(compliment);

        return compliment;

    }
}

export{ CreateComplimentService };