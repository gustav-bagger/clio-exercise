const { EmployeeNode } = require('../models')

async function getNodeChildren(req, res) {
    const nodeID = req.params.nodeID

    const node = await EmployeeNode.findById(nodeID)
    if(!node) return res.status(400).send('Node not found')

    const children = await node.children()
    return res.json({ children })
}

module.exports = getNodeChildren