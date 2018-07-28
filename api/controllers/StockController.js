/**
 * StockController
 *
 * @description :: Server-side logic for managing stocks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    
    /**
     * This is the code to get the add new stock page i.e., stock/new.ejs page...
     */
    'new' : function(req,res,next){
        Customer.findOne(req.param('owner'),function foundedCustomer(err, customer){
            if(err) return next(err);
            if(!customer) return next();
            res.view({
                customer:customer
            });
        });
    },
    

    /**
     * This is the code to show the customer details with the list of stocks...
     */
    create : function(req,res,next){
        Stock.create(req.params.all(),function stockCreated(err,stock){
            if(err) return next(err);
            res.redirect('/customer/show/'+stock.owner);
        });
    },

    /**
     * This is the code to show the details of the selected stock...
     */
    show : function(req,res,next){
        Stock.findOne(req.param('id'),function stockFounded(err,stock){
            if(err) return next(err);
            res.view({
                stock:stock
            });
        });
    },

    /**
     * This is the code to get the stock that needs to be edited and send the data to the edit page...
     */
    edit : function(req,res,next){
        Stock.findOne(req.param('id'),function stockFounded(err,stock){
            if(err) return next(err);
            
            res.view({
                stock:stock
            });

        });
    },

    /**
     * This is the code to update the stock details of a customer...
     */
    update : function(req,res,next){
        console.log("ID:"+req.param('id')+" OWNER:"+req.param('owner'));
        Stock.update(req.param('id'),req.params.all(),function updatedStock(err){
            if(err) return next(err);
            res.redirect('/customer/show/'+req.param('owner'));
        });
    },

    /**
     * this is the code to destroy the stock using its id...
     */
    destroy : function(req,res,next){
        Stock.destroy(req.param('id'),function deletedStock(err,stock){
            if(err) return next(err);
            res.redirect('/customer/show/'+req.param('owner')); 
        });
    }


};

