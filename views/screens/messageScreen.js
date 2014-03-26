App.Views.MessageScreen = App.Views.BaseScreen.extend({

    className: 'screen message',

    render: function() {
        this.el.innerHTML = 'message';
        return this;
    },

    _preShow: function(options, callback, scope) {
        callback.call(scope);
    },

    _postShow: function() {

    }

});