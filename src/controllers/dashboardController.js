import Employee from "../models/employeeModel.js";
import Attendance from "../models/attendanceModel.js";
import LeaveApplication from "../models/leaveApplicationModel.js";
import Payslip from "../models/payslipModel.js";
import { DEPARTMENTS } from "../constansts/departments.js";


// ============ Get dashboard for employee and admin ============
// api/dashboard
export const getDashboardController = async (req, res)=>{
    try {
        const session = req.session
        if(session.role === 'Admin'){
            const [totalEmployees, totalAttendance, pendingLeaves] = await Promise.all([
                Employee.countDocuments({isDeleted: {$ne: true}}),
                Attendance.countDocuments({
                    date: {
                        $gte: new Date(new Date().setHours(0,0,0,0)),
                        $lt: new Date(new Date().setHours(24,0,0,0))
                    }
                }),
                LeaveApplication.countDocuments({status: 'PENDING'})
            ])

            return res.status(200).json({
                role: 'ADMIN',
                totalEmployees,
                totalDepartments: DEPARTMENTS.length,
                totalAttendance,
                pendingLeaves
            })
        }else{
            const employee = await Employee.findOne({userId: session.userId})
            .lean()
            if(!employee){
                return res.status(404).json({
                    error: 'Employee not found'
                })
            }
            const today = new Date()
            const [currentMonthAttendance,pendingLeaves, latestPayslip] = await Promise.all([
                Attendance.countDocuments({
                    employeeId: employee._id,
                    date:{
                        $gte: new Date(today.getFullYear(), today.getMonth(), 1),
                        $lt: new Date(today.getFullYear(), today.getMonth() + 1, 1)
                    }
                }),
                LeaveApplication.countDocuments({
                    employeeId: employee._id,
                    status: 'PENDING'
                }),
                Payslip.findOne({employeeId: employee._id})
                .sort({createdAt: -1})
                .lean()
            ])
            return res.status(200).json({
                role: 'EMPLOYEE',
                employee: {
                    ...employee,
                    id: employee._id.toString()
                },
                currentMonthAttendance,
                pendingLeaves,
                latestPayslip: latestPayslip ? {
                    ...latestPayslip,
                    id: latestPayslip._id.toString()
                } : null
            })
        }
    } catch (error) {
        console.error('Dashboard error ',error);
        return res.status(500).json({
            error: 'Failed'
        })
    }
}