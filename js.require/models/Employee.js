/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 6/12/12
 * Time: 1:36 PM
 */

define(['Backbone'], function (Backbone) {

    var Employee = Backbone.Model.extend({
        urlRoot:"api/employees"
    });

    return Employee;
});