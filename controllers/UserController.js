const ResponseUtils = require('../utils/ResponseUtils');
const DBUtils = require("../utils/DBUtils")();
const User = require("../models/User");
const BcryptService = require("../services/BcryptService");
const JwtService = require('../services/auth.service');

exports.registerUser = async(req, res) => {
    const {firstName, lastName, username, password } = req.body;

    if (!firstName || !lastName || !username || !password){
        return ResponseUtils.process400(res);
    }

    try{
        let users = await DBUtils.getAllEntities(User,{});

        var userPresent = false
        for(let i=0; i<users.length; i++){
            if(username === users[i].username){
                userPresent = true
                break
            }
        }
        if(userPresent){
            return ResponseUtils.process400(res, "User Already Registered");
        }

        user = new User({
            firstName,
            lastName,
            username,
            password: BcryptService.password(password),
            uid: users.length + 611,
        });
        await DBUtils.saveEntity(user);

    }catch(e){
        console.error("Error in registering new user: ", e);
        return ResponseUtils.process500(res);

    }

    return ResponseUtils.processData(res);
}

exports.login = async(req, res) => {
    const {username, password} = req.body;
    var token;
    let user; 
    if (!username || !password){
        return ResponseUtils.process400(res);
    }

    try{
        //Fetching user info
        user = await DBUtils.getEntity(User,{username});
        if (!user){
            return ResponseUtils.process404(res, "User not found");
        }
        if(!BcryptService.comparePassword(password, user.password)){
            return ResponseUtils.process401(res, "Wrong Password");
        }
        
        //Signing token
        token = JwtService.issue({
            id: user._id.toString(), 
            username:user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            uid: user.uid,
            moviesRated: user.moviesRated
        })

        //Adding token as header in response
        res.header("Authorization", token)

    }catch(e){
        console.error("Error in Login: ", e)
        return ResponseUtils.process500(res, "Something went wrong. Please check the form again and submit")
    }
    return ResponseUtils.processData(res, {
        user,
        token
    })
}