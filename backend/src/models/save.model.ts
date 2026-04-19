import mongoose from 'mongoose';

const saveSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    food: { type: mongoose.Schema.Types.ObjectId, ref: 'food', required: true },
}, { timestamps: true });

export default mongoose.model('Save', saveSchema);    