import { ApplicationError } from "../../errorHanding/error.handing.js";
import { getFriends, getPending, responseToRequest, toggleFriend } from "./friend.repository.js";


export default class FriendsController{

    async toggleFriend(req, res, next) {
        try {
            const friendId = req.params.friendId;
            const userId = req.user._id.toString();
            const toggle = await toggleFriend(userId, friendId);
            if (!toggle.success) {
                return res.status(400).json({ success: toggle.success, msg: toggle.msg });
            }
            res.status(200).json({ success: toggle.success, msg: toggle.msg });
        } catch (err) {
            next(err);
        }
    }

    async getPendingRequest(req, res, next) {
        try {
            const userId = req.user._id.toString();
            const getRequest = await getPending(userId);
            if (!getRequest.success){
                return next(new ApplicationError(getRequest.error.msg, getRequest.error.statusCode));
            }
            res.status(200).json({ success: getRequest.success, res: getRequest.res });
        } catch (err) {
            next(err);
        }
    }

    async responseToRequest(req, res, next) {
        try {
            const userId = req.user._id.toString();
            const friendId = req.params.friendId;
            const action = req.body.action;
            const response = await responseToRequest(userId, friendId, action);
            if (!response.success) {
                return next(new ApplicationError(response.error.msg, response.error.statusCode));
            }
            res.status(200).json({ success: response.success, msg: response.msg });
        } catch (err) {
            next(err);
        }
    }

    async getFriends(req, res, next) {
        try {
            const userId = req.params.userId;
            const getFriend = await getFriends(userId);
            if (!getFriend.success) {
                return next(new ApplicationError(getFriend.error.msg, getFriend.error.statusCode));
            }
            res.status(200).json({ success: getFriend.success, res: getFriend.res });
        } catch (err) {
            next(err);
        }
    }


}