const { EmployeeNode } = require('../models')


async function getAllNodes(req, res) {

    const nodes = await EmployeeNode.find()
    return res.json({
        nodes: await Promise.all(nodes.map(async (node) => await node.parse()))
    })

}

module.exports = getAllNodes
