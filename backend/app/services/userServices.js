import models from "./../models";

const { users } = models;

export async function addUser(user) {
  if (!user.user_name) {
    throw new Error("User Name is empty.");
  }

  // check user Exists
  const userExists = await users.findOne({
    where: { user_name: user.user_name }
  });
  if (userExists) {
    return { message: "User already exists", data: userExists.id };
  }

  // Create user
  const userInstance = await users.create({
    user_name: user.user_name
  });

  return { message: "User created successfully", data: userInstance.id };
}

export async function updateUser(user) {
  if (!user.user_id) {
    throw new Error("User id is empty.");
  }
  const userInstance = await users.update(
    { user_name: user.user_name },
    { where: { id: user.user_id } }
  );
  return { message: "User updated successfully", data: userInstance.id };
}

export async function listUsers() {
  const usersInstances = await users.findAll({});
  const userArray = [];
  //extracting only necessary information
  for (let user of usersInstances) {
    userArray.push({
      user_name: user.user_name,
      id: user.id
    });
  }
  return { message: "User fetched successfully", data: userArray };
}
