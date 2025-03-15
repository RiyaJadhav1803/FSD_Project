const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

// Middleware to hash password before saving
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Compare password
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

// Generate JWT
userSchema.methods.genJWT = function () {
    return jwt.sign({ id: this.id, email: this.email }, process.env.JWT_KEY , {
        expiresIn: '1h'
    });
};

module.exports = mongoose.model('FSD', userSchema);
