import express from 'express';
import FriendsController from './friend.controllers.js';

const friendRouter = express.Router();

const friendsContrller = new FriendsController();

friendRouter.post("/toggle-friendship/:friendId", friendsContrller.toggleFriend);
friendRouter.post("/response-to-request/:friendId", friendsContrller.responseToRequest);
friendRouter.get("/get-pending-requests", friendsContrller.getPendingRequest);
friendRouter.get("/get-friends/:userId", friendsContrller.getFriends);

export default friendRouter;