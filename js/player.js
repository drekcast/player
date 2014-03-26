$(function() {

    $('#connectDialogButton').on('click', function() {
        // Validate input


        $('#connectDialog').fadeOut();
        $('body').removeClass('loading');

        var address = $('#connectDialogAddress').val(),
            port = $('#connectDialogPort').val(),
            username = $('#connectDialogUsername').val(),
            password = $('#connectDialogPassword').val(),
            remember = $('#connectDialogRemember').is(':checked');

        window.drekCastClient = new DrekCastClient({
            serverAddress: 'http://'+address+':'+port,
            channel: 'drekcast-test'
        });
        window.drekCastClient.connect();
        window.drekCastClient.on('all', function(message, data) {
            console.log(message, data);
        });

        Pace.restart();
    });



})