    import mongoose from "mongoose";
    import User from "../models/User.js";
    import { generateToken } from "../utils/jwt.js";

    export const getUser = (req, res) => {
    const user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
    };

    res.status(200).send(user);
    };

    export const registerUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        console.log(user);
        if(user) {
        return res
            .status(401)
            .send("User Already Exists...please login to continue");
        }
        const newUser = await User.create({ ...req.body });
        console.log(newUser);
        if (newUser) {
        generateToken(res, newUser._id);
        res.status(201).send(newUser);
        }
    } catch (error) {
        res
        .status(401)
        .send("Something Went Wrong / Cannot Register User / Please Try Again");
    }
    };

    export const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        console.log(user);
        if (user && (await user.matchPassword(req.body.password))) {
            generateToken(res, user._id);
            res.status(200).send(user);
            console.log(user);
        }else{
            return res.status(401).send('Invalid Credentials')
        }
    } catch (error) {
        res.status(401).send("No Such user exists in out database ...please register to continue");
    }
    };

    export const logoutUser = (req, res) => {
    res.cookie("token", "", { expires: new Date(0) });
    res.status(200).send("User Logged Out");
    };


    export const getCandidates = async(req, res)=>{
        try {
            const candidates = await User.find({isCandidate: true})
            res.status(200).send(candidates)
        } catch (error) {
            res.status(401).send('Something Went Wrong / No candidats present')
        }
    }