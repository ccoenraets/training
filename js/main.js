db = window.openDatabase("EmployeeDB", "1.0", "Employee Demo DB", 200000);
var employeeDAO = new EmployeeDAO(db);
employeeDAO.populate(function() {
});

function routeURL() {
    if (window.location.hash) {
        showDetails(parseInt(window.location.hash.substr(1)));
    } else {
        showHome();
    }
}

function showHome() {
    if (!this.searchView) {
        var html =
            '<div class="search-bar"><input type="search" id="searchKey"/></div>' +
            '<ul id="list" class="tableview tableview-links"></ul>';
        this.searchView = $(html);
    }
    $('#content').html(this.searchView);
}

function showDetails(id) {
    employeeDAO.findById(id, function (employee) {
        var html =
            "<div class='details'>" +
            "<h1>" + employee.firstName + " " + employee.lastName + "</h1>" +
            employee.title + "<br/>" +
            employee.cellPhone + "<br/>" +
            employee.email + "<br/><br/>" +
            "Location: <span id='location'></span><br/><br/>" +
            "<img id='image' /><br/><br/>" +
            "<a href='#' id='addLocationBtn'>Tag with Location</a><br/><br/>" +
            "<a href='#' id='addContactBtn'>Add to Contacts</a><br/><br/>" +
            "<a href='#' id='addPictureBtn'>Add Picture</a>" +
            "</div>";
        this.detailsView = $(html);
        $('#content').html(this.detailsView);
    });
}

function findByName() {
    $('#list').empty();
    employeeDAO.findByName($('#searchKey').val(), function(employees) {
        var l = employees.length;
        for (var i=0; i < l; i++) {
            var employee = employees[i];
            var html = "<li><a href='#" + employee.id + "'>" +
                        employee.firstName + " " + employee.lastName + "<br/>" +
                        employee.title + "</a></li>";
            $('#list').append(html);
        }
    });
}

function addLocation() {
    alert('Add Location');
    navigator.geolocation.getCurrentPosition(
        function(position) {
            $('#location').html(position.coords.latitude + ' ' +position.coords.longitude);
        },
        function(error) {
            alert('Error getting location');
        });
    return false;
}

function addContact() {
    alert('Add Contact');
    var contact = navigator.contacts.create();
    contact.name = {givenName: $('#firstName').val(), familyName:  $('#lastName').val()};
    var phoneNumbers = [];
    phoneNumbers[0] = new ContactField('work', $('#workPhone').val(), false);
    phoneNumbers[1] = new ContactField('mobile', $('#mobilePhone').val(), true); // preferred number
    contact.phoneNumbers = phoneNumbers;
    contact.save();
    return false;
}

function addPicture() {
    alert('Add Picture');
    var options =   {   quality: 50,
                        destinationType: Camera.DestinationType.DATA_URL,
                        sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
                        encodingType: 0     // 0=JPG 1=PNG
                    };

    navigator.camera.getPicture(
        function(imageData) {
            $('#image').attr('src', "data:image/jpeg;base64," + imageData);
        },
        function(error) {
            alert('Error taking picture');
        },
        options);

    return false;
}

$(window).on('hashchange', routeURL);

$(document).on('keyup', '#searchKey', findByName);
$(document).on('click', '#addLocationBtn', addLocation);
$(document).on('click', '#addContactBtn', addContact);
$(document).on('click', '#addPictureBtn', addPicture);

routeURL();