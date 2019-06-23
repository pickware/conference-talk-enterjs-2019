const ServiceRepository = require('../kubernetes').ServiceRepository;

module.exports = async (req, res) => {
    await ServiceRepository.delete(req.params.name);

    res.send('');
};
