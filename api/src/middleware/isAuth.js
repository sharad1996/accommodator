// import Auth from '../Helpers/Auth';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import { NON_AUTH_PATH } from '../utils/constants/CommonConstants';
import UserService from '../service/UserService'

module.exports = async (request, res, next) => {
  if (!NON_AUTH_PATH.includes(request.path)) {
    try {
      let authToken = request.headers.authorization;
      if (!authToken) {
        throw createError.BadRequest();
      }
      if (authToken.startsWith('Bearer ')) {
        authToken = authToken.slice(7, authToken.length);
      }
      jwt.verify(authToken, process.appConfig.hashSaltKey, async (err, decoded) => {
        try {
          if (err) {
            throw err;
          }
          const { userDetails } = decoded;
          const userObj = new UserService ();
          const user = await userObj.getUser({ uuid:userDetails.uuid });
          request.user = user.data;
          next();
        } catch (err) {
          return res.status(400).send({error:true,message:err.message});
        }
      })
    } catch(err) {
      return res.status(400).send({error:true,message:err.message});
    }
  } else {
    next();
  }
}
// export default function isAuth(request, response, next) {
//   if (!NON_AUTH_PATH.includes(request.path)) {
//     try {
//       let authToken = request.headers.authorization;
//       if (!authToken) {
//         throw createError.BadRequest();
//       }

//       if (authToken.startsWith('Bearer ')) {
//         // Remove Bearer from string
//         authToken = authToken.slice(7, authToken.length);
//       }

//       jwt.verify(authToken, process.appConfig.hashSaltKey, async (err, decoded) => {
//         try {
//           if (err) {
//             throw err;
//           }
//           const { userDetails } = decoded;
//           const userObj = new UserService ();
//           const user = await userObj.getUser({ uuid:userDetails.uuid });
//           request.user = user.data;
//           console.log(userDetails.uuid);
//           next();

//         } catch (error) {
//           console.log(error);
//           let message = 'Unauthorized Request!';
//           if (error.message === 'jwt expired') {
//             message = 'You session has been expired! Please login again to continue.';
//           }
//           throw createError.Unauthorized(message);
//         }
//       });

//       next();
//     } catch (error) {
//      return Promise.reject(error.message);
//     }
//   } else {
//     next();
//   }
// }
