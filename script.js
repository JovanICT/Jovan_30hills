var users = new Array();
var userCurrentFriendsArray;

$(document).ready(function(){

	var serviceUrl = "./data.json";
	
	
	//show users
	show_users(serviceUrl);
});

var show_users = function(serviceUrl){
	var jqxhr = $.getJSON( serviceUrl, function() {

		})
		  .done(function(data) {
		    if(data.length > 0){
			    
			    data.forEach(function(user){
				   
					    users.push(user);
					    
					    $("#users_list").append("" +
					    	"<li class='li_user'>" + user.firstName + " " + user.surname +  "<input type='hidden' value='" + user.id + "'/></li>" +
					    "");
					    
					    
				    
				    
				});
				
				
		    }
			
		  })
		  .fail(function() {
		    alert( "error" );
		  })
		  .always(function() {
		   
		   $(".li_user").click(function(){
				$(".li_user").removeClass("user_selected");
			    $(this).addClass("user_selected");
			    $("#direct_friend_list").empty();
				$("#friends_of_friends_list").empty();
				$("#sugested_friends_list").empty();
			    var idUser = $(this).find("input").val();
			    show_friends(idUser);
			});
	
		   
		});
};

//friends function
var show_friends = function(idUser){
	var userCurrent = null;
	userCurrentFriendsArray = null;
	
	var friendsOfFriendsArrayID = new Array();
	var sugestedFriendsArrayID = new Array();
	
	 users.forEach(function(user){
		if(user.id == idUser){
			userCurrent = user;
		}
	 });
	 
	 if(userCurrent != null){
		
		userCurrentFriendsArray = usersByIDarray(userCurrent.friends);
		print_user_list(userCurrentFriendsArray, "#direct_friend_list");
		
	 }
	 
	 
	 userCurrentFriendsArray.forEach(function(user){
		user.friends.forEach(function(friendID){
			if(friendID != idUser){
				//not already in array
				if($.inArray( friendID, userCurrent.friends ) < 0){
				//already in array
					if($.inArray( friendID, friendsOfFriendsArrayID ) >= 0){
						//not already in array
						if($.inArray( friendID, sugestedFriendsArrayID ) < 0){
							sugestedFriendsArrayID.push(friendID);
						}
					}
					else{
						friendsOfFriendsArrayID.push(friendID);
					}
				}
			}
		});
	});
	
	var friendsOfFriendsArray = usersByIDarray(friendsOfFriendsArrayID);
	print_user_list(friendsOfFriendsArray, "#friends_of_friends_list");
	var sugestedFriendsArray = usersByIDarray(sugestedFriendsArrayID);
	print_user_list(sugestedFriendsArray, "#sugested_friends_list");
};




	
	
//return users by idArray
var usersByIDarray = function(idUserArray){
	var userArray = new Array();
	idUserArray.forEach(function(friendID){
		users.forEach(function(user){
			if(user.id == friendID){
				userArray.push(user);
			}
		 });
	});
	
	return userArray;
};

//print list of users
var print_user_list = function(usersToPrint, divID){
	usersToPrint.forEach(function(user){
				   
				$(divID).append("" +
					"<li class='li_user_freind'>" + user.firstName + " " + user.surname +  "</li>" +
				"");
				
		});
};
	
	