import Joi from "joi";

export const registerUserSchema = Joi.object().keys({
  fullname: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().trim().lowercase().required(),
  password: Joi.string()
    .min(5)
    .regex(/^[a-zA-Z0-9]{5,10}$/)
    .required(),
  confirm_password: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .label("confirm password")
    .messages({ "any.only": "{{#label}}does not match" }),
});

export const option = {
  abortEarly: false,
  errors: {
    wrap: {
      label: " ",
    },
  },
};

export const loginUserSchema = Joi.object().keys({
  
  email: Joi.string().trim().lowercase().required(),
  password: Joi.string()
    .min(5)
    .regex(/^[a-zA-Z0-9]{5,10}$/)
    .required(),
  
});

export const createMoviesSchema = Joi.object().keys({
  
  title: Joi.string().required(),
    description : Joi.string().required(),
    image: Joi.string().required(),
    price: Joi.number().required()
  
  
});

export const updateMoviesSchema = Joi.object().keys({
  
  title: Joi.string().required(),
    description : Joi.string().required(),
    image: Joi.string().required(),
    price: Joi.number().required()
  
  
});