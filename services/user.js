const User = require('../models/User');

async function createUser(email, hashedPassword, gender) {
    //TODO adapt properties to project requirements
try {
     const user = new User({
        email,
        hashedPassword,
        gender,
        tripsHistory: []
    })

    await user.save();

    return user;
} catch (error) {
    console.log(error);
}
   
}

async function getUserByEmail(email) {
    try {
          const pattern = new RegExp(`^${email}$`, 'i')
    const user = await User.findOne({ email: { $regex: pattern } }).populate('tripsHistory').lean();
    return user;  
    } catch (error) {
        console.log(error);
    }

}


//TODO add function for finding user by other properties, as specified in the project requirements

module.exports = {
    createUser,
    getUserByEmail
}