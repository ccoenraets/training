/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 6/4/12
 * Time: 12:18 PM
 */

define(['jquery', 'Backbone', 'text!views/EmployeeView.tpl!strip'],
    function ($, Backbone, EmployeeViewTemplate) {

        var EmployeeView = Backbone.View.extend({

            template:_.template(EmployeeViewTemplate),

            initialize:function () {
                this.render();
            },

            events:{
                "click .save":"save"
            },

            render:function () {
                $(this.el).html(this.template(this.model.toJSON()));
            },

            save:function () {
                this.model.save({firstName:$('#firstName').val(), lastName:$('#lastName').val()});
            }

        });

        return EmployeeView;
    });