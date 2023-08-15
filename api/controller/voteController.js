import User from "../models/User.js"
import Vote from "../models/Vote.js"

export const registerVote = async(req ,res)=>{
    const id = req.params.id
    if(req.user.isCandidate || req.user.isAdmin){
        res.status(401).send('Candiates and Admins cannot vote')
    }
    try {
        const existingVote = await Vote.findOne({voterId: id})
        if(existingVote){
            res.status(401).send('Already Voted..Cannot vote twice')
        }
        const user = await User.findById(req.body.candidateId)
        if(!user.isCandidate){
            return res.status(401).send('Not Candidate')
        }
        const newVote = await Vote.create({voterId: req.user._id, candidateId: req.body.candidateId})
        await User.findByIdAndUpdate(req.body.candidateId, {$inc:{vote:1}})
        res.status(200).send(newVote)
    } catch (error) {
        console.log(error);
    }
}

export const getVotes = async(req, res)=>{
    try {
        const votes = await Vote.find().populate('voterId', ['name']).populate('candidateId', ['name'])
        res.status(200).send(votes)
    } catch (error) {
        res.status(401).send(error)
    }
}