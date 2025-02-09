const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/user");
const { 
    generateRegistrationOptions, 
    verifyRegistrationResponse, 
    generateAuthenticationOptions, 
    verifyAuthenticationResponse 
} = require('@simplewebauthn/server');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: 'User is already exist, you can login', success: false });
        }
        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({
                message: "Signup successfully",
                success: true
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            })
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMsg = 'Auth failed email or password is wrong';
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200)
            .json({
                message: "Login Success",
                success: true,
                jwtToken,
                email,
                name: user.name
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            })
    }
}

// New WebAuthn functions
const registerChallenge = async (req, res) => {
    const { userId } = req.body;
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found!' });

    const challengeOptions = await generateRegistrationOptions({
        rpID: 'localhost',
        rpName: 'My Localhost Machine',
        userID: userId,
        userName: user.email,
        timeout: 60000,
        attestationType: 'none',
    });

    // Store challenge in session or database for later verification
    // Example: challengeStore[userId] = challengeOptions.challenge;

    return res.json({ options: challengeOptions });
}

const registerVerify = async (req, res) => {
    const { userId, cred } = req.body;
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found!' });

    // Retrieve the stored challenge for the user
    // const expectedChallenge = challengeStore[userId];

    const verificationResult = await verifyRegistrationResponse({
        expectedChallenge: expectedChallenge,
        expectedOrigin: 'http://localhost:3000',
        expectedRPID: 'localhost',
        response: cred,
    });

    if (!verificationResult.verified) return res.json({ error: 'Could not verify' });

    // Store the passkey information in the user model
    user.passkey = verificationResult.registrationInfo;
    await user.save();

    return res.json({ verified: true });
}

const loginChallenge = async (req, res) => {
    const { userId } = req.body;

    if (!userId || userId.trim() === "") {
        return res.status(400).json({ error: 'User ID is required' });
    }

    const user = await UserModel.findOne({ email: userId });
    if (!user) {
        return res.status(404).json({ error: 'User not found!' });
    }

    const options = await generateAuthenticationOptions({
        rpID: 'localhost',
        userID: userId,
    });

    // Ensure the challenge is base64url encoded
    options.challenge = options.challenge.toString('base64url');

    return res.json({ options });
}

const loginVerify = async (req, res) => {
    const { userId, cred } = req.body;
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found!' });

    // Retrieve the stored challenge for the user
    // const expectedChallenge = challengeStore[userId];

    const result = await verifyAuthenticationResponse({
        expectedChallenge: expectedChallenge,
        expectedOrigin: 'http://localhost:3000',
        expectedRPID: 'localhost',
        response: cred,
        authenticator: user.passkey,
    });

    if (!result.verified) return res.json({ error: 'Something went wrong' });

    // Login the user: Session, Cookies, JWT
    return res.json({ success: true, userId });
}

const handleWebAuthnLogin = async () => {
    if (!loginInfo.email) {
        return handleError('Email is required for WebAuthn login');
    }
    // Proceed with the fetch call...
};

module.exports = {
    signup,
    login,
    registerChallenge,
    registerVerify,
    loginChallenge,
    loginVerify
}