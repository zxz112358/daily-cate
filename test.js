/*The .js file set up connection to database-Mysql and several functions based on different 
mysql statement such as insert, delete, update, select etc for the use of front end when users
have different requests.*/

var mysql = require("mysql");
var connection = mysql.createConnection({
    "host": "localhost",
    "port": 3306,
    "user": "root",
    "password": "muzi6771914",
    "database": "csci3100"
 });


//insert new client records into database
var insert_client=function(name,email,pwd,desc){
	var in_client = "insert into client values ("+'\''+name+'\''+","+'\''+email+'\''+","+'\''+pwd+'\''+","+'\''+desc+'\''+")";
	connection.query(in_client, function(error, results) {
    	if (error) {
        	return console.error(error);   
    	}
    	console.log(results);   
	});
    //return T or F
};
/*
function delete_client(name,email,pwd,desc){
	var de_client = "delete from client where username="+'\''+name+'\'';
};*/

//update the info. of a certain client
var update_client=function (name,email,pwd,desc){
	var up_client = "update client set email="+'\''+email+'\''+",password="+'\''+pwd+'\''+",description="+'\''+desc+'\''+"where username="+'\''+name+'\'';
	connection.query(up_client, function(error, results) {
    	if (error) {
        	return console.error(error);   
    	}
    	console.log(results);   
	});
    //return T or F
    //whether need to load a new updated page for user
};

//insert new article records into database
var insert_article=function (arID,arname,auname,tag,posttime,picNo,picstart,paraNo,parastart){
	//pictures for this article will be stored before and pass the startID and picture numbers 
	for(var i=0;i<picNo;i++){
		var index=picstart+i;
		var in_picture = "insert into pictures values ("+index+")";
		connection.query(in_picture, function(error, results) {
   			if (error) {
        		return console.error(error);   
    		}
    		console.log(results);   
		});
	}
	//paragraphs for this article will be stored before and pass the startID and paragraph numbers 
	for(var i=0;i<paraNo;i++){
		var index=parastart+i;
		var in_paragraph = "insert into paragraphs values ("+index+")";
		connection.query(in_paragraph, function(error, results) {
   			if (error) {
        		return console.error(error);   
    		}
    		console.log(results);   
		});
	}
	//insert new article to the database
	var in_article = "insert into articles values ("+arID+","+'\''+arname+'\''+","+'\''+auname+'\''+","+'\''+tag+'\''+","+'\''+posttime+'\''+","+picNo+","+picstart+","+paraNo+","+parastart+")";
	connection.query(in_article, function(error, results) {
    	if (error) {
        	return console.error(error);   
    	}
    	console.log(results);   
	});
    //return T or F
};

//delete an article with the given articleID
var delete_article=function (arID){
	var de_article="delete from articles where articleID="+arID;
	connection.query(de_article, function(error, results) {
    	if (error) {
        	return console.error(error);   
    	}
    	console.log(results);   
	});
	connection.end();
    //return T or F

}

//insert a new comment
var insert_comment=function (coID,auname,content,arID){
	var in_comment = "insert into comments values ("+coID+","+'\''+auname+'\''+","+'\''+content+'\''+","+arID+")";
	connection.query(in_comment, function(error, results) {
    	if (error) {
        	return console.error(error);   
    	}
    	console.log(results);   
	});
    //return T or F

};

//delete a comment with the given commentID
var delete_comment=function (coID){
	var de_comment="delete from comments where commentID="+coID;
	connection.query(de_comment, function(error, results) {
    	if (error) {
        	return console.error(error);   
    	}
    	console.log(results);   
	});
    //return T or F
}


//select a particular article given articleID
var select_article=function (arID){
	var sel_article="select articlename,authorname,parastart,parano,picturestart,pictureno from articles where articleID="+arID;
	connection.query(sel_article, function(error, results) {
    	if (error) {
        	return console.error(error);   
    	}
    	console.log(results);   
	});

	//return all the picture and paragraph files stored before for this article
	//for loop to open the files
    //how to get the variables parastart, parano,picstart,picno
    //return all pictures, paragrahs and comments of this article
}

//check the correctness of user input password
var select_password=function (name){
    var sel_password="select password from client where username="+'\''+name+'\'';
    connection.query(sel_password, function(error, results) {
        if (error) {
            return console.error(error);   
        }
        console.log(results);   
    });
    //return password to check the correctness of user input password
}

//get all info of a specific user, includes all articles and personal info.
var select_client_info=function (name){
    var sel_client_info="select * from client c, articles a,comments o where c.username="+'\''+name+'\''+" and a.authorname="+'\''+name+'\''+" and o.authorname="+'\''+name+'\'';
    connection.query(sel_client_info, function(error, results) {
        if (error) {
            return console.error(error);   
        }
        console.log(results);   
    });
    //how to get a.parastart, a.parano, a.picstart, a.picno
    //based on the variables to return all the pictures and paragraphs of all articles of the author
    //return all comments the author posted
}

//select a list of article names based on the given tag for user to choose
var select_article_list=function (tag){
    var sel_article_list="select articlename,authorname from articles where tag="+'\''+tag+'\'';
    connection.query(sel_article_list, function(error, results) {
        if (error) {
            return console.error(error);   
        }
        console.log(results);   
    });
    //return the list of articles with articlenames and authornames

}

module.exports={
	connection:connection,
    insert_client:insert_client,
    update_client:update_client,
    insert_article:insert_article,
    delete_article:delete_article,
    insert_comment:insert_comment,
    delete_comment:delete_comment,
    select_article:select_article,
    select_password:select_password,
    select_client_info:select_client_info,
    select_article_list:select_article_list
};
//connection.end();



