const Joi = require("joi");

const registerSchema = async (req, res, next) => {
    
    const schemaRegister = Joi.object({
        firstName: Joi.string().min(2).required().messages({
            'string.base': `"username" doit-être une chaîne de caratère 'text'`,
            'string.empty': `"username" ne doit pas être vide`,
            'string.min': `"username" doit avoir une longueur minimum de {#limit}`,
            'any.required': `"username" est un champs obligatoire`
            }),
        lastName: Joi.string().min(2).required().messages({
            'string.base': `"username" doit-être une chaîne de caratère 'text'`,
            'string.empty': `"username" ne doit pas être vide`,
            'string.min': `"username" doit avoir une longueur minimum de {#limit}`,
            'any.required': `"username" est un champs obligatoire`
            }),
        email: Joi.string().email().required().messages({
            'string.email': `"email" doit-être un email valide`,
            'any.required': `"email" est un champs obligatoire`
            }),
        phone: Joi.number().required().messages({
            'number.phone': `"phone" doit-être un numéro valide`,
            'any.required': `"phone" est un champs obligatoire`
            }),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().messages({
            'string.password': `"password" doit-être un password valide`,
            'any.required': `"password" est un champs obligatoire`
            }),
        confirmPassword: Joi.ref('password')
    });

    const { error } = schemaRegister.validate(req.body);
    if(error){
        return res.status(400).json({message :error.details[0].message});
    }
    next();
}

const loginSchema = async (req, res, next) => {
    
    const schemalogin = Joi.object({
        email: Joi.string().email().required().messages({
            'string.email': `"email" doit-être un email valide`,
            'any.required': `"email" est un champs obligatoire`
            }),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().messages({
            'string.password': `"password" doit-être un password valide`,
            'any.required': `"password" est un champs obligatoire`
            })
    });

    const { error } = schemalogin.validate(req.body);
    if(error){
        return res.status(400).json({message :error.details[0].message});
    }
    next();
}

module.exports = { registerSchema, loginSchema };