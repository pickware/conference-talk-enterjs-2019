const DeploymentRepository = require('../kubernetes').DeploymentRepository;

module.exports = async (req, res) => {
    await DeploymentRepository.delete(req.params.name);

    res.send('');
};
