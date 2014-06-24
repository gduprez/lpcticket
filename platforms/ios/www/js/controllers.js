angular.module('starter.controllers', ['LocalStorageModule'])
.config(['localStorageServiceProvider', function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('LPC');
}])

.controller('DashCtrl', function($scope, localStorageService) {

	$scope.email = localStorageService.get('owner');
	
})

.controller('FriendsCtrl', function($scope, localStorageService) {
	var currentPj = localStorageService.get('currentProjectId');
	if(currentPj != "")
	{
  		$scope.friends = localStorageService.get(currentPj);
	}
})

.controller('FriendDetailCtrl', function($scope, $stateParams, localStorageService) {
  //$scope.friend = Friends.get($stateParams.friendId);

  	var currentPj = localStorageService.get('currentProjectId');
  	$scope.friend = {};

	if(currentPj != "")
	{
  		$scope.friends = localStorageService.get(currentPj);
  		
  		if($scope.friends){
  			for(i=0; i< $scope.friends.length; i++){
  				if($scope.friends[i].Numero == $stateParams.friendId){
  					$scope.friend = $scope.friends[i];
  				}
  			}

  		}

  		//$scope.friend = _.find($scope.friends,function(rw){ return rw.Numero == $stateParams.fiendId });
  		console.log('Friend= ' + $scope.friend);
	}

})

.controller('ConfigureCtrl',function($scope,localStorageService,Projects ) {


	$scope.userData = {};
    $scope.userData.email=localStorageService.get('owner');
    $scope.userData.loggedIn = localStorageService.get('loggedIn') == 'true';
    $scope.userData.projects = [];
    $scope.userData.currentProject = 'NOVIP';
    if($scope.userData.loggedIn == true){
		//$scope.userData.projects = Projects.all($scope.userData.email);
		Projects.all($scope.userData.email).then(function(data){$scope.userData.projects = data;},function(error){console.log('error');});
    }

	$scope.login = function(){
		console.log("local : " + localStorageService.add('owner',$scope.userData.email));
		console.log("local : " + localStorageService.add('loggedIn','true'));
		$scope.userData.loggedIn = true;

		//Load project list

	}
	$scope.logoff = function(){
		localStorageService.add('owner','');
		localStorageService.add('loggedIn','false');

    	$scope.userData.email='';
		$scope.userData.loggedIn = false;
	}

	$scope.setCurrentProject = function(pj){
		console.log('setCurrentProject:' + pj);
		localStorageService.add('currentProjectId', pj);
		Projects.get($scope.userData.email, pj).then(function(data){localStorageService.add(pj,data);},function(error){console.log('error');});

		//userData.currentProject = pj;


	}

	$scope.getProjectList = function(){
		//alert(Projects);
		//$scope.userData.projects = Projects.all($scope.userData.email);
		/*Projects.list().then(function(data){
			console.log('SUCCESS IN getProjectList');

			$scope.userData.projects = data;
		},
		function(error){
			console.log('ERROR IN getProjectList');
		});
		*/
	}




})

.controller('ScannerCtrl', function($scope,localStorageService){

	$scope.friend = {};

	var currentPj = localStorageService.get('currentProjectId');
	if(currentPj != "")
	{
  		$scope.friends = localStorageService.get(currentPj);
	}


	$scope.success = function(resultArray) {
		//alert("Scanned " + resultArray[0] + " code: " + resultArray[1]);
    	if($scope.friends){
  			for(i=0; i< $scope.friends.length; i++){
  				if($scope.friends[i].Numero == resultArray[0]){
  					$scope.friend = $scope.friends[i];
  				}
  			}
  		}
		$scope.$digest();
	}

	$scope.failure = function(error) {
		$scope.friend = {};
	}

	$scope.scan = function() {
		console.log('scan()');
		cordova.exec($scope.success, $scope.failure, "ScanditSDK", "scan", ["/Zh/IsSREeOfGoSxbcyR2jBKJOj445UAR/vlxSKOmxs",{"beep": true, "1DScanning" : true, "2DScanning" : true}]);
	}

	
	$scope.scan();

});