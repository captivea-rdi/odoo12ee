odoo.define('voip_extend', function (require) {
"use strict";

var PhonecallDetails = require('voip.phonecall');

PhonecallDetails.include({
  "template": "voip.PhonecallDetails",
    events: _.extend({}, PhonecallDetails.events, {
        "click .o_dial_to_sales": "_onToSalesClick",
        "click .o_dial_to_quotes": "_onToQuotesClick",
        "click .o_dial_to_opps": "_onToOppsClick",
    }),

    /**
* @private
* @param {Event} ev
*/
    _onToOppsClick: function (ev) {
        ev.preventDefault();
        var res_id;
        var def = $.Deferred();
        if (this.partner_id) {
            res_id = this.partner_id;
            def.resolve();
        } else {
            var domain = [];
            if (this.phone && this.mobile) {
                domain = ['|',
                    ['phone', '=', this.phone],
                    ['mobile', '=', this.mobile]];
            } else if (this.phone) {
                domain = ['|',
                    ['phone', '=', this.phone],
                    ['mobile', '=', this.phone]];
            } else if (this.mobile) {
                domain = [['mobile', '=', this.mobile]];
            }
            this._rpc({
                method: 'search_read',
                model: "res.partner",
                kwargs: {
                    domain: domain,
                    fields: ['id'],
                    limit: 1
                }
            }).then(function(ids) {
                if (ids.length)
                    res_id = ids[0].id;
            }).always(function(){
                def.resolve();
            })
        }
        $.when(def).then((function() {
            if (res_id !== undefined) {
                this.do_action({
                    name : 'Opportunities',
                    id : 353,
                    type: 'ir.actions.act_window',
                    res_model: "crm.lead",
                    //res_id: res_id,
                    views: [[false, 'kanban']],

                    //views: [[704 || false, 'list']],
                    target: 'current',
                    context: {
                                //'search_default_employee_id': [self.employee_data.uid],
                                'search_default_partner_id': res_id,
                                'active_id': this.partner_id,
                                },
                });
            } else {
                this.do_action({
                    type: 'ir.actions.act_window',
                    res_model: "res.partner",
                    views: [[false, 'form']],
                    target: 'current',
                    context: {
                        default_email: this.email,
                        default_phone: this.phone,
                        default_mobile: this.mobile,
                    },
                });
            }
        }).bind(this));
    },
         /**
     * @private
     * @param {Event} ev
     */
    _onToQuotesClick: function (ev) {
        ev.preventDefault();
        var res_id;
        var def = $.Deferred();
        if (this.partner_id) {
            res_id = this.partner_id;
            def.resolve();
        } else {
            var domain = [];
            if (this.phone && this.mobile) {
                domain = ['|',
                    ['phone', '=', this.phone],
                    ['mobile', '=', this.mobile]];
            } else if (this.phone) {
                domain = ['|',
                    ['phone', '=', this.phone],
                    ['mobile', '=', this.phone]];
            } else if (this.mobile) {
                domain = [['mobile', '=', this.mobile]];
            }
            this._rpc({
                method: 'search_read',
                model: "res.partner",
                kwargs: {
                    domain: domain,
                    fields: ['id'],
                    limit: 1
                }
            }).then(function(ids) {
                if (ids.length)
                    res_id = ids[0].id;
            }).always(function(){
                def.resolve();
            })
        }
        $.when(def).then((function() {
            if (res_id !== undefined) {
                this.do_action({
                    name : 'Quotations',
                    id : 274,
                    type: 'ir.actions.act_window',
                    res_model: "sale.order",
                    views: [[false, 'list'],[false,'form']],
                    target: 'main',
                    //domain: ['state', '=', 'draft'],
                    context: {
                                //'search_default_employee_id': [self.employee_data.uid],
                                'search_default_partner_id': res_id,
                                'active_id': this.partner_id,
                                'search_default_status': 'Draft',
                                'search_default_so_is_quote': 1,
                                },
                });
            } else {
                this.do_action({
                    type: 'ir.actions.act_window',
                    res_model: "res.partner",
                    views: [[false, 'form']],
                    target: 'current',
                    context: {
                        default_email: this.email,
                        default_phone: this.phone,
                        default_mobile: this.mobile,
                    },
                });
            }
        }).bind(this));
    },

     /**
     * @private
     * @param {Event} ev
     */
    _onToSalesClick: function (ev) {
        ev.preventDefault();
        var res_id;
        var def = $.Deferred();
        if (this.partner_id) {
            res_id = this.partner_id;
            def.resolve();
        } else {
            var domain = [];
            if (this.phone && this.mobile) {
                domain = ['|',
                    ['phone', '=', this.phone],
                    ['mobile', '=', this.mobile]];
            } else if (this.phone) {
                domain = ['|',
                    ['phone', '=', this.phone],
                    ['mobile', '=', this.phone]];
            } else if (this.mobile) {
                domain = [['mobile', '=', this.mobile]];
            }
            this._rpc({
                method: 'search_read',
                model: "res.partner",
                kwargs: {
                    domain: domain,
                    fields: ['id'],
                    limit: 1
                }
            }).then(function(ids) {
                if (ids.length)
                    res_id = ids[0].id;
            }).always(function(){
                def.resolve();
            })
        }
        $.when(def).then((function() {
            if (res_id !== undefined) {
                this.do_action({
                    name : 'Sales',
                    id : 274,
                    type: 'ir.actions.act_window',
                    res_model: "sale.order",
                    //res_id: res_id,
                    views: [[false, 'list'],[false,'form']],

                    //views: [[704 || false, 'list']],
                    target: 'main',
                    context: {
                                //'search_default_employee_id': [self.employee_data.uid],
                                'search_default_partner_id': res_id,
                                'active_id': this.partner_id,
                                },
                });
            } else {
                this.do_action({
                    type: 'ir.actions.act_window',
                    res_model: "res.partner",
                    views: [[false, 'form']],
                    target: 'current',
                    context: {
                        default_email: this.email,
                        default_phone: this.phone,
                        default_mobile: this.mobile,
                    },
                });
            }
        }).bind(this));
    },

});
return PhonecallDetails;


});
