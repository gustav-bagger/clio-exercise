const router = require('express').Router()

const controllers = require('./controllers')

router.post('/node/:parentNodeID', controllers.createNode)
router.get('/node/:nodeID/children', controllers.getNodeChildren)
router.put('/node/:nodeID/parent', controllers.setNodeParent)

router.get('/nodes', controllers.getAllNodes)


module.exports = router