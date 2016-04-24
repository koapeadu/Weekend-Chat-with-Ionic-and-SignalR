angular.module('starter.controllers', ['roy.signalr-hub', 'starter.services'])

.controller('DashCtrl', function ($scope) { })

.controller('ChatsCtrl', function ($scope, $http, myHub) {
    $scope.chats = [];
    $scope.message = '';
    // Fetch all chats from server
    $http.get("http://localhost:11251/api/Chats").success(function (response) {
        $scope.chats = response;
        console.log("AllChats:", JSON.stringify($scope.chats));
    }, function (error) {
        $q.reject(error.data.Message);
        $scope.error = "Failed to load chats";
        console.log("AllChats:", "Request failed: " + error.data.Message);
    });
    // Remove chat event handler
    $scope.remove = function (chat) {
        $http.delete("http://localhost:11251/api/Chats/" + chat.Id).success(function (response) {
            $scope.chats.splice($scope.chats.indexOf(chat), 1);
            console.log("ChatDeleted:", JSON.stringify(chat));
        }, function (error) {
            $q.reject(error.data.Message);
        });
    }
    // Send message event handler
    $scope.send = function (message) {
        /*$http.post("http://localhost:11251/api/Chats",
            { sender: localStorage.getItem('Username'), receiver: "Tous", message: message })
            .success(function (response) {
                $scope.message = '';
            });*/
        myHub.invoke('Send', localStorage.getItem('Username'), "Tous", message );
    }
    // SignalR callbacks
    $scope.$on('hub:signalRNotification', function (ev, data) {
        console.log("SignalRNotification", data);
        switch (data.NotificationType) {
            case "MESSAGE_RECEIVED":
                $scope.chats.push(data.data);
                break;
            case "MESSAGE_SENT":
                $scope.chats.push(data.data);
                $scope.message = '';
                break;
            default:
                console.log("SignalR", "Undefined client callback");
        }
    });
})

.controller('ChatsController', function ($scope, $rootScope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
        Chats.remove(chat);
    };
    //if (typeof $scope.chats === "undefined") {
    //    $scope.chats = [];
    //}

    //$scope.$on('$ionicView.enter', function (e) {
    //    //// Connect to SignalR hub
    //    //connection = jQuery.hubConnection();
    //    //this.proxy = connection.createHubProxy('KanbanBoard');

    //    //// Listen to the 'BoardUpdated' event that will be pushed from SignalR server
    //    //this.proxy.on('BoardUpdated', function () {
    //    //    $rootScope.$emit("refreshBoard");
    //    //});

    //    //// Connecting to SignalR server        
    //    //return connection.start()
    //    //.then(function (connectionObj) {
    //    //    return connectionObj;
    //    //}, function (error) {
    //    //    return error.message;
    //    //});

    //    //$scope.comeOnline = function () {
    //    //    SignalRSvc.comeOnline();
    //    //}

    //    updateChats = function (chat) {
    //        $scope.chats.push(chat);
    //    }

    //    cameOnline = function (chat) {

    //    }

    //    SignalRSvc.initialize();

    //    //Updating greeting message after receiving a message through the event

    //    $scope.$parent.$on("cameOnline", function (e, chat) {
    //        $scope.$apply(function () {
    //            cameOnline(chat)
    //        });
    //    });

    //    $scope.$parent.$on("messageReceived", function (e, chat) {
    //        $scope.$apply(function () {
    //            updateChats(chat);
    //        });
    //    });



    //});
})

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function ($scope) {
    $scope.settings = {
        enableFriends: true,
        username: localStorage.getItem('Username')
    };
    $scope.changeUsername = function () {
        localStorage.setItem('Username', $scope.settings.username);
        console.log("UsernameChange:", $scope.settings.username);
    }
});
