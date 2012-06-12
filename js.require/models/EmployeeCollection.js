/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 6/12/12
 * Time: 1:35 PM
 */

define(['Backbone', 'models/Employee'], function (Backbone, Employee) {

    var EmployeeCollection = Backbone.Collection.extend({

        url:"api/employees",

        model:Employee

    });

    return EmployeeCollection;
});