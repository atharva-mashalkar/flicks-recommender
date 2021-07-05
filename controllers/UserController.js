const ResponseUtils = require('../utils/ResponseUtils');
const DBUtils = require("../utils/DBUtils")();
const User = require("../models/User");
const BcryptService = require("../services/BcryptService");

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
