/*global process */
require("dotenv").config();

const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const db = require("../database");


passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey   : process.env.SECRET_PASS
},
(jwtPayload, cb) => {
  return db
    .select()
    .table("usuario")
    .where({ id: jwtPayload.id })
    .then(user => {
      if (!user) 
        return cb(null, false, { error: true, data: { message: "Usuario o contraseña incorrectos" } });

      // Return user data without password
      delete user.contrasena;
      return cb(null, user, { error: false, message: "OK" });
    })
    .catch(err => {
      return cb({
        error: true,
        data:{ message: err.message }
      });
    });
}
));