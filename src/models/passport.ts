import bcrypt from 'bcrypt';
import passport from 'passport';
import passportJWT from 'passport-jwt';
import passport_local from 'passport-local';
import jwt_conf from '../private/jwt/jwt_config';
import UserModel from './mongodb/user';

const JWTStrategy   = passportJWT.Strategy;

const cookieExtractor = (req: any) => {
  let token = null;
  if (req && req.cookies)
  {
// tslint:disable-next-line: no-string-literal
    token = req.cookies.Authorization;
  }
  return token;
};

passport.use(
  new passport_local.Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: true,
      passReqToCallback: false
    },
    async (username: string, password: string, done: any) => {

      let foundUser: any;
      await UserModel.findOne({email: username}, (err, user) => {
        foundUser = user;
      });
      if (foundUser === null ){
        return done(null, false, {message: 'login failed'});
      } else {
        await bcrypt.compare(password, foundUser.password, (err: any, res: any) => {
          if (res === true){
            const userInfo = {
              _id: foundUser._id,
              email: foundUser.email,
              nickname: foundUser.nickname
            };
            return done(null, userInfo)
          } else {
            return done(null, false, {message: 'login failed'});
          }
        });
      }
    }
  )
);
const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: jwt_conf.jwtSecret
};

passport.use(new JWTStrategy(opts, (jwtPayload: any, done: any) => {
  UserModel.findOne({email: jwtPayload.userinfo.email}, (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, user);
    }
  }
  );
}));

export default passport;
