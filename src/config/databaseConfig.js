import mongoose from 'mongoose'

const dbConfig = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB Connected')
    } catch (error) {
        console.log('MongoDB Connected unsuccessful ', err.message)
    }
}

export default dbConfig