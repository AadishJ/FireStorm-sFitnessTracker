const joi = require( "joi" );

function SignupValidation(req,res,next) 
{
    const schema = joi.object( {
        name: joi.string().min( 2 ).max( 100 ).required(),
        email: joi.string().email().required(),
        password: joi.string().max( 100 ).allow(""),
        confirmPassword: joi.string().min( 4 ).max( 100 ).allow(""),
        isGoogle: joi.boolean().required(),
    } );
    const { error } = schema.validate( req.body );
    if ( error )
    {
        return res.status( 400 ).json( {message: "Bad Request", error} );
    }
    next();
}
function LoginValidation(req,res,next) 
{
    const schema = joi.object( {
        email: joi.string().email().required(),
        password: joi.string().max( 100 ).allow(""),
        isGoogle: joi.boolean().required(),
    } );
    const { error } = schema.validate( req.body );
    if ( error )
    {
        return res.status( 400 ).json( {message: "Bad Request", error} );
    }
    next();
}

module.exports = {
    SignupValidation,
    LoginValidation,
}