/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 6/12/12
 * Time: 1:40 PM
 */

define(['jquery', 'Backbone', 'text!views/EmployeeListItemView.tpl!strip'],
    function ($, Backbone, EmployeeListItemViewTemplate) {

        var EmployeeListItemView = Backbone.View.extend({

            tagName:"li",

            template:_.template(EmployeeListItemViewTemplate),

            initialize:function () {
                this.render();
                this.model.on("change", this.render, this);
            },

            render:function () {
                $(this.el).html(this.template(this.model.toJSON()));
            }

        });

        return EmployeeListItemView;
    });