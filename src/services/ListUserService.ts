import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UsersRepositories";
import { classToPlain } from "class-transformer";


class ListUserService {

    async execute() {
        const userRepositories = getCustomRepository(UserRepositories);

        const users = await userRepositories.find();

        return classToPlain(users);
    }
}

export { ListUserService };