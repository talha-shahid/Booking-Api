const role = (roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.agent.role)) {
        return res.status(403).send('Access denied.');
      }
      next();
    };
  };
  
  export default role;