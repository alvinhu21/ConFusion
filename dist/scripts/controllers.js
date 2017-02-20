'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            $scope.showMenu = false;
            $scope.message = "Loading ...";
			menuFactory.getDishes().query(
			function(response) {
				$scope.dishes = response;
				$scope.showMenu = true;
			},
			function(response) {
				$scope.message = "Error: "+response.status + " " + response.statusText;
			});
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

		.controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope,feedbackFactory){
            $scope.feedback = {};
            $scope.sendFeedback = function() {
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    $scope.feedback.mychannel="";
					feedbackFactory.sendFeedback().save($scope.feedback);
					$scope.feedbackForm.$setPristine();
					$scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
            $scope.showDish = false;
            $scope.message="Loading ...";
			$scope.dish = menuFactory.getDishes().get({id:0}).$promise.then(
				function(response){
					$scope.dish = response;
					$scope.showDish = true;
				},
				function(response) {
					$scope.message = "Error: "+response.status + " " + response.statusText;
				}
            );
        }])

        .controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory) {
            
            $scope.comment = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
				$scope.comment.date = new Date().toISOString();
                console.log($scope.comment);
				$scope.dish.comments.push($scope.comment);

                menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
				$scope.commentForm.$setPristine();
				$scope.comment = {rating:5, comment:"", author:"", date:""};
            };
        }])
		.controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory){
			$scope.showLeaders = false;
			$scope.message="";
			$scope.LeaderList = corporateFactory.getLeaders().query()
			.$promise.then(
				function(response){
					$scope.LeaderList = response;
					$scope.showLeaders = true;
				},
				function(response) {
					$scope.message = "Error: "+response.status + " " + response.statusText;
				}
			);
		}])

        // implement the IndexController and About Controller here
		.controller('IndexController', ['$scope', 'corporateFactory', 'menuFactory', function($scope,corporateFactory,menuFactory){
			$scope.showDish = false;
			$scope.showPromotion = false;
			$scope.showLeader = false;
			$scope.message="Loading ...";
			$scope.message_promotion="Loading ...";
			$scope.message_leader="Loading ...";
			$scope.dish = menuFactory.getDishes().get({id:0})
			.$promise.then(
				function(response){
					$scope.dish = response;
					$scope.showDish = true;
				},
				function(response) {
					$scope.message = "Error: "+response.status + " " + response.statusText;
				}
			);
			$scope.Promotion = menuFactory.getPromotions().get({id:0})
			.$promise.then(
				function(response){
					$scope.Promotion = response;
					$scope.showPromotion = true;
				},
				function(response) {
					$scope.message_promotion = "Error: "+response.status + " " + response.statusText;
				}
			);
			$scope.featuredLeader = corporateFactory.getLeaders().get({id:3}).$promise.then(
				function(response){
					$scope.featuredLeader = response;
					$scope.showLeader = true;
				},
				function(response) {
					$scope.message_leader = "Error: "+response.status + " " + response.statusText;
				}
			);
		}]);



