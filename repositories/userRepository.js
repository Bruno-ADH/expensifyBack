const User = require("../models/User");

//recuperer un user par son id
const findById = (id) => User.findById(id);
//recuperer un user par son email
const findByEmail = (email) => User.findOne({ email });
//recuperer toutes les users
const findAllUsers = () => User.find();

//counter le nombre de user dans la base
const countUser = () => User.countDocuments();
//créer un user 
const createUser = (data) => new User(data).save();

//enrégistrer un Task 
const saveUser = (user) => user.save();

//modifier un user 
const updateUser = (id, data) => User.findByIdAndUpdate(id, data, { new: true });
//supprimer un user 
const deleteUser = (id) => User.findByIdAndDelete(id);

const deleteOneUser = (data) => User.deleteOne(data);

module.exports = { 
    findById, 
    findByEmail, 
    findAllUsers, 
    countUser, 
    createUser, 
    saveUser, 
    updateUser, 
    deleteUser,
    deleteOneUser
};
