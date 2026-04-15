import 'dotenv/config'
import dbConfig from './config/databaseConfig.js'
import User from './models/userModel.js'
import bcrypt from 'bcrypt'


const temporaryPassword = 'admin123'

async function registerAdmin() {
    try {
        const ADMIN_EMAIL = process.env.ADMIN_EMAIL
        if(!ADMIN_EMAIL){
            console.log('Missing ADMIN_EMAIL env variable')
            process.exit(1)
        }
        await dbConfig()

        const existingAdmin = await User.findOne({email: process.env.ADMIN_EMAIL})
        if(existingAdmin){
            console.log('User already exists as role', existingAdmin.role)
            process.exit(0)
        }
        const hashedPassword = await bcrypt.hash(temporaryPassword, 10)

        const admin = await User.create({
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword,
            role: 'ADMIN'
        })

        console.log('Admin user created')
        console.log('\nemail: ', admin.email)
        console.log('\npassword: ', temporaryPassword)
        console.log('\nchange the password after login')

        process.exit(0)
    } catch (error) {
        console.log('Seed failed: ', error)
    }
}

registerAdmin()