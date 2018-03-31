/*The .js file set up connection to database-Mysql and several functions based on different 
mysql statement such as insert, delete, update, select etc for the use of front end when users
have different requests.*/

var mysql = require("mysql");
var connection = mysql.createConnection({
    "host": "localhost",
    "port": 3306,
    "user": "root",
    "password": "123123",
    "database": "csci3100"
 });


//insert new client records into database
function insert_client(name,photoid,email,pwd,desc){
    var in_client = "insert into client values ("+'\''+name+'\''+","+photoid+","+'\''+email+'\''+","+'\''+pwd+'\''+","+'\''+desc+'\''+")";
    connection.query(in_client, function(error, results) {
        if (error) {
            return console.error(error);
        }
        //console.log(results);
    });
}

//update the info. of a certain client
function update_client(name,photoid,email,pwd,desc){
    //whether change photoid?
	var up_client = "update client set email="+'\''+email+'\''+",password="+'\''+pwd+'\''+",description="+'\''+desc+'\''+"where username="+'\''+name+'\'';
	connection.query(up_client, function(error, results) {
    	if (error) {
        	return console.error(error);   
    	}
    	//console.log(results);
	});
    //return T or F
    //whether need to load a new updated page for user
}

//insert new article records into database
function insert_article(arID,arname,auname,tag,posttime,picNo,picstart,paraNo,parastart){
	//pictures for this article will be stored before and pass the startID and picture numbers 
	for(var i=0;i<picNo;i++){
		var index=picstart+i;
		var in_picture = "insert into pictures values ("+index+")";
		connection.query(in_picture, function(error, results) {
   			if (error) {
        		return console.error(error);   
    		}
    		//console.log(results);
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
}

//delete an article with the given articleID
function delete_article(arID){
	var de_article="delete from articles where articleID="+arID;
	connection.query(de_article, function(error, results) {
    	if (error) {
        	return console.error(error);   
    	}
    	console.log(results);   
	});

}

//insert a new comment
function insert_comment(coID,auname,content,arID){
	var in_comment = "insert into comments values ("+coID+","+'\''+auname+'\''+","+'\''+content+'\''+","+arID+")";
	connection.query(in_comment, function(error, results) {
    	if (error) {
        	return console.error(error);   
    	}
    	console.log(results);   
	});
    //return T or F

}

//delete a comment with the given commentID
function delete_comment(coID){
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
function select_article(arID){
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

function select_client_article(name,callback){
    var sel_client_article="select * from articles where authorname="+'\''+name+'\'';
    connection.query(sel_client_article, function(error, results) {
        if (error) {
            return console.error(error);
        }
        Object.keys(results).forEach(function(key){
            var row=results[key];
            return callback(row);

        });
    });
}
function select_client_comment(name,callback){
    var sel_client_comment="select * from comments c, articles a where c.authorname="+'\''+name+'\''+" and a.authorname="+'\''+name+'\''+" and c.articleID=a.articleID";
    connection.query(sel_client_comment, function(error, results) {
        if (error) {
            return console.error(error);
        }
        Object.keys(results).forEach(function(key){
            var row=results[key];
            return callback(row);

        });
    });
}

/*test.select_client_article(<name_parameter>,function(result){
	//process.stdout.write(result.articleID);
	process.stdout.write(result.articlename);
	process.stdout.write("  ");
	console.log(result.posttime);


    //console.log(result.content);

});*/
/*test.select_client_comment(<name_parameter>,function(result){
	//process.stdout.write(result.commentID);
	process.stdout.write(result.content);
	process.stdout.write("  ");
	console.log(result.articlename);


});*/


//select a list of article names based on the given tag for user to choose
function select_article_list(tag){
    var sel_article_list="select articlename,authorname from articles where tag="+'\''+tag+'\'';
    connection.query(sel_article_list, function(error, results) {
        if (error) {
            return console.error(error);   
        }
        console.log(results);   
    });
    //return the list of articles with articlenames and authornames

}

function select_user(name,callback){
    var sel_username="select username,photoid,email,password,description from client where username="+'\''+name+'\'';
    connection.query(sel_username, function(error, results) {
        if (error) {
            return console.error(error);
        }
        if(Object.keys(results).length===0){
            return callback(false);
        }
        //console.log(results.username);
        Object.keys(results).forEach(function(key){
            var row=results[key];
            return callback(row);

        });
    });
}
/*test.select_username('8',function(result){
    if(result==false){
        console.log("empty");
    }
    else{
        console.log(result.username);
        console.log(result.email);
    }

});*/

module.exports={
    connection:connection,
    insert_client:insert_client,
    update_client:update_client,
    insert_article:insert_article,
    delete_article:delete_article,
    insert_comment:insert_comment,
    delete_comment:delete_comment,
    select_article:select_article,
    //select_password:select_password,
    select_client_article:select_client_article,
    select_client_comment:select_client_comment,
    select_article_list:select_article_list,
    select_user: select_user
};