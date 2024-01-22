const { insertUser } = require('./userDb')


const insertDetails = (req,res) => {
    console.log(req.body);
    const userDetails = req.body;
    insertUser(userDetails);
    res.send(200);
}

module.exports = {insertDetails};