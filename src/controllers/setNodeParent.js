const { EmployeeNode } = require('../models')


async function setNodeParent(req, res) {

    const nodeID = req.params.nodeID

    const { parentNodeID } = req.body

    const node = await EmployeeNode.findById(nodeID)
    if(!node) return res.status(400).send('Node not found')

    node.parentNodeID = parentNodeID

    try {
        await node.save()
        return res.json({node: await node.parse()})
    } catch (error) {
        return res.status(500).send('Error while saving node')
    }
    

}

module.exports = setNodeParent