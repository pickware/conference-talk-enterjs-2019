const { DeploymentRepository } = require('../kubernetes');

module.exports = async (req, res) => {
    await DeploymentRepository.scale(req.params.name, parseInt(req.params.scale, 10));

    res.send('');
};
