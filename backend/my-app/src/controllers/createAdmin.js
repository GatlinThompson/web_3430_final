import { User } from "../models/user.js";
import { Role } from "../models/Role.js";

export const createAdmin = async (req, res, next) => {
  try {
    //delete roles and users
    await User.deleteMany();
    await Role.deleteMany();

    let user1 = new User();
    user1.firstName = "admin";
    user1.lastName = "admin";
    user1.email = "admin@aa.edu";
    user1.username = "admin";

    let role1 = new Role();
    role1.name = "admin";
    await role1.save();

    user1.roles.push(role1);
    await user1.save();

    let user2 = new User();
    user2.firstName = "Peter";
    user2.lastName = "Pendent";
    user2.email = "peter@aa.edu";
    user2.username = "peter";

    let role2 = new Role();
    role2.name = "teacher";
    await role2.save();

    user2.roles.push(role2);
    await user2.save();

    let user3 = new User();
    user3.firstName = "Donald";
    user3.lastName = "Duck";
    user3.email = "donald@aa.edu";
    user3.username = "donald";

    let role3 = new Role();
    role3.name = "student";
    await role3.save();

    user3.roles.push(role3);
    await user3.save();

    let user4 = new User();
    user4.firstName = "Daisy";
    user4.lastName = "Duck";
    user4.email = "daisy@aa.edu";
    user4.username = "daisy";
    user4.roles.push(role3);
    await user4.save();

    let users = await User.find();
    console.log(users);

    let info = {
      users: users,
      message: "DB Seeded!!!",
    };
    res.status(200).json(info);
  } catch (err) {
    console.log({ message: "Error generated while seeding DB...." });
    console.log(err);
    res.status(500).json({ message: "Error generated while seeding DB...." });
  }
};
