exports.index = function(req, res){
    var message = 'In Home Page';
  res.render('index',{message: message});
 
};

