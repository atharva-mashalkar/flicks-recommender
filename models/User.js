const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String },
        lastName: { type: String },
        username: { type: String, unique:true },
        password: { type: String },
        savedToDataSet: { type: Boolean, default: false },
        uid: { type: String, unique: true },
        moviesRated: [
            {
                movieId:{type:Number},
                userRating:{type:Number},
                genre:{type:String}
            }
        ],
        creationTime: { type: Number, default: Date.now },
        lastUpdated: { type: Number, default: Date.now }
    }
);


userSchema.pre("save", function save(next) {
    const user = this;
    user.lastUpdated = Date.now()
    next();
});

userSchema.pre("updateOne", function updateOne(next) {
    const user = this;
    user.lastUpdated = Date.now()
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;