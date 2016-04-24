angular.module('starter.services', ['roy.signalr-hub'])

.factory('Chats', function () {
    // Might use a resource here that returns a JSON array
    //var chats = [];
    // Some fake testing data
    var chats = [{
        id: 0,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'img/ben.png'
    }, {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'img/max.png'
    }, {
        id: 2,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'img/adam.jpg'
    }, {
        id: 3,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: 'img/perry.png'
    }, {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'img/mike.png'
    }];

    return {
        all: function () {
            return chats;
            // fetch all chats from server
            //$http.get("http://10.11.73.235:11251/api/Chats").then(function (response) {
            //    chats = response.data;
            //    console.log("AllChats", JSON.stringify(chats));
            //    return response.data;
            //}, function (error) {
            //    return $q.reject(error.data.Message);
            //});
        },
        remove: function (chat) {
            chats.splice(chats.indexOf(chat), 1);
        },
        get: function (chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        }
    };
})

//.factory('Initialize', function () {
//    connection = jQuery.hubConnection();
//    this.proxy = connection.createHubProxy('KanbanBoard');

//    // Listen to the 'BoardUpdated' event that will be pushed from SignalR server
//    this.proxy.on('BoardUpdated', function () {
//        $rootScope.$emit("refreshBoard");
//    });

//    // Connecting to SignalR server        
//    return connection.start()
//    .then(function (connectionObj) {
//        return connectionObj;
//    }, function (error) {
//        return error.message;
//    });

//})
.factory('myHub', function (hubFactory) {
    //Set the hubs URL for the connection
    $.connection.hub.url = "http://localhost:11251/signalr";

    var myOwnHub = $.hubConnection("http://localhost:11251/signalr", { useDefaultPath: false});
    myHub = hubFactory('chatHubMobile', {
        hub: myOwnHub,
        logging: true,
        clientEvents: ['signalRNotification']
    });

    myHub.stateChanged(function (state) {
        switch (state.newState) {
            case $.signalR.connectionState.connecting:
                console.log("SignalR: Attempting to connect to Hub");
                break;
            case $.signalR.connectionState.connected:
                console.log("SignalR: Successfully connnected to Hub");
                break;
            case $.signalR.connectionState.reconnecting:
                console.log("SignalR: Reattempting to connect to Hub");
                break;
            case $.signalR.connectionState.disconnected:
                console.log("SignalR: Connection to Hub dropped");
                break;
        }
    });

    myHub.error(function (error) {
        console.log('SignalR error: ' + error);
    });    

    return myHub;
})

.factory('SignalRSvc1', function ($, $rootScope) {
    //var proxy = null;
    //console.log("Hello here");
    //var initialize = function () {
    //    //Getting the connection object
    //    connection = $.hubConnection();

    //    //Creating proxy
    //    this.proxy = connection.createHubProxy('chatHubMobile');

    //    //Starting connection
    //    connection.start().done(function () {
    //        //this.proxy.invoke('comeOnline', $rootScope.userName);
    //    });

    //    //Publishing an event when server pushes a greeting message
    //    this.proxy.on('receiveMessage', function (chat) {
    //        $rootScope.$emit("messageReceived", chat);
    //    });

    //    this.proxy.on('messageSent', function (chat) {
    //        $rootScope.$emit("messageSent", chat);
    //    });

    //    this.proxy.on('hereIsYourId', function (id) {
    //        window.localStorage.setItem("UserId", id);
    //    });

    //    this.proxy.on('cameOnline', function (chat) {
    //        $rootScope.$emit("cameOnline", chat);
    //    });
    //};

    //var comeOnline = function (chat) {
    //    //Invoking greetAll method defined in hub
    //    this.proxy.invoke('comeOnline', chat);
    //};

    //return {
    //    initialize: initialize,
    //    comeOnline: comeOnline
    //};
});
