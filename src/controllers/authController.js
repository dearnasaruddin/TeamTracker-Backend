import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

// ========= Login for employee and admin =========
// POST /api/auth/login
export const loginController = async (req, res) => {
    try {
        const { email, password, role_type } = req.body

        if (!email || !password) {
            return res.status(400).json({
                error: 'Email and password are required'
            })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({
                error: 'Invalid credentials'
            })
        }

        if (role_type === 'admin' && user.role !== 'ADMIN') {
            return res.status(401).json({
                error: 'Not authorized as admin'
            })
        }

        if (role_type === 'employee' && user.role !== 'EMPLOYEE') {
            return res.status(401).json({
                error: 'Not authorized as employee'
            })
        }

        const isPassMatch = await bcrypt.compare(password, user.password)
        if (!isPassMatch) {
            return res.status(401).json({
                error: 'Invalid credentials'
            })
        }

        const payload = {
            userId: user._id.toString(),
            role: user.role,
            email: user.email
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' })

        return res.status(200).json({ user: payload, token })

    } catch (error) {
        console.error('Login error', error)
        return res.status(500).json({
            error: 'Login failed'
        })
    }
}



// ========= Get session for employee and admin  =========
// GET /api/auth/session
export const sessionController = (req, res) => {
    const session = req.session
    return res.json({ user: session })
}



// ========= Change password for employee and admin  =========
// POST /api/auth/change-password
export const changePasswordController = async (req, res) => {
    try {
        const session = req.session
        const { currentPassword, newPassword } = req.body

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                error: 'Both passwords are required'
            })
        }

        const user = await User.findById(session.userId)
        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            })
        }

        const isValidCurrentPass = await bcrypt.compare(currentPassword, user.password)
        if (!isValidCurrentPass) {
            return res.status(400).json({
                error: 'Current password is incorrect'
            })
        }

        const hashedPass = await bcrypt.hash(newPassword, 10)
        await User.findByIdAndUpdate(session.userId, {
            password: hashedPass
        })

        return res.status(200).json({ success: true })
    } catch (error) {
        return res.status(500).json({
            error: 'Failed to change password'
        })
    }
}