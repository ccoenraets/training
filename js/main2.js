// Add device ready

// Add network detection

db = window.openDatabase("EmployeeDB", "1.0", "Employee Demo DB", 200000);
var employeeDAO = new EmployeeDAO(db);
employeeDAO.populate(function() {
    employeeDAO.findAll(function(employees) {
        var l = employees.length;
        for (var i=0; i < l; i++) {
            var employee = employees[i];
            $('#list').append("<li><a href='#employees/" + employee.id + "'>" + employee.firstName + " " + employee.lastName + "</a></li>");
        }
    });
});

$('a').live('click', function(event) {
    employeeDAO.findById(1, function(employee) {
        var html =
            employee.firstName + " " + employee.lastName + "<br/>" +
            employee.title + "<br/>" +
            employee.cellPhone + "<br/>" +
            employee.email + "<br/>" +
            "<button>Tag with Location</button><br/>" +
            "<button>Add to Contacts</button><br/>" +
            "<button>Add Picture</button>";
        $('#details').html(html);
    });
});

Router = Backbone.Router.extend({

    routes: {
        ""              : "list",
        "employees/:id" : "details"
    },

    list: function() {
        this.list = new EmployeeCollection();
        var view = new EmployeeListView({model: this.list, el: ".list"});
        this.list.fetch();
    },

    details: function(id) {
        if (this.currentView) this.currentView.undelegateEvents();
        var employee = this.list.get(id);
        this.currentView = new EmployeeView({model: employee, el: '.details'});
    }
});
