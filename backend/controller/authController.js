import User from '../models/User.js';
import {signInToken} from '../utils/token.js';
import _sendEmail from '../utils/Email.js'


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
            message: 'Signin Failed'
        })
    }
}

export const forgotPswd = async (req, res) => {
    const {email} = req.body;
    const user = await User.findOne({email});

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        })
        
    }


/////// reset pswd token
const resetToken = jwt.sign({id:user._id}, process.env.JWT_SECRET,{expiresIn:'2m'});

try {

await _sendEmail({
  to: user.email,
  subject:'Reset Password',
  html: `
  
    <div style="width: 90%; margin: 0 auto;">
    <h1>Reset Password</h1>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt, dolore mollitia quia delectus saepe id.</p>
    <p>Click here to reset password : <a style="color: green; text-decoration: none;" href="">Reset</a></p>
  </div>
  
  `
})

  
} catch (error) {
  res.status(500).json({
    success:false,
    message:'Email send failed'
  })
}


}



//////// profile 

export const profile = (req, res) => {
    res.status(200).json({ success: true, user: req.user })
}