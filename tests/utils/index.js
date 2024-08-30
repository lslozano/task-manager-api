const getValidationError = async (model) => {
  try {
    await model.validate();
  } catch (error) {
    return error;
  }

  return null;
};

const expectValidationErrorForFields = (error, fields) => {
  expect(error).toBeDefined();
  fields.forEach((field) => {
    expect(error.errors[field]).toBeDefined();
    expect(error.errors[field].kind).toBeDefined();
  });
};

const getMissingRequiredFieldsFromModel = (requiredFields, model) => {
  return requiredFields.filter((field) => !model[field]);
};

module.exports = {
  getValidationError,
  expectValidationErrorForFields,
  getMissingRequiredFieldsFromModel,
};
