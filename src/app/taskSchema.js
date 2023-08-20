import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema(
    {
        task: {
            type: String,
            required: true,
            trim: true,
        },
        owner: {
            type: String,
            required: true,
            trim: true,
        },
        isprivate: {
            type: Boolean,
            required: true,
            default: false,
        }
    }, {
    timestamps: true // Habilita los campos createdAt y updatedAt
})

export default mongoose.models.Task || mongoose.model('Task', taskSchema)