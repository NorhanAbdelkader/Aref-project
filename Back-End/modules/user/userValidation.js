import Joi from 'joi';

//validation function
export function validateRegisterUser(obj) {
    const schema = Joi.object({

        firstName: Joi.string().required().messages({
            'string.empty': 'يجب ادخال الاسم الأول',
            'any.required': 'يجب ادخال الاسم الأول'
        }),
        lastName: Joi.string().required().messages({
            'string.empty': 'يجب ادخال الاسم الأخير',
            'any.required': 'يجب ادخال الاسم الأخير'
        }),

        email: Joi.string().trim().email().min(10).max(100).required(),
        password: Joi.string().trim().min(6).max(100).required(),

    });

    return schema.validate(obj);
}

export function validateLoginUser(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().email().min(10).max(100).required(),
        password: Joi.string().trim().min(6).max(1024).required(),
    });

    return schema.validate(obj);
}