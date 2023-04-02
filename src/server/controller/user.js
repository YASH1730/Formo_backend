require('dotenv').config();
const user = require('../../database/model/user')
const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt')


async function generate (data){
    console.log(data)
    let token = await JWT.sign(data.toJSON(),process.env.JWT_SECRETE)
    return token
}

exports.register = async (req, res) => {
    try {

        const { username, email, password } = req.body
        if (!username || !email || !password) return res.status(204).send({ message: "Data not received !!!" })

        // Store hash in your password DB.
        const hash = await bcrypt.hash(req.body.password, 10);

        req.body.password = hash;

        console.log(req.body)

        // return res.send("all okay")
        let data = user(req.body)

        data = await data.save()

        if (data) {
            return res.send({ message: "User registered Successfully !!!" })
        }
    } catch (error) {
        console.log("Error >>", error)
        return res.status(500).send({ message: "May be duplicate value found !!!" })
    }


}

exports.login = async (req, res) => {
    try {

        const { email, password } = req.body
        if ( !email || !password) return res.status(204).send({ message: "Data not received !!!" })


        let data = await user.findOne({ email: req.body.email })

        if (data) {
            // Store hash in your password DB.
            const result = await bcrypt.compare(req.body.password, data.password);

            if (result) {
                let token = await generate(data);
                const { email, username } = data
                return res.send({username,email,token, message: "Logged In Successfully !!!" })
            }
            else
                return res.status(403).send({ message: 'Invalid Password !!!' })
        }
        else {
            return res.status(404).send({ message: 'User not found !!!' })
        }

    } catch (error) {
        console.log("Error >>", error)
        return res.status(500).send({ message: "May be duplicate value found !!!" })
    }


}