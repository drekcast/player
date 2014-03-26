App.Views.WebcamScreen = App.Views.BaseScreen.extend({

    className: 'screen webcam',

    render: function() {
        this.el.innerHTML = 'webcam';
        return this;
    },

    _preShow: function(options, callback, scope) {
        callback.call(scope);
    },

    _postShow: function() {

    }

});