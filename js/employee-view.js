EmployeeView = Backbone.View.extend({

    template: _.template($('#employee-tpl').html()),

    initialize: function () {
        this.render();
    },

    events: {
        "click .save": "save"
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
    },

    save: function () {
        this.model.save({firstName: $('#firstName').val(), lastName: $('#lastName').val()});
    }

});