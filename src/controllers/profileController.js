import Employee from "../models/employeeModel.js"

// ============ Get profile ============
// GET /api/profile
export const getProfileController = async (req, res)=>{
    try {
        const session = req.session
        const employee = await Employee.findOne({userId: session.userId})
        if(!employee){
            // Authenticated user is an admin
            return res.json({
                firstName: 'Admin',
                lastName: '',
                email: session.email
            })
        }

        return res.json(employee)

    } catch (error) {
        return res.status(500).json({
            error: 'Failed to fetch profile'
        })
    }
}



// ============ Update profile ============
// PUT /api/profile
export const updateProfileController = async (req, res)=>{
    try {
        const session = req.session
          const employee = await Employee.findOne({userId: session.userId})
        if(!employee){
            return res.status(404).json({
                error: 'Employee not found'
            })
        }
        if(employee.isDeleted){
            return res.status(403).json({
                error: 'Your account is deactivated. You cannot update your profile'
            })
        }
        await Employee.findByIdAndUpdate(employee._id,{
            bio: req.body.bio
        })
        return res.status(200).json({
            success: true
        })
    } catch (error) {
           return res.status(500).json({
            error: 'Failed to update profile'
        })
    }
}