EmployeeListView = Backbone.View.extend({

    initialize: function () {
        this.render();
        this.model.on("reset", this.render, this);
    },

    render: function () {
        _.each(this.model.models, function(employee){
            $(this.el).append(new EmployeeListItemView({model: employee}).el);
        }, this);
    }

});

EmployeeListItemView = Backbone.View.extend({

    tagName: "li",

    template: _.template($('#employee-list-item-tpl').html()),

    initialize: function () {
        this.render();
        this.model.on("change", this.render, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
    }

});