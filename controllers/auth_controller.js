var exports = module.exports = {}
 
exports.signup = function(req, res) {
 
    res.render('signup');
 
},
exports.signin = function(req, res) {
 
    res.render('index');
 
}
exports.dashboard = function(req, res) {
 
    res.render('dashboard', {displayName: req.user.displayName , profileImage:req.user.image , aboutuser: req.user.about});
 
}
exports.forgot = function (req, res) {
    
    res.render('forgot')
}
exports.reset = function (req, res) {
    res.render('reset')
}
exports.home = function (req, res) {
    res.render("index")
    
}
exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.redirect('/');
 
    });



 
}