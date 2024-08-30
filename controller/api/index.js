// Import just the router express
const router = require('express').Router();



const profileRoutes= require('./profile-routes.js')
const loginRoutes = require('./signin-routes.js')
const reviewRoutes= require('./review-routes.js')
const likesRoutes= require('./likes-routes.js')
const usersRoutes= require('./users-routes.js')

//When a request is made to the /users or /projects path, it will be directed to the index.js in the /users or /projects folder.

router.use('/profile', profileRoutes);
// router.use('/login', loginRoutes);
router.use('/reviews', reviewRoutes);
router.use('/likes', likesRoutes);
router.use('/users', usersRoutes); 

module.exports = router;

