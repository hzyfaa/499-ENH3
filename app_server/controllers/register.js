const registerEndpoint = 'http://localhost:3000/api/register';
const options = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}

/* render register auth page */
const getRegisterPage = (req, res) => {
    res.render('register', { title: 'register' });
};

/* register user */
const userRegister = async (req, res) => {

    const { name, email, password } = req.body;
    const body = JSON.stringify({ name, email, password });

    // on success, user is provided token and redirected to homepage
    try {
        // call api
        const response = await fetch(registerEndpoint, {
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
            res.render('register', { message: json.message || 'register failed' });
        }
    } catch (err) {
        res.status(500).send('Server error');
    }
};

module.exports = { getRegisterPage, userRegister };