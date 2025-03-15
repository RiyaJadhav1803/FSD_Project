const User = require('../models/user.js');

class UserRepository {
    async create(data) {
        try {
            const response = await User.create(data);
            return response;
        } catch (error) {
            console.error("User Repository Error: Failed to create user", error);
            throw error;
        }
    }

    async get(id) {
        try {
            const user = await User.findById(id);
            return user;
        } catch (error) {
            console.error(`User Repository Error: Failed to get user with ID ${id}`, error);
            throw error;
        }
    }

    async delete(id) {
        try {
            const response = await User.findOneAndDelete({ _id: id });
            return response;
        } catch (error) {
            console.error(`User Repository Error: Failed to delete user with ID ${id}`, error);
            throw error;
        }
    }
}

module.exports = UserRepository;
