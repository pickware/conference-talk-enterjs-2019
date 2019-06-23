const { ServiceRepository } = require('../kubernetes');

module.exports = async (req, res) => {
    const selectorPieces = req.params.selector.split('=');
    const selector = {};
    selector[selectorPieces[0]] = selectorPieces[1];

    ServiceRepository.updateSelector(req.params.name, selector);

    res.send('');
};
