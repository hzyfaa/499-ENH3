const loginEndpoint = 'http://localhost:3000/api/login';
const options = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}

/* render login auth page */
const getLoginPage = (req, res) => {
    res.render('login', { title: 'login' });
};

/* authenticate user */
const userLogin = async function (req, res, next) {
    const { email, password } = req.body;
    const body = JSON.stringify({ email, password });
    // on success, user is provided token and redirected to homepage
    try {
        // call api
        const response = await fetch(loginEndpoint, {
            ...options,
            body: body,
        });
        const json = await response.json();
        // check api response
        if (response.ok) {
            // Securely store token in HTTP-only cookie
            res.cookie('jwt', json.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
                maxAge: 24 * 60 * 60 * 1000 // 1 day expiration
            });
            // send back to home page
            res.redirect('/home');
        } else {
            // on error, reload page and display error
            res.render('login', { message: json.message || 'Login failed' });
        }
    } catch (err) {
        res.status(500).send('Server error');
    }
};

module.exports = { getLoginPage, userLogin };