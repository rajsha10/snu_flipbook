const { insertUser } = require('./userDb')


const insertDetails = (req,res) => {
    console.log(req.body);
    const userDetails = req.body;
    insertUser(userDetails);
    res.sendStatus(200);
}

module.exports = {insertDetails};