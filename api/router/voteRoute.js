import { Router } from "express";
import { protect } from "../utils/jwt.js";
import { getVotes, registerVote } from "../controller/voteController.js";

const voteRouter = Router()


voteRouter.post('/:id', protect, registerVote)
voteRouter.get('/', protect, getVotes)

export default voteRouter