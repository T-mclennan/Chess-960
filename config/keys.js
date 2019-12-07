if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}

// module.exports = {
//     mongoURI: 'mongodb+srv://Tristan:mongodbpass@cluster0-5qw53.mongodb.net/Chess960?retryWrites=true&w=majority',
//     oAuthClient: '539980539315-2ga1urr1cdeai6a5edkkbpti3falgn39.apps.googleusercontent.com',
//     oAuthSecret: '7pZNx2J1br4pEfa_sCrdGuRs'
// }