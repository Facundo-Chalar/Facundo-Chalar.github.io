angular.module('comics').service('comics').service('UserService',function($localStorage,$filter,$cookies,AuthenticationService,SessionService){
		
        this.userList=[];

        this.addUser=function(user){
          this.userList=angular.fromJson($localStorage.userList);
            if(angular.isUndefined(this.userList)){
                this.newList=[];
                this.newList.push(user);
                $localStorage.userList=angular.toJson(this.newList);
                alert('userAdded');
            }else{
              this.userList.push(user);
              $localStorage.userList=angular.toJson(this.userList);
            }
        };

        this.userExists=function(username){
          return this.findUser(username)!==null?true:false;
        };

       this.getAll=function(){
          this.allUsers=angular.isUndefined($localStorage.userList)?[]:$localStorage.userList;
          return angular.fromJson(this.allUsers);
        };

        this.findUser=function(userName){
          var filtered = $filter('filter')(this.getAll(), { nickName: userName },true);
          var user = filtered.length ? filtered[0] : null;
          return user;
        };

       this.checkLogin=function(nickname,password){
          var user=this.findUser(nickname);

              if (user !== null && user.password === password) {
                response = { success: true,message:'Login Ok' };
				var today = new Date();
				var expired = new Date(today);
				expired.setDate(today.getDate() + 1); 
				$cookies.put('user', user.nickName, {expires : expired });
				AuthenticationService.login(user);
              } else {
                response = { success: false, message: 'Username or password is incorrect' };
              }
              alert(response.message);
            // callback(response);
        };
		
		
		
		this.loginAdmin = function() {
      // this should be replaced with a call to your API for user verification (or you could also do it in the service)    
		AuthenticationService.login({name: 'Admin', role: 'admin'});
    };
		
});
