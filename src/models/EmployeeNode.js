const mongoose = require('mongoose')

const EmployeeNodeSchema = new mongoose.Schema({
    //I will use the _id property, whick is generated automatically, for identifing nodes

    isRoot: {
        type: Boolean,
        default: false,
        required: true
    },
    
    parentNodeID: {
        type: mongoose.Types.ObjectId,
        ref: 'EmployeeNode',
        required: function () {
            return !this.isRoot
        }
    },

    employeeName: {
        type: String,
        required: true
    },
    
    employeeType: {
        type: String,
        enum: ['developer', 'manager', 'other'],
        required: true
    },
    
    //Managers should have an extra field specifying the name of the department they are managing.
    managingDepartment: {
        type: String,
        required: function () { this.employeeType === 'manager' }
    },
    
    //Developers should have an extra field specifying the name of the programming language they are strongest in.
    strongestLanguage: {
        type: String,
        required: function () { this.employeeType === 'developer' }
    }
})

//Check parentNodeID is valid, if modified
EmployeeNodeSchema.pre('save', async function (next) { 

    if(this.isRoot || !this.isModified('parentNodeID')) return next()

    if(this.parentNodeID === this._id) return next(new Error("A node can't have itself as parent"))

    const parentNode = await EmployeeNode.findById(this.parentNodeID)
    if (parentNode) return next()
    return next(new Error('Parent node not found'))
})


//NOT IDEAL - but I don't have time
EmployeeNodeSchema.methods.height = async function () {

    if (this.isRoot) return 0
    
    const parentNode = await EmployeeNode.findById(this.parentNodeID)
    return await parentNode.height() + 1

}

EmployeeNodeSchema.methods.parse = async function () {

    const {
        _id,
        isRoot,
        parentNodeID,
        employeeName,
        employeeType,
        strongestLanguage,
        managingDepartment
    } = this

    return {
        nodeID: _id,
        isRoot,
        parentNodeID,
        employeeName,
        employeeType,
        ...(employeeType === 'developer' && { strongestLanguage }),
        ...(employeeType === 'manager' && { managingDepartment }),
        height: await this.height()
    }
}

EmployeeNodeSchema.methods.children = async function () {
    
    const children = await EmployeeNode.find({ parentNodeID: this._id })
    return await Promise.all(children.map(async (child) => await child.parse()))
}


const EmployeeNode = mongoose.model('EmployeeNode', EmployeeNodeSchema)
module.exports = EmployeeNode