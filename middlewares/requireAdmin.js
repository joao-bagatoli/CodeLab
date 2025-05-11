module.exports = function(req, res, next) {
    if (!req.session.user.is_admin) {
        return res.redirect('/');
    }
    next();
};