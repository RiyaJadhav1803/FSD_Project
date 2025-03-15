const UserRepository = require('../repository/user-repository.js');
const User = require('../models/user.js');

const userRepository = new UserRepository();

class UserService {
    async signup(data) {
        console.log('from user service 1', data);
        try {
            const user = await userRepository.create(data);
            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // async signup(data) {
    //     console.log('from user service 1', data);
    //     try {
    //         // Create the new user
    //         const user = await userRepository.create(data);

    //         // Generate a token for the new user
    //         const token = user.genJWT(); // assuming genJWT is a method in the User model

    //         // Return the user along with the generated token
    //         return { user, token };
    //     } catch (error) {
    //         console.log(error);
    //         throw error;
    //     }
    // }
    
    async getUserByEmail(email) {
        try {
            const user = await User.findOne({ email });
            return user;
        } catch (error) {
            throw error;
        }
    }

    async signin(data) {
        try {
            const user = await User.findOne({ email: data.email });
            console.log(data.email, data.password);
            console.log("from service 1", user);

            if (!user) {
                throw new Error("No user found");
            }

            const isPasswordCorrect = user.comparePassword(data.password);
            console.log("From service 2", isPasswordCorrect);

            if (!isPasswordCorrect) {
                throw new Error("Incorrect password");
            }

            const token = user.genJWT();
            return token;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService;
