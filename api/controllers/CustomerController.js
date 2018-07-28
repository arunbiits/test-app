/**
 * CustomerController
 *
 * @description :: Server-side logic for managing customers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    /**
     * code to get the add new customer page i.e, new.ejs
     */
    'new' : function(req,res){
        res.view();
    },

    /**
     * This is the code to create a new customer
     */
    create : function(req,res,next){
        Customer.create(req.params.all(),function customerCreated(err,customer){
            if (err) return next(err);
           // req.flash("Customer added successfully");
            res.redirect("/customer/show/"+customer.id);
        });
    },

    /**
     * This is the code to show the customer detils with the components that it related with...
     */
    show : function(req,res,next){
        Customer.findOne(req.param('id')).populateAll().exec(function(err,customer){
            if(err) return next(err);

            if(!customer) return next();
            
            res.view({
                customer:customer
            });
        });
            
    },

    /**
     * This is the code to list the customer in the index.ejs page...
     */
    index : function(req,res,next){
        Customer.find(function foundCustomers(err,customers){
            if(err) return next(err);
            res.view({
                customers:customers
            });
        });
    },

    /**
     * This is the code to load the edit.ejs page with the selected customer value...
     */
    edit : function(req,res,next){
        Customer.findOne(req.param("id"),function foundedCustomer(err,customer){
            if(err) return next(err);
            if(!customer) return next();

            res.view({
                customer:customer
            });
        });
    },

    /**
     * This is the code to update the cusotmer...
     */
    update : function(req,res){
        Customer.update(req.param('id'),req.params.all(),function updatedCustomer(err){
            if(err) return res.redirect("/customer/edit/"+req.param('id'));

            res.redirect("/customer/show/"+req.param('id'));
        });
    },

    /**
     * This is the code delete the customer object using its id...
     */
    destroy : function(req,res,next){
        Customer.destroy(req.param('id'),function(err){
            if(err) return next(err);
            res.redirect("/customer/");
        });
    }

};

