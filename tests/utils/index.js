const expectValidationErrorForFields = (error, fields) => {
  expect(error).toBeDefined();
  fields.forEach((field) => {
    expect(error.errors[field]).toBeDefined();
    expect(error.errors[field].kind).toBeDefined();
  });
};

const getMissingRequiredFields = (requiredFields, model) => {
  return requiredFields.filter((field) => !model[field]);
};

module.exports = {
  expectValidationErrorForFields,
  getMissingRequiredFields,
};
