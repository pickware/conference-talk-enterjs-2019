const { DeploymentRepository } = require('../kubernetes');

module.exports = async (req, res) => {
    await DeploymentRepository.updateImage(req.params.name, req.params.container, req.params.image);

    res.send('');
};
