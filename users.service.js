// Import the users array
const users = require('./users.js');

// Return the users array
const getAllUsers = () => users || [];
    
// Find the user in the users array
const findUserById = (id) => {
    return users.find(user => user.id === parseInt(id));
};

// Add the user
const addUser = (name) => {
    // Create a new user
    const user = {
        id: users.length + 1,
        name: name
    };
    
    // Add the user to the users array
    users.push(user);

    // Return the new user
    return user;
};

// Update the user
const updateUser = (id, name) => {
    // Find the user in the users array
    const user = findUserById(id);

    // If the user is not found return false
    if(!user) {
        return null;
    }

    // Update the user's name
    user.name = name;

    // Return the updated user
    return user;
};

// Delete the user
const deleteUser = (id) => {
    // Find the user in the users array
    const user = findUserById(id);

    // If the user is not found return false
    if(!user) {
        return null;
    }

    // Delete the user
    users.splice(users.indexOf(user), 1);

    return user;
};

// Export the findUser function
module.exports = {
    getAllUsers,
    findUserById,
    addUser,
    updateUser,
    deleteUser
};
