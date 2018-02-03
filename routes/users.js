module.exports = function(app){

var express = require('express'),
	router = express.Router(),
	fs = require('fs'),
	path = require('path');

var csvParser = require('csv-parse');
var multer = require('multer');

var filePath = '/home/ubuntu/tennis_project/uploads'; 
//var	filePath = 'C:/tennis_web/20170723/uploads/';
var fileName;
//----- Upload CSV -----
var storage =   multer.diskStorage({		
  destination: function (req, file, callback) {
  	console.log("create folder..." + __dirname); 
  	callback(null, './uploads/');
  },
  filename: function (req, file, callback) {	  	
  	console.log("file name is " + JSON.stringify(file) );
  	var now = new Date();
  	var year = "" + now.getFullYear();
	var month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
	var day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
	var hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
	var minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
	var second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
	var datetimestamp =  year + "_" + month + "_" + day + " " + hour + "_" + minute + "_" + second;

	console.log(datetimestamp);
  	fileName = file.fieldname + '-' + datetimestamp +  path.extname(file.originalname);
  	console.log("File Name " + fileName);
    callback(null,fileName);    
  }
});

app.post('/uploadcsv',function(req, res) {	
	if(req.method = "POST"){		
		var upload = multer({ storage : storage}).single('csvFile');
									
		upload(req,res,function(err) {
			var post = req.body;
			var gender = post.gender;
			var age = post.age;			
			console.log("Gender " + gender);
	        if(err) { console.log("Problem with MySQL"+err);}
	        console.log("REading File " + fileName);
	       	fs.readFile(filePath+'/'+fileName, { encoding: 'utf-8'}, function(err, csvData) {
				if (err) { console.log("Error 1 " + err);}			  				 				  	
			 	var newLine = csvData.split('\r\n');				 					
			 	var CSVData = "";
			  	
			  	for (var i = 0; i < newLine.length - 1; i++){					  		
				  	CSVData += newLine[i]+','+gender+','+age + '\r\n';						  					  	
			  	}		

			  	csvParser(CSVData, { from: '2',delimiter: ','}, function(err, data) {
			    	if (err) { console.log("Error 2 " + err); } 
			    	else {				    	
			    		db.query("DELETE FROM players WHERE gender='"+ gender +"' AND age='"+age+"' ", function(req,result){
			    			if(err){ console.log("Delete error : " + err); }
			    			console.log("Data deleted!");
			    		});
			    		db.query("DELETE FROM signlist WHERE gender='"+ gender +"' AND age='"+age+"' ", function(req,result){
				    		if(err){  console.log("Delete error : " + err);}
			    			console.log("Signing List deleted!");
			    		});				    				    		
			    		var sql ='INSERT INTO players (rank,first_name,last_name,reg_no,dob,state,single_point,double_point,double_point_25,under16_point,late_wl,under14_point,total_point,gender,age) VALUES ?';
			      		db.query(sql, [data], function(err, result) {
				      		if(err){ console.log("Error is "+err);}				      			
			      			else{							      			
					      		db.query("SELECT * from tournament",function(err,result){
									if(err)
									{
										return res.redirect('/tournament', {message : err});
										console.log("Problem with MySQL"+err);
									} else {							
										res.render('tournament' , {data : result});
									}		
								});
			      			}
			     		});			      
			    	}
			  	});
			});
    	});		
    }
});

app.get('/signup',function(req, res){
  res.render('signup');
});

app.post('/signup',function(req, res){  
  message = '';
    var post  = req.body;    
    var useremail = post.user_email;
    var userpassword= post.user_password;
    var confirm_pass = post.confirm_password;    

    if(userpassword == confirm_pass){     
        var INSERT_USER = "INSERT into user(user_email,user_password) VALUES ('"+useremail+"','"+userpassword+"')";   
	        db.query(INSERT_USER, function(err, result) {
              if(err) { return console.log(err); 
              } else {  
                message = "Succesfully! Your account has been create.";               
                res.render('index', {message: message});                 
              }
            });         
      } else {
        message = "Password Not Match." ;
        res.render('signup', {message: message});
    }  
}); 

//----- Login Page ---------
app.post('/login',function(req, res){
	var message = '';
	var sess = req.session;
	var post  = req.body;
	var useremail= post.user_email;
	var userpassword= post.user_password;
	var USER_LOGIN="SELECT user_id, user_email FROM user WHERE user_email='"+ useremail +"' and user_password = '"+userpassword+"'";   
	db.query(USER_LOGIN, function(err, result){ 		
		if(result.length > 0){
				req.session.user_id = result[0].user_id;
				res.redirect('/tournament');
		}else{				
      		res.render('index.ejs',{message: 'Wrong Credentials.'});
		}
	});
});

//--------------- Reset Password ----------------
app.post('/resetpassword',function(req,res){
  var user_email = req.body.emailid;

  var FIND_EXIST_USER_PASSWORD = "SELECT * FROM user WHERE user_email='"+user_email+"'";
  db.query(FIND_EXIST_USER_PASSWORD, function(err,result){
    if(err){
      console.log(err);
      res.send("fail");
    }else {
      if(result.length <= 0){
        res.send("usernotExist");
      } else {
        var user_email = result[0].user_email;
        var user_password = result[0].user_password;

        require('../email/forgotPasswordEmail.js').sendEmail(user_email,user_password);
        console.log("Password is " + user_password);
        res.send("success");
      }
    }
  });
});

//----- Logout Page ---------
app.post('/logout',function(req, res){
	res.redirect('/');
});

//------ Show Tournament Page ------
	app.get('/tournament', function(req,res){
		db.query("SELECT * from tournament",function(err,result){
			if(err)
			{
				return res.render('/', {message : err});
				console.log("Problem with MySQL"+err);
			} else {							
				res.render('tournament' , {data : result});
			}		
		});
	})


//----- Create Tournament -----
	app.post('/createTournament', function(req,res){
		if(req.method == "POST"){
			var post  = req.body;		
			var name  = post.name;
			var gender = post.gender;
			var age = post.age;
			var startdate = post.startdate;
			var enddate = post.enddate;
			
			var FIND_TOURNAMENT = "SELECT * FROM tournament WHERE age='"+age+"' AND gender='"+gender+"'";
			db.query(FIND_TOURNAMENT, function(err,result){
				if(err){ console.log(err)}
					else{
						if(result.length > 0){
							return res.json({message: "Tournament For Gender : '"+gender+"' AND Age = '"+age+"' is already added!"})
						} else {
							var createTournament = "INSERT into tournament(name, gender, age, startdate, enddate) VALUES ('"+ name + "','"+ gender + "','" + age +"','"+ startdate + "','"+enddate+"' )";
							db.query(createTournament, function(err, result)
					        {
					          if (err) {          	
									console.log("Problem with MySQL"+err);
									res.json({message :  " Error is " + err  });	
									return;
								} else {			
									res.json({message:"Tournament Succesfully created!"});
								}
					        });	   
						}
					}
			});			   
		}
	});

//----- Delete Tournament -----
	app.get('/deleteTournament', function(req,res){
		var gender = req.query.gender;
		var age = req.query.age;		
		db.query("DELETE FROM tournament WHERE gender='"+gender+"' AND age='"+age+"'", function(err,result){
			if(err){
				console.log("Problem with MySQL"+err);
				res.json({message : err});				
			}else {
				console.log("Tournament Deleted");
				db.query("DELETE FROM players WHERE gender='"+gender+"' AND age='"+age+"'", function(err,result){
					if(err){
						console.log("Problem with MySQL"+err);
						res.json({message : err});				
					}else {
						console.log("AITA Deleted");
						db.query("DELETE FROM signlist WHERE gender='"+gender+"' AND age='"+age+"'", function(err,result){
							if(err){
								console.log("Problem with MySQL"+err);
								res.json({message : err});				
							}else {
								console.log("Sign Deleted");
								db.query("DELETE FROM draw WHERE gender='"+gender+"' AND age='"+age+"'", function(err,result){
									if(err){
										console.log("Problem with MySQL"+err);
										res.json({message : err});				
									}else {
										console.log("draw Deleted");
										db.query("DELETE FROM result WHERE gender='"+gender+"' AND age='"+age+"'", function(err,result){
											if(err){
												console.log("Problem with MySQL"+err);
												res.json({message : err});				
											}else {
												console.log("result Deleted");
												res.redirect('/tournament');
												//res.json({message: "Tournament Succesfully Deleted!"});		
											}
										});
									}
								});
							}
						});
					}
				});
			}
		})
	});

//----- AITA List -----
	app.get('/players', function(req, res){ 
		var gender = req.query.gender;
		var age = req.query.age;		
		db.query("SELECT * from players WHERE gender='"+gender+"' AND age='"+age+"'",function(err,result){
			if(err)
			{
				return res.render('players', {message : err});
				console.log("Problem with MySQL"+err);
			} else {							
				res.render('players' , {data : result});
			}
		});
	});

//----- Signing List -----
	app.get('/sign_list', function(req,res){
		var gender = req.query.gender;
		var age = req.query.age;		
		db.query("SELECT * from signlist WHERE gender='" +gender+"' AND age = '"+age+"'",function(err,rows){
			if(err)
			{
				res.json({message : err});	
				console.log("Problem with MySQL"+err);
				return;
			} else {		
				res.render('sign_list', {data : rows});
			}
		});
	});

//----- Draw List -----
	app.get('/draw_list', function(req, res){	
	  	/*var userId = req.session.userId;
	  	if(userId == null){  
	      res.redirect("/");
	      return;
  		}
*/
  		var InputDATA = [];
	  	var i = 0;
		var gender = req.query.gender;
		var age = req.query.age;
		var FIND_TOURNAMENT_PLAYER = "SELECT COUNT(round_no) FROM draw WHERE gender='" +gender+"' AND age = '"+age+"'";
		db.query(FIND_TOURNAMENT_PLAYER,function(err,result){
			var playerList = result;								
			if(playerList == 0){
				console.log("NO entry in draw");
				res.render('draw_list', {data : result});
			} else {
				var FIND_TOURNAMENT_ID = "SELECT DISTINCT tournament_id,draw_no,draw.gender,draw.age, tournament.name, tournament.startdate,tournament.enddate, tournament.drawno FROM draw INNER JOIN tournament ON draw.tournament_id = tournament.id WHERE draw.gender='"+gender+"' AND draw.age = '"+age+"'";				
				db.query(FIND_TOURNAMENT_ID, function(err,result){
					if(err){console.log(err)}
					for(var i=0; i < result.length; i++){     
				      InputDATA.push(result[i]);
				      InputDATA[i].playerList=[]; 
				    }       
				    var i = 0;
				    getDetails();    
				})

			    function getDetails(){
				    if(i >= InputDATA.length ){      
				    	res.render('draw_list.ejs',{data:InputDATA}) ;
				      	return;
					}

					var playerArray=[];
					var GET_PLAYERLIST = "SELECT * FROM draw WHERE gender='" +gender+"' AND age = '"+age+"'";
						db.query(GET_PLAYERLIST, function(err, resultPlayer){ 				      
					      for(var j=0; j < resultPlayer.length; j++){
					        playerArray.push(resultPlayer[j]);
					      }
					      InputDATA[i]['playerList'] = playerArray ;
					      i++;
					      getDetails();     
					    });					
				};
			}
		});
	});	

//----- Result List -----
	app.get('/result_list',function(req, res){
		var gender = req.query.gender;
		var age = req.query.age;		
		db.query("SELECT * from result WHERE gender='" +gender+"' AND age = '"+age+"' order by no DESC",function(err,rows){
			if(err)
			{
				return res.render('result_list', {message : err});
				console.log("Problem with MySQL"+err);
			} else if(rows.length > 0){
					console.log("length " + rows.length);
					for(var i=0; i< rows.length; i++){
						if(i+1 == rows.length){
							res.render('result_list', {data : rows});					
						}					
						var winner_name = rows[i].winner_name;
						var no = rows[i].no;

						db.query("delete u1 FROM result u1, result u2 WHERE u1.no < u2.no AND u1.winner_name = u2.winner_name", function(error, result){
							if(error){ console.log(error)} 
								else {
									if(result.length > 0){
										//console.log("Row Deleted");									
									}else{
										//console.log("Unique result found!");
									}
									
								}
						});			
					}												
				}  else {
					res.redirect('result_list');
				}			
		});
	});

//----- Get AITA Player List for Signing List -----
	app.get('/getRegPlayerdetails', function(req,res){
		var regNo = req.query.reg_no;
		var gender = req.query.gender;
		var age = req.query.age;
		db.query("SELECT * from players WHERE reg_no = '" + regNo + "' AND gender = '"+gender+"' AND age = '"+age+"'", function(err, regno){
			if(err){
				return;
				console.log("Problem with MySQL"+err);
			} else {			
				res.send(regno);
			}
		});
	});

//----- Create Signing Player List ----
	app.post('/createPlayerList',function(req,res){
		if(req.method == "POST"){
			var post  = req.body;
			var gender = post.gender;
			var age = post.age;
			var regno = post.regno;
			var firstName = post.firstName;
			var lastName = post.lastName;
			var contactno = post.contactno;
			var dob = post.dob;
			var state = post.state;
			var rank = post.rank;
			var point = post.point;
			
			var FIND_EXIST_PLAYER = "SELECT * FROM signlist WHERE reg_no='"+regno+"' AND first_name='"+firstName+"' AND last_name='"+lastName+"'";
			db.query(FIND_EXIST_PLAYER, function(err,result){
				if(err){ console.log(err)}
					else{
						if(result.length >0){
							console.log("Player already added!");
							return res.json({message :  "Player is already added!" });	
						} else {
							var insertData = "INSERT into signlist(reg_no, first_name , last_name , contactno, dob , state , rank , point, gender, age) VALUES ('"+ regno + "','"+ firstName + "','"+ lastName + "','" + contactno + "','" + dob + "','"+ state +"','" + rank + "','"+ point + "','"+gender+"','"+age+"') ";
							db.query(insertData, function(err, rows)
					        {
					          if (err) {          	
									console.log("Problem with MySQL"+err);
									
									return;
								} else {											
									res.json({message : " Player Succesfully added!"});	
								}
					        });
						}
					}
			});
		}
	});

//----- Delete Individual Signlist Entry -----
	app.post('/deleteSignPlayer',function(req, res){
		var seedno  = req.body.userno;	
		var gender = req.body.gender;
		var age = req.body.age;	
		db.query("DELETE FROM signlist WHERE no = '" + seedno + "' AND gender = '"+gender+"' AND age = '"+age+"'", function(err,result){
			if(err){
				console.log("Problem with MySQL"+err);
				return res.json({message : err});				
			}else {
				res.json({message:"Deleted Succesfully!"});		
			}
		})
	});

//----- Delete All Signing Player List
	app.post('/deleteSignList', function(req,res){
		var gender = req.body.gender;
		var age = req.body.age;		
		db.query("DELETE FROM signlist WHERE gender = '"+gender+"' AND age = '"+age+"'",function(err,rows){
			if(err)
			{
				console.log("Problem with MySQL"+err);
				res.json({message : err});	
				return;			
			} else {			
				res.json({message : "Succesfully deleted!"});	
			}
		});
	});

//----- Get Edit Signlist Player List -----
	app.get('/editSignPlayer/',function(req,res){
		var regNo = req.query.userno;
		var gender = req.query.gender;
		var age = req.query.age;	
		db.query("SELECT * from signlist WHERE no = '" + regNo + "' AND gender = '"+gender+"' AND age = '"+age+"'", function(err, result){
			if(err){
				return;
				console.log("Problem with MySQL"+err);
			} else {						
				res.send(result);
			}
		});
	});

//----- Save Edit Signlist Player -----
	app.post('/saveEditPlayer/',function(req,res){
		var post  = req.body;
		var gender1 = post.gender1;
		var age1 = post.age1;
		var regno = post.regno1;
		var firstName = post.firstName1;
		var lastName = post.lastName1;
		var contactno = post.contactno1;
		var dob = post.dob1;
		var state = post.state1;
		var point = post.point1;
			
		var updateData = "UPDATE signlist SET first_name = '"+ firstName + "', last_name = '"+ lastName + "', contactno = '" +  contactno + "' , dob = '"+ dob + "', state = '"+ state + "', point= '"+ point + "' WHERE reg_no = '"+ regno + "' AND gender = '"+gender1+"' AND age = '"+age1+"'";
		db.query(updateData, function(err, rows)
        {
          if (err) {
				console.log("Problem with MySQL"+err);							
				return res.json({message :  " Error is " + err  });	
			} else {							
				res.json({message : " Player Succesfully updated!"});	
			}
        });		
	});

//----- Get AITA Player List for Signing List -----
	app.get('/getPlayerName1', function(req,res){
		var regNo = req.query.player1_no;
		var gender = req.query.gender;
		var age = req.query.age;		
		db.query("SELECT * from signlist WHERE reg_no = '" + regNo + "' AND gender = '"+gender+"' AND age = '"+age+"'", function(err, result){
			if(err){
				return;
				console.log("Problem with MySQL"+err);
			} else if(result.length > 0){		
				console.log("Result Found ");	
				var first_name = result[0].first_name;
				var last_name = result[0].last_name;
				var state = result[0].state;
				var findName = result[0].first_name + " " + result[0].last_name + " " +result[0].state;				
				var FIND_EXIST_RECORD = "SELECT player1,player2 FROM draw WHERE player1='"+findName+"' OR player2='"+findName+"' AND gender = '"+gender+"' AND age = '"+age+"'";
				db.query(FIND_EXIST_RECORD,function(err,response){
					if(err){ console.log(err)
					} else {						
						if(response.length > 0)	{
							console.log("Result Found " + response[0].match_no);
							res.send('duplicate');
							return ;	
						} else {							
							res.send(result);
						}													
					}
				});						
			} else {
				console.log("No Result Found");
				res.send('noentry');
			}
		});
	});

//----- Get AITA Player List for Signing List -----
	app.get('/getPlayerName2', function(req,res){
		var regNo = req.query.player2_no;
		var gender = req.query.gender;
		var age = req.query.age;
		db.query("SELECT * from signlist WHERE reg_no = '" + regNo + "' AND gender = '"+gender+"' AND age = '"+age+"'", function(err, result){
			if(err){
				return;
				console.log("Problem with MySQL"+err);
			} else if(result.length > 0){		
				console.log("Result Found " );		
				var first_name = result[0].first_name;
				var last_name = result[0].last_name;
				var state = result[0].state;
				var findName = result[0].first_name + " " + result[0].last_name + " " +result[0].state;				
				var FIND_EXIST_RECORD = "SELECT match_no,player1,player2 FROM draw WHERE player1='"+findName+"' OR player2='"+findName+"' AND gender = '"+gender+"' AND age = '"+age+"'";
				db.query(FIND_EXIST_RECORD,function(err,response){
					if(err){ console.log(err)
					} else {						
						if(response.length > 0)	{
							console.log("Result Found " + response[0].match_no);
							res.send('duplicate');
							return ;	
						} else {							
							res.send(result);
						}													
					}
				});						
			} else {
				console.log("No Result Found!");
				res.send('noentry');
			}
		});
	});

//------ Create Draw for First Time -----
	app.post('/createDraw',function(req,res){
		var gender = req.body.gender;
		var age = req.body.age;
		
		var FIND_SIGNPLAYER_NO = "SELECT no FROM signlist WHERE gender='"+gender+"' AND age = '"+age+"'";
		db.query(FIND_SIGNPLAYER_NO, function(err,result){
			if(err){ console.log("Error is " + err)	}
			if(result.length <= 0 ){			
				res.json({message :  "Add Player in Signing list to create Draw!" });
			} else {
				var playerNo = result.length;				
				var totalMatch, round1, round2, round3, round4, round5, round6, round7, round8;
				var roundNo;
				console.log(playerNo);
				if(playerNo < 4){
					res.json({message : "Add Players to create a Draw!"});
				}
				if(playerNo >=4 && playerNo <= 8 ){	
					totalMatch = 8;
					round1 = 4;
					round2 = 6;
					round3 = 7;
					round4 = 0;
				} else if(playerNo >=9 && playerNo <= 16){
					totalMatch = 16;
					round1 = 8;
					round2 = 12;
					round3 = 14;
					round4 = 15;
					round5 = 0;
				}
				else if(playerNo >= 16 && playerNo <= 32){
					totalMatch = 32;
					round1 = 16;
					round2 = 24;
					round3 = 28;
					round4 = 30;
					round5 = 31;
					round6 = 0;
				}
				else if(playerNo >= 32 && playerNo <= 64){
					totalMatch = 64;
					round1 = 32;
					round2 = 48;
					round3 = 56;
					round4 = 60;
					round5 = 62;
					round6 = 63;
					round7 = 0;
				}
				else if(playerNo >= 64 && playerNo <= 128){
					totalMatch = 128;
					round1 = 64;
					round2 = 96;
					round3 = 112;
					round4 = 120;
					round5 = 124;
					round6 = 126;
					round7 = 127;
					round8 = 0;
				}
				else if(playerNo >= 128 && playerNo <= 256){
					totalMatch = 256;
					round1 = 128;
					round2 = 192;
					round3 = 224;
					round4 = 240;
					round5 = 248;
					round6 = 252;
					round7 = 254;
					round8 = 255;					
				}
				console.log("draw No " + totalMatch + " Round1 " + round1 + " Round2 " + round2 + " Round-3 " + round3);

				var UPDATE_DRAW_VALUE = "UPDATE tournament SET drawno='"+totalMatch+"' WHERE gender='"+gender+"' AND age='"+age+"'";
				db.query(UPDATE_DRAW_VALUE, function(error,result){
					if(error){ console.log(error)}
					else{
						console.log("Draw No update in Tournament!");
					}
				});

				db.query("SELECT * FROM tournament WHERE gender='"+gender+"' AND age='"+age+"'", function(err,result){
					if(err){ console.log(err)}
						else{
						var tournament_id=result[0].id;									

						for(var i=1;i<=round1;i++){
						roundNo = 'Round-1'; 
							var ADD_TOURNAMENT_ENTRY = "INSERT INTO draw(tournament_id, draw_no,round_no,match_no,gender,age) VALUES ('"+tournament_id+"' ,'"+round1+"','"+roundNo+"','"+i+"','"+gender+"','"+age+"')";						
							db.query(ADD_TOURNAMENT_ENTRY, function(err,result){
								if(err){ console.log("Error is " + err)	}
								else {
									console.log("Draw has been created");							
								}						
							});	
						}	

						for(var j=round1+1; j<= round2; j++){
							roundNo = 'Round-2'; 
							var ADD_TOURNAMENT_ENTRY = "INSERT INTO draw(tournament_id, draw_no,round_no,match_no,gender,age) VALUES ('"+tournament_id+"' ,'"+round1+"','"+roundNo+"','"+j+"','"+gender+"','"+age+"')";								
							db.query(ADD_TOURNAMENT_ENTRY, function(err,result){
								if(err){ console.log("Error is " + err)	}
								else {
									console.log("Draw has been created");							
								}						
							});	
						}
						
						for(var k=round2+1; k<= round3; k++){
							roundNo = 'Round-3'; 
							var ADD_TOURNAMENT_ENTRY = "INSERT INTO draw(tournament_id, draw_no,round_no,match_no,gender,age) VALUES ('"+tournament_id+"' ,'"+round1+"','"+roundNo+"','"+k+"','"+gender+"','"+age+"')";								
							db.query(ADD_TOURNAMENT_ENTRY, function(err,result){
								if(err){ console.log("Error is " + err)	}
								else {
									console.log("Draw has been created");
									if(round3 > 0 && round4 == 0){
										console.log("Response Send");
										res.json({message :  "Draw has been created"});							
									}
								}						
							});	
						}										
						if(round4 > 0){
							for(var i=round3+1 ; i<= round4; i++){
								roundNo = 'Round-4'; 
								var ADD_TOURNAMENT_ENTRY = "INSERT INTO draw(tournament_id, draw_no,round_no,match_no,gender,age) VALUES ('"+tournament_id+"' ,'"+round1+"','"+roundNo+"','"+i+"','"+gender+"','"+age+"')";									
								db.query(ADD_TOURNAMENT_ENTRY, function(err,result){
									if(err){ console.log("Error is " + err)	}
									else {
										console.log("Draw has been created");	
										if(round4 > 0 && round5 == 0){						
											console.log("Response Send");
											res.json({message :  "Draw has been created"});
										}
									}						
								});	
							}		
						}

						if(round5 > 0){
							for(var i=round4+1 ; i<= round5; i++){
								roundNo = 'Round-5'; 
								var ADD_TOURNAMENT_ENTRY = "INSERT INTO draw(tournament_id, draw_no,round_no,match_no,gender,age) VALUES ('"+tournament_id+"' ,'"+round1+"','"+roundNo+"','"+i+"','"+gender+"','"+age+"')";									
								db.query(ADD_TOURNAMENT_ENTRY, function(err,result){
									if(err){ console.log("Error is " + err)	}
									else {
										console.log("Draw has been created");
										if(round5 > 0 && round6 ==0){
											console.log("Response Send");
											res.json({message :  "Draw has been created"});
										}							
									}						
								});	
							}		
						}
						if(round6 > 0){
							for(var i=round5+1 ; i<= round6; i++){
								roundNo = 'Round-6'; 
								var ADD_TOURNAMENT_ENTRY = "INSERT INTO draw(tournament_id, draw_no,round_no,match_no,gender,age) VALUES ('"+tournament_id+"' ,'"+round1+"','"+roundNo+"','"+i+"','"+gender+"','"+age+"')";									
								db.query(ADD_TOURNAMENT_ENTRY, function(err,result){
									if(err){ console.log("Error is " + err)	}
									else {
										console.log("Draw has been created");
										if(round6 > 0 && round7 == 0){
											console.log("Response Send");
											res.json({message :  "Draw has been created"});
										}								
									}						
								});	
							}		
						}
						if(round7 > 0){
							for(var i=round6+1 ; i<= round7; i++){
								roundNo = 'Round-7'; 
								var ADD_TOURNAMENT_ENTRY = "INSERT INTO draw(tournament_id, draw_no,round_no,match_no,gender,age) VALUES ('"+tournament_id+"' ,'"+round1+"','"+roundNo+"','"+i+"','"+gender+"','"+age+"')";									
								db.query(ADD_TOURNAMENT_ENTRY, function(err,result){
									if(err){ console.log("Error is " + err)	}
									else {
										console.log("Draw has been created");	
										if(round7 > 0 && round8 ==0){
											console.log("Response Send");
											res.json({message :  "Draw has been created"});
										}							
									}						
								});	
							}		
						}
						if(round8 > 0){
							for(var i=round7+1 ; i<= round8; i++){
								roundNo = 'Round-8'; 
								var ADD_TOURNAMENT_ENTRY = "INSERT INTO draw(tournament_id, draw_no,round_no,match_no,gender,age) VALUES ('"+tournament_id+"' ,'"+round1+"','"+roundNo+"','"+i+"','"+gender+"','"+age+"')";									
								db.query(ADD_TOURNAMENT_ENTRY, function(err,result){
									if(err){ console.log("Error is " + err)	}
									else {
										console.log("Draw has been created");	
										console.log("Response Send");
										res.json({message :  "Draw has been created"});						
									}						
								});	
							}		
						}
					}
				});																					
			}					
		});
	});

//----- Create a Draw -----
	app.post('/savePlayerinfo/',function(req,res){		
		if(req.method == "POST"){
			var post  = req.body;
			var gender = post.gender;
			var age = post.age;
			var tournament_id = post.tournamentId;
			var round_no = post.roundNo;
			var draw_no = post.drawno;
			var match_no = post.matchno;
			var reg_no1 = post.reg_no1;
			var reg_no2 = post.reg_no2;
			var player1_name = post.player1_name;
			var player2_name = post.player2_name;
			var courtno = post.courtno;
			var date = post.date;
			var time = post.time;
			var score11 = post.score11;
			var score12 = post.score12;
			var score13 = post.score13;
			var score14 = post.score14;
			var score15 = post.score15;
			var score21 = post.score21;
			var score22 = post.score22;
			var score23 = post.score23;
			var score24 = post.score24;
			var score25 = post.score25;
			var winnerValue = post.winner;

			var player1,player2,matchNo;

			if(winnerValue == '1'){
				var winner = player1_name;	
				var reg_no = reg_no1;					
				console.log("winner " + winner + " " + reg_no);
			} else if(winnerValue == '2'){
				var winner = player2_name;
				var reg_no = reg_no2;
				console.log("winner " + winner + " " + reg_no);
			} else {
				console.log("Winner Not Decided!");
			}			

			if(winner){				
				var winner_name = winner.split(' ');
				var first_name = winner_name[0];
				var last_name = winner_name[1];				

				var value = round_no.split('-');
				a = value[0]; b = value[1];
				var roundNum1 = +b + 1;
				var roundArray = [a,roundNum1];
				var roundNo = roundArray.join('-');

				if(match_no%2 != 0 ) {					
					matchNo = +match_no + +draw_no - ((+match_no-1)/2);
					console.log("Odd Match " + matchNo);
				} else {
					matchNo = +match_no + +draw_no-(+match_no/2);
					console.log("Even Match " + matchNo);
				}

				
				var FIND_MATCH_EXIST = "SELECT match_no FROM draw WHERE match_no = '"+matchNo+"' AND tournament_id='"+tournament_id+"' AND draw_no='"+draw_no+"' AND gender='"+gender+"' AND age='"+age+"'";				
				db.query(FIND_MATCH_EXIST, function(err, result){					
					if(result.length != 0){
						var FIND_RECORD = "SELECT winner, player1 FROM draw WHERE match_no = '"+matchNo+"' AND tournament_id='"+tournament_id+"' AND draw_no='"+draw_no+"' AND gender='"+gender+"' AND age='"+age+"'";				
						db.query(FIND_RECORD, function(err,result){
							if(err){ console.log(err)}
								else{																					
									if(match_no%2 == 0){																		
										var UPDATE_TOURNAMENT_ENTRY = "UPDATE draw SET player2 = '"+winner+"', reg_no2='"+reg_no2+"' WHERE match_no = '"+matchNo+"' AND tournament_id='"+tournament_id+"' AND draw_no='"+draw_no+"' AND gender='"+gender+"' AND age='"+age+"'";
										db.query(UPDATE_TOURNAMENT_ENTRY, function(err,result){
											if(err){console.log(err)}
												else{ console.log("Winner Added!")}
										});								
									} else if(match_no%2 != 0 ){										
										var UPDATE_TOURNAMENT_ENTRY = "UPDATE draw SET player1 = '"+winner+"', reg_no1='"+reg_no1+"' WHERE match_no = '"+matchNo+"' AND tournament_id='"+tournament_id+"' AND draw_no='"+draw_no+"' AND gender='"+gender+"' AND age='"+age+"'";
										db.query(UPDATE_TOURNAMENT_ENTRY, function(err,result){
											if(err){console.log(err)}
												else{ console.log("Winner Added!")}
										});		
									}
									var UPDATE_REGNO = "UPDATE draw SET reg_no='"+reg_no+"' WHERE tournament_id='"+tournament_id+"' AND round_no='"+round_no+"' AND match_no = '"+match_no+"' AND draw_no='"+draw_no+"' AND gender='"+gender+"' AND age='"+age+"'";									
									db.query(UPDATE_REGNO, function(err,result){
										if(err){ console.log(err)}
											else{ console.log("Reg No Updated!");}
									});
								}
						});
					}
				});					
			}
												
			var updateTournamentData  = "UPDATE draw SET reg_no1='"+reg_no1+"', reg_no2='"+reg_no2+"', player1 = '"+player1_name+"', player2='"+player2_name+"', court_no='"+courtno+"',match_date='"+date+"',match_time='"+time+"', set1_player1='"+score11+"', set2_player1='"+score12+"', set3_player1='"+score13+"', set4_player1='"+score14+"', set5_player1='"+score15 +"', set1_player2='"+score21 +"', set2_player2='"+score22 +"', set3_player2 ='"+score23 +"', set4_player2 ='"+score24 +"', set5_player2 ='"+score25 +"', reg_no='"+reg_no+"', winner='"+winner+"'  WHERE tournament_id='"+tournament_id+"' AND round_no='"+round_no+"' AND match_no = '"+match_no+"' AND draw_no='"+draw_no+"' AND gender='"+gender+"' AND age='"+age+"'";			
			db.query(updateTournamentData, function(err, rows){
		        if (err) {
					console.log("Problem with MySQL"+ err);
					res.json({message :  " Error is " + err  });
					return;		
				} else {
					res.json({message : " Player Succesfully updated!"});
					//res.redirect('/draw_list');
				}
			});		
			}
		});


app.post('/drawData', function(req,res){
	if(req.method == "POST"){
		var post  = req.body;
		var teams = post.teams;
		var score = post.results;
		console.log(teams);
		console.log(score);
	}
});

//---------- Delete a Draw-----------------
app.post('/deleteDraw', function(req,res){
	var gender = req.body.gender;
	var age = req.body.age;
	console.log(gender  +  " " + age) ;
	var DELETE_DRAW = "DELETE FROM draw WHERE gender='"+gender+"'AND age='"+age+"'";
	db.query(DELETE_DRAW, function(err,result){
		if(err){
			console.log(err);
		} else {
			console.log("Deleted!");
			res.json({message : " Draw Succesfully deleted!"});
		}
	});
});


app.get('/getDrawListDetails',function(req,res){
	var gender = req.query.gender;
	var age = req.query.age;

	var getSignListData = "SELECT * FROM draw WHERE gender='"+gender+"'AND age='"+age+"'";
	db.query(getSignListData, function(err,result){
		if(err){
			console.log(err);
		} else {
			//console.log(result);
			res.send(result);
		}
	})
});

app.get('/getTournamentData', function(req,res){
	var gender = req.query.gender;
	var age = req.query.age;

	var GET_TOURNAMENT_DATA = "SELECT * FROM tournament WHERE gender='"+gender+"'AND age='"+age+"'";
	db.query(GET_TOURNAMENT_DATA, function(err,result){
		if(err){
			console.log(err);
		} else {
			//console.log(result);
			res.send(result);
		}
	})
});

app.post('/createResult', function(req,res){	
	var gender = req.body.gender;
	var age = req.body.age;

	var GET_RESULT_DATA = "SELECT * FROM draw WHERE gender='"+gender+"'AND age='"+age+"'";
	db.query(GET_RESULT_DATA, function(err, result){
		if(err){
			console.log(err);
			res.send(err);
		} else {			
			for(var i=0; i<result.length; i++){				
				if(i+1 == result.length){
					res.json({message:"Result is created Succesfully!"});
				}

				var round_no = result[i].round_no;
				var winner_name = result[i].winner;					
				var reg_no = result[i].reg_no;																		

				var INSERT_RESULT = "INSERT into result(round_no,winner_name,reg_no,gender,age) VALUES('"+round_no+"','"+winner_name+"','"+reg_no+"','"+gender+"','"+age+"')";							
				db.query(INSERT_RESULT, function(err,result){
					if(err){
						console.log(err);						
					} else {						
						console.log("Result inserted!");      						
					}
				});								
			}			
		}
	});
});

app.post('/deleteResult', function(req,res){
	var gender = req.body.gender;
	var age = req.body.age;	
	var DELETE_DRAW = "DELETE FROM result WHERE gender='"+gender+"'AND age='"+age+"'";
	db.query(DELETE_DRAW, function(err,result){
		if(err){
			console.log(err);
		} else {
			console.log("Deleted!");
			res.json({message : " Result Succesfully deleted!"});
		}
	});
});

}
