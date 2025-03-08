const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: function () {
            return this.role === 'student';
        },
        default: 0
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'teacher', 'student'],
        default: "student"
    }
})

userSchema.pre('save', function (next) {
    if (this.role !== 'student') {
        // Удаляем поле points, если роль не student
        this.points = undefined;
    }
    next();
});


const User = mongoose.model("User", userSchema);

module.exports = User