/* render contact page */
const contact = (req, res) => {
    res.render('contact', { title: 'Contact' });
};

module.exports = { contact };