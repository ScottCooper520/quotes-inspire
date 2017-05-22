// This is the main client-side app.

// Run the message method automatically
// showMessage("Message from app.js fuction");
function showMessage(msg) {
    $('#clientDivData').html(msg);
    // Get data from server and display in div
    this.getData();
}

// Function to get json data from the server
function getData() {
    $.ajax({
        type: 'GET',
        data: null,
        url: '/quotes',
        dataType: 'JSON'
    }).done((response) => {

        // Check for successful (blank) response
        if (response && response.length > 0) {
            // Update the div
            $('#clientDivData').append('</br>');
            for (var i = 0; i < response.length; i++) {
                $('#clientDivData').append(response[i].name + ": " + response[i].quote + '</br>');
            }
        }
        else {

            // If something goes wrong, alert the error message that our service returned
            alert('Error: No data');
        }
    });
}