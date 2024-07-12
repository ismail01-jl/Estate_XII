import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    imageUrl:{
        type: String,
        default:"https://th.bing.com/th/id/OIP.yYUwl3GDU07Q5J5ttyW9fQHaHa?rs=1&pid=ImgDetMain",
    }
}, { timestamps: true });
const User = mongoose.model('User', userSchema);
export default User;