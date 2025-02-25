/* log user out and send back to home page */
const logout = (req, res) => {
    // remove JWT cookie
    res.clearCookie('jwt');
    // redirect to home
    res.redirect('/');
}

module.exports = { logout }