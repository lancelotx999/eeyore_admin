module.exports = {
    'secret': 'kiyazasu-super-secret-key',
    'url': 'mongodb://localhost:3306/eeyore?authSource=admin',
    'options': {
        user: 'eeyoreAdmin',
        pass: 'eeyore',
        useNewUrlParser: true
    },
    ROLE: ['USER', 'ADMIN', 'MERCHANT']
};
