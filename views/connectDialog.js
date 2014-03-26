App.Views.ConnectDialog = Backbone.View.extend({

    el: '#connectDialog',

    events: {
        "click #connectDialogButton":          "connect"
    },

    initialize: function() {

        this.listenTo(Backbone.Events, '_client:connecting', this.hide);
        this.listenTo(Backbone.Events, 'client:disconnect', this.show);
        this.listenTo(Backbone.Events, 'client:connect', this.joinedServer);
        this.listenTo(Backbone.Events, 'channel:join', this.loadChannel);

    },

    hide: function() {
        this.$el.hide();
    },

    show: function() {
        this.$el.show();
    },

    connect: function(e) {
        e.preventDefault();

        var serverAddress = $('#connectDialogAddress').val(),
            serverPort = $('#connectDialogPort').val(),
            username = $('#connectDialogUsername').val(),
            password = $('#connectDialogPassword').val(),
            remember = $('#connectDialogRemember').is(':checked');

        Backbone.Events.trigger('_loadmask:show');
        drekCastPlayer.connect(serverAddress, serverPort, username, password);

        if (remember) {
            var serverAddress = $('#connectDialogAddress').val(),
                serverPort = $('#connectDialogPort').val(),
                username = $('#connectDialogUsername').val(),
                password = $('#connectDialogPassword').val(),
                storeData = {
                    address: serverAddress,
                    port: serverPort,
                    username: username,
                    password: password
                };

            window.localStorage.setItem('drekcast-connect-player', JSON.stringify(storeData));

            Backbone.Events.trigger('_client::connectStored', storeData);
        }
    }

});
