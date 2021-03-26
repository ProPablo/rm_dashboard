import { MigrationInterface, QueryRunner } from "typeorm";
import { Course, inputCourse } from "../entity/Course";
import { User } from '../entity/User';

const courses: inputCourse[] = [
    {
        name: "PTE"
    },
    {
        name: "NAATI"
    },
    {
        name: "IELTS"
    }

]


export class Seed1616281257674 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        let newUser = await User.create({ email: "anhadrs@gmail.com", name: "anhad", password: "test" }).save();
        console.log("Saved a new user with id: " + newUser.id);
        console.log("Seeding courses", courses)
        const savedCourses = await Course.create(courses).forEach(course => course.save());

        console.log(JSON.stringify(savedCourses, null, 2));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query("DELETE FROM user");
        queryRunner.query("DELETE FROM course");
    }
}
