App.Views.ClockScreen = App.Views.BaseScreen.extend({

    className: 'screen clock',

    render: function() {
        this.el.innerHTML = '00:00:00';
        return this;
    },

    _preShow: function(options, callback, scope) {
        callback.call(scope);
    },

    _postShow: function() {

    }

});