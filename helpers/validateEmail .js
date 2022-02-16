// Helper function

const validateEmail = (email) => {
    // Variables
    const emailValideString = /\S+@\S+\.\S+/;
    return String(email).toLowerCase().match(emailValideString);
};

// Exporting helper function
module.exports = validateEmail;