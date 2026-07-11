import User from '../models/User.js';
import {signInToken} from '../utils/token.js'


export const signUp = async (req, res) => {
    console.log('>>>>>>>>>', req.body);
    
    try {

        const {email, password} = req.body;
        if (!email || !password) {
            res.status(400).json({ 
                success: false, 
                message: "Missing required fields"
            })
        }


        //////////////////// check user
        const isExist = await User.findOne({ email });

        if (isExist) {
            res.status(200).json({ 
                success: false, 
                message: "Email already Registered!"
            })
        }



        ///////////// create user

        const user = await User.create(req.body);
        const token = signInToken(user);

        let userWithoutPswd = user.toObject();
        delete userWithoutPswd.password;


        res.status(201).json({
            message: 'User creates successfully',
            success: true,
            token,
            user: userWithoutPswd
        })

        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Signup failed'
        });
    }
}

export const signIn = async (req, res) => {
    try {

        const {email, password} = req.body;
        const user = await User.findOne({email});

        if (!user || !(await user.comparePswd(password))) {
            res.status(401).json({  
            success: false,
            message: 'Invalid Credentials'
        })
        }

        let userWithoutPswd = user.toObject();
        delete userWithoutPswd.password;


        const token = signInToken(user);

        res.status(201).json({
            message: 'SignIn successfully!',
            success: true,
            token,
            user: userWithoutPswd
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'SignIn failed'
        })
    }
}