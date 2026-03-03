const validateDeliverySpeed = (speed) => {
    const validSpeeds = ['standard', 'express'];
    return validSpeeds.includes(speed?.toLowerCase());
};

module.exports = { validateDeliverySpeed };