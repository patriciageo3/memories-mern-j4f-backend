import jwt from 'jsonwebtoken';

const withAuthenticationInfo = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        //authentication happened through the current backend
        if (token && isCustomAuth) {
            const decodedData = jwt.verify(token, 'patty'); //string here is for testing purposes only!

            req.userId = decodedData.id;
        } else {
            // authentication happened through Google Sign Up
            const decodedData = jwt.decode(token);

            req.userId = decodedData.sub;
        }

        next();
    } catch (error) {
        console.log('error', error);
        res.status(401).json({message: "Unauthorized" });
    }
};

export default withAuthenticationInfo;