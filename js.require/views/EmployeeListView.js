/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 6/12/12
 * Time: 1:39 PM
 */

define(['jquery', 'Backbone', './EmployeeListItemView'], function ($, Backbone, EmployeeListItemView) {

    var EmployeeListView = Backbone.View.extend({

        initialize:function () {
            this.render();
            this.model.on("reset", this.render, this);
        },

        render:function () {
            _.each(this.model.models, function (employee) {
                $(this.el).append(new EmployeeListItemView({model:employee}).el);
            }, this);
        }

    });

    return EmployeeListView;
});