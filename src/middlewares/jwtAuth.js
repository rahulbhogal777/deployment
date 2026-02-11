import jwt from 'jsonwebtoken';
import { ApplicationError} from '../errorHanding/error.handing.js';
import { userModel } from '../features/user/user.repository.js';

const jwtMiddleware = async(req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
       return next(new ApplicationError("Unauthorised! User is not authenticated", 401));
    }

    try {
        const payLoad = jwt.verify(token, process.env.JWT_KEY);
        const user = await userModel.findOne({ _id: payLoad.userId, "sessions.token": token });
        if (!user) {
            return next(new ApplicationError("Token is expired or Invalid", 401));
        }
        req.user = user;
        req.token = token;
    next();
    } catch (err) {
        return next(new ApplicationError("Token is expired or Invalid", 401));
    }
}

export default jwtMiddleware;