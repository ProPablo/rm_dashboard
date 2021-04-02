import { MigrationInterface, QueryRunner } from "typeorm";
import { User } from "../entity/User";

export class Seed1616999423418 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        let newUser = await User.create({ email: process.env.USER_EMAIL, name: process.env.USER_NAME, password: process.env.USER_PASSWORD }).save();
        console.log("Saved a new user with id: " + newUser.id);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query("DELETE FROM user");
    }
}
