const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const salt = 10
const Candidate = require("./../models/Candidate")
require("dotenv").config()

exports.signup = async (req, res) => {
    try {
        const user = req.body;
        if (!user.name || !user.email || !user.password) {
            res.status(400).json({ error: "Name, Eamil and Password are required." })
        } else {
            const existingUser = await Candidate.findOne({ email: user.email })
            if (existingUser) {
                res.status(400).json({ error: "Eamil already registered." })
            } else {
                const hashedPwd = await bcrypt.hash(user.password, salt);
                // user.password = hashedPwd;
                // user.role = ....
                // const newJob = await Candidate.create(user);  

                const newCandidate = await Candidate.create({
                    name: user.name,
                    email: user.email,
                    password: hashedPwd,
                    role: user.role === 'admin' ? 'admin' : 'candidate'
                });
                res.status(201).json(newCandidate)
            }
        }


    } catch (err) {
        res.status(500).json({ error: "Server error", e: err })
    }
}

exports.login = async (req, res) => {
    try {
        const user = req.body;
        if (!user.email || !user.password) {
            return res.status(400).json({ error: "Eamil and Password are required." })
        } 
        
        const existingUser = await Candidate.findOne({ email: user.email })
        
        if (!existingUser) {
            return res.status(400).json({ error: "Eamil Not found." })
        }

        const isMatch = await bcrypt.compare(user.password, existingUser.password);
        
        if(!isMatch){
            return res.status(401).json({error: "Invalid password"})
        }

        const tokenUser = {id: existingUser._id, name: existingUser.name, role: existingUser.role}
        
        const token = jwt.sign(
            tokenUser,
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );
        
      res.json({token: token, user: existingUser})
    } catch (err) {
        // res.status(500).json({ error: "Server error", e: err })
        res.status(500).json({ error: "Server error", e: err.message });
    }
}