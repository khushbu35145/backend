import Joi from "joi";

  const applicationValidationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  department: Joi.string().required(),
  course: Joi.string().required(),
  consent: Joi.boolean().valid(true).required(),
});
export default applicationValidationSchema;

