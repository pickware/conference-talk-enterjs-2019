const IngressRepository = require('../kubernetes').IngressRepository;

module.exports = async (req, res) => {
    await IngressRepository.delete(req.params.name);

    res.send('');
};
