const router = require('express').Router();
const { body, validationResult } = require('express-validator')
const { isGuest } = require('../middlewares/guards')

// REGISTER GET & POST

router.get('/register', isGuest(), (req, res) => {
    res.render('register')
})

router.post('/register',
    isGuest(),
    body('email').trim().isEmail().withMessage('You must enter a valid email address'),
    body('password').trim().isLength({ min: 4 }).withMessage("Password must be at least 4 characters long"),
    body('rePass').custom((value, { req }) => {
        if (value != req.body.password) {
            throw new Error('Passwords don\'t match')
        }
        return true;
    }),
    async (req, res) => {
        const { errors } = validationResult(req);
        console.log(errors);

        try {
            if (errors.length > 0) {
                throw new Error(Object.values(errors).map(e => e.msg).join('\n'));
            }
            await req.auth.register(req.body.email, req.body.password, req.body.gender)

            res.redirect('/');
        } catch (err) {
            try {
                const ctx = {
                    errors: err.message.split('\n'),
                    userData: {
                        email: req.body.email
                    }
                }
                res.render('register', ctx)
            } catch (error) {
                console.log(error);
            }


        }

    })

//LOGIN GET & POST

router.get('/login', isGuest(), (req, res) => {
    res.render('login')
})

router.post('/login', isGuest(), async (req, res) => {

    try {
        await req.auth.login(req.body.email.trim(), req.body.password.trim())

        res.redirect('/')
    } catch (err) {
        console.log(err.message);
        let errors = [err.message];

        if (err.type == 'credential') {
            errors = ['Incorrect credentials!']
        }
        const ctx = {
            errors,
            userData: {
                email: req.body.email
            }
        }
        res.render('login', ctx)
    }
})

// LOGOUT

router.get('/logout', (req, res) => {
    req.auth.logout();
    res.redirect('/');
})

module.exports = router;