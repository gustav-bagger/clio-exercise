const { EmployeeNode } = require('../models')

async function createNode(req, res) {

    const {
        employeeName,
        employeeType, 
        managingDepartment, 
        strongestLanguage
    } = req.body

    const parentNodeID = req.params.parentNodeID
    if(!parentNodeID) return res.status(400).send('parentID is required')

    const parentNode = await EmployeeNode.findById(parentNodeID)
    if (!parentNode) return res.status(400).send('parent node not found')


    const node = EmployeeNode({
        parentNodeID,
        employeeName,
        employeeType, 
        managingDepartment, 
        strongestLanguage
    })

    try {
        await node.save()
        return res.json({node: await node.parse()})
    } catch (error) {
        return res.status(500).send('Error while saving node')
    }
}

module.exports = createNode