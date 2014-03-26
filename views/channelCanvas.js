App.Views.ChannelCanvas = Backbone.View.extend({

    el: '#canvas',

    screens: {},
    currentScreen: undefined,

    initialize: function() {

        this.listenTo(Backbone.Events, 'channel:join', this.onChannelJoined);
        this.listenTo(Backbone.Events, 'client:disconnect', this.onClientDisconnected);
        this.listenTo(Backbone.Events, 'channel:screen', this.onChannelScreenChanged);

        this.hide();

    },

    onChannelJoined: function(data) {

        if (data.channel) {

            this.channel = data.channel;

            this.render();

            this.loadScreen(data.channel.activeScreen, {}); // TODO: Get active options

            this.show();

            Backbone.Events.trigger('_loadmask:hide');
        }
    },

    onClientDisconnected: function() {
        this.hide();
    },

    onChannelScreenChanged: function(data) {
        this.loadScreen(data.screen, data.options);
    },

    loadScreen: function(screenName, screenOptions, callback) {

        if (!this.screens[screenName]) {
            this.renderScreen(screenName);
        }

        var nextScreen = this.screens[screenName];

        if (nextScreen == this.currentScreen) {
            return;
        }

        nextScreen.preShow(screenOptions, function() {

            nextScreen.show();

            if (this.currentScreen) {
                this.currentScreen.hide();
                this.currentScreen.postShow();
            }

            this.currentScreen = nextScreen;

        }, this);
    },

    renderScreen: function(screenName) {
        var className = screenName.charAt(0).toUpperCase() + screenName.slice(1) + 'Screen',
            constructor = App.Views[className]
            ;
        if (!constructor) {
            console.error('Screen "'+screenName+'" not found');
            return;
        }
        var screen = new constructor();
        this.screens[screenName] = screen;
        this.$el.append(screen.render().el);
    },

    show: function() {
        this.$el.fadeIn();
        return this;
    },

    hide: function() {
        this.$el.hide();
        return this;
    }

});
