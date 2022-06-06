import Joi from 'joi';

const registerValidator = (data) => {
    const rule = Joi.object({
        firstName: Joi.string().min(2).max(225).required(),
        email: Joi.string().min(6).max(225).required().email(),
        // password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).required(),
        password: Joi.string().required(),
    })

    return rule.validate(data);
}

export default registerValidator;