
const roleCheck = function (roleNames = []){
    return (req, res, next) => {
        if(!roleNames.includes(req.user.role)){
            return res.status(403).json({
                message : 'Accès interdit à cette route'
            });
        }
        next();
    };
};

module.exports = { roleCheck };

/* module.exports = (role) => {
    return async (req, res, next) => {
      const user = await User.findById(req.user.id);
      if (!user || user.status !== 'Approuvé' || user.rôleId !== role) {
        return res.status(403).json({ error: "Accès interdit" });
      }
      next();
    };
}; */