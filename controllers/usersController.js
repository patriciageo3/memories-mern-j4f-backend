import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

const expiresIn = '1h';

export const signinUser = async (req, res) => {
    const { body: { email, password } } = req;

    try {

        const existingUser = await User.findOne({ email });

        if (!existingUser) return res.status(404).json({ message: "Invalid credentials! Please try again!" });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials! Please try again!" });

        // 'patty' string provided here is just for testing purposes
        // this should be a secret string
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'patty', { expiresIn });
        res.status(200).json({ profile: existingUser, token });

    } catch (error) {

        res.status(500).json({ message: "Something went wrong" });

    }
};

export const signupUser = async (req, res) => {
    const { body: { email, password, firstName, lastName, confirmPassword } } = req;

    try {

        const existingUser = await User.findOne({email});

        if (existingUser) return res.status(400).json({message: "User already exists!"});
        if (password !== confirmPassword) return res.status(400).json({message: "Passwords don`t match!"});

        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({
            email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`
        });
        const token = jwt.sign({email: result.email, id: result._id}, 'patty', { expiresIn });
        res.status(200).json({profile: result, token});

     } catch (error) {

        res.status(500).json({message: "Something went wrong"});

     }
};