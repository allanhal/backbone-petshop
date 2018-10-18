window.PetshopView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        let modelJson = this.model.toJSON();
        let cityId = modelJson.cityId

        let cityCollection = new CityCollection();
        cityCollection.fetch({
            success: function (cityCollection) {
                let toReturn = `<option value="">Select...</option>`
                let compiledOptionTemplate = _.template('<option <%= selected %> value="<%= id %>"><%= name %></option>')

                let cityCollectionJson = cityCollection.toJSON()
                cityCollectionJson.forEach(city => {
                    city.selected = ''
                    if (city.id == cityId) {
                        city.selected = 'selected'
                    }
                    toReturn += compiledOptionTemplate(city)
                });
                $('#cityId').append(toReturn)
            }
        });

        $(this.el).html(this.template(modelJson));
        return this;
    },

    events: {
        "change": "change",
        "click .save": "beforeSave",
        "click .delete": "deletePetshop",
    },

    change: function (event) {
        // Remove any existing alert message
        utils.hideAlert();

        // Apply the change to the model
        var target = event.target;
        var change = {};
        change[target.name] = target.value;
        this.model.set(change);

        // Run validation rule (if any) on changed item
        var check = this.model.validateItem(target.id);
        if (check.isValid === false) {
            utils.addValidationError(target.id, check.message);
        } else {
            utils.removeValidationError(target.id);
        }
    },

    beforeSave: function () {
        // debugger
        var self = this;
        var check = this.model.validateAll();
        if (check.isValid === false) {
            utils.displayValidationErrors(check.messages);
            return false;
        }
        this.savePetshop();
        return false;
    },

    savePetshop: function () {
        var self = this;
        this.model.unset('city')
        this.model.save(null, {
            success: function (model) {
                self.render();
                app.navigate('petshops/' + model.id, false);
                utils.showAlert('Success!', 'Petshop saved successfully', 'alert-success');
            },
            error: function () {
                utils.showAlert('Error', 'An error occurred while trying to delete this item', 'alert-error');
            }
        });
    },

    deletePetshop: function () {
        this.model.destroy({
            success: function () {
                alert('Petshop deleted successfully');
                window.history.back();
            }
        });
        return false;
    },

});