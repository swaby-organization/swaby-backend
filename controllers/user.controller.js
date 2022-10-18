"use strict";

const bcrypt = require("bcrypt");
const base64 = require("base-64");

const { userModel, userCollection } = require("../DatabaseModels");

const signup = async (req, res) => {
    try {
        if (req.file) {
            req.body.avatar = `${process.env.BACKENDLINK}/${req.file.filename}`;
        }
        const {
            username,
            firstName,
            lastName,
            email,
            password,
            avatar,
            country,
            city,
        } = req.body;

        const userInfo = {
            username,
            firstName,
            lastName,
            avatar,
            email,
            password: await bcrypt.hash(password, 10),
            country,
            city,
        };

        const user = await userCollection.create(userInfo);
        if (user) {
            res.status(200).json({
                user: {
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    country: user.country,
                    city: user.city,
                    avatar: user.avatar,
                },
                token: user.token,
            });
        } else {
            res.status(500).send("Error: Creating user failed");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Error: Creating user failed");
    }
};

const signin = async (req, res) => {
    try {
        const basicAuth = req.headers.authorization.split(" ").pop();
        const [username, password] = base64.decode(basicAuth).split(":");
        const user = await userModel.findOne({
            where: {
                username,
            },
        });
        const valid = await bcrypt.compare(password, user.password);
        if (valid) {
            return res.status(200).json({
                user: {
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    country: user.country,
                    city: user.city,
                    avatar: user.avatar,
                },
                token: user.token,
            });
        }
        return res.status(401).send("You are not authorized");
    } catch (err) {
        console.log(err);
        return res.status(401).send("You are not authorized");
    }
};

const getUserItems = async (req, res) => {
    const id = req.params.id;
    console.log(id)
    let userData = await userCollection.userItems(userModel, id);
    res.status(200).json(userData);
}
module.exports = {
    signup,
    signin,
    getUserItems
};