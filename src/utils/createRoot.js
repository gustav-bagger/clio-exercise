const { EmployeeNode } = require('../models')

async function createRoot() {

    //Return if a root node already exists
    if(await EmployeeNode.findOne({isRoot: true})) return

    //Otherwise create a rootNode
    const rootNode = EmployeeNode({
        isRoot: true,
        employeeName: 'Jack Newton',
        employeeType: 'manager',
        managingDepartment: 'The whole company'
    })

    await rootNode.save()
}

module.exports = createRoot