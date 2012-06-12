/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 6/4/12
 * Time: 11:03 AM
 */

requirejs.config({

    paths:{
        jquery:'libs/jquery/jquery-1.7.2',
        'Backbone':'libs/backbone/backbone',
        'underscore':'libs/underscore/underscore',
        'text':'libs/require/text'
    },

    shim:{
        'underscore':{
            exports:'_'
        },
        'Backbone':{
            //These script dependencies should be loaded before loading
            //backbone.js
            deps:['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports:'Backbone'
        }
    }

});

require(['jquery', 'Backbone', 'views/EmployeeView', 'views/EmployeeListView', 'models/EmployeeCollection'],
    function ($, Backbone, EmployeeView, EmployeeListView, EmployeeCollection) {

        var Router = Backbone.Router.extend({

            routes:{
                "":"list",
                "employees/:id":"summary"
            },

            list:function () {
                this.list = new EmployeeCollection();
                var view = new EmployeeListView({model:this.list, el:".list"});
                this.list.fetch();
            },

            summary:function (id) {
                if (this.currentView) this.currentView.undelegateEvents();
                var employee = this.list.get(id);
                this.currentView = new EmployeeView({model:employee, el:'.summary'});
            }

        });

        var app = new Router();
        Backbone.history.start();
    });