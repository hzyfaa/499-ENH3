const tripsEndpoint = 'http://localhost:3000/api/trips';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    }
}

/* render travel view */
const travel = async function (req, res, next) {
    await fetch(tripsEndpoint, options)
        .then(res => res.json())
        .then(json => {
            let message = null;
            // response does not contain data
            if (!(json instanceof Array)) {
                message = 'API lookup error';
                json = [];
            } else {
                // response array is of length 0
                if (!json.length) {
                    message = 'No trips exist in our database!';
                }
            }
            res.render('travel', { title: 'Travlr Getaways', trips: json, message });
        })
        .catch(err => { res.status(500).send(err.message) });
};

module.exports = { travel };