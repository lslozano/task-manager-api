const userRequiredFields = [
  "firstName",
  "lastName",
  "username",
  "email",
  "password",
];

const commentRequiredFields = ["comment", "createdBy", "taskId"];

const taskRequiredFields = ["title", "createdBy"];

module.exports = {
  userRequiredFields,
  commentRequiredFields,
  taskRequiredFields,
};
