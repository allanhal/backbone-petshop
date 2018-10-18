window.Petshop = Backbone.Model.extend({

    urlRoot: "api/petshops",

    initialize: function () {

        this.on('change:cityId', function (model, cityId) {
            var self = this
            this.city = new City;
            this.city.url = '/api/city/' + cityId;
            this.city.fetch({
                success: function (result) {
                    self.set('city', result.toJSON())
                }
            });
        });

        this.validators = {};

        this.validators.name = function (value) {
            return value.length > 0 ? {
                isValid: true
            } : {
                isValid: false,
                message: "É necessário digitar um nome."
            };
        };

        this.validators.cityId = function (value) {
            return value.length > 0 ? {
                isValid: true
            } : {
                isValid: false,
                message: "É necessário escolher uma cidade."
            };
        };
    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {
            isValid: true
        };
    },

    validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if (this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }

        return _.size(messages) > 0 ? {
            isValid: false,
            messages: messages
        } : {
            isValid: true
        };
    },

    defaults: {
        id: null,
        name: "",
        phone: "",
        cityId: ""
    }
});

window.PetshopCollection = Backbone.Collection.extend({
    model: Petshop,
    url: "api/petshops",
    initialize: function () {
        this.on("reset", function (collection) {
            collection.models.forEach(model => {

                let city = new City;
                city.url = '/api/city/' + model.get('cityId');
                city.fetch({
                    success: function (result) {
                        model.set('city', result.toJSON())
                    }
                });

            });
        });
    }
});

window.PetshopCollectionSearch = Backbone.Collection.extend({
    model: Petshop,
    url: function () {
        return "api/petshops?q=" + this.searchTerm;
    }
});



window.City = Backbone.Model.extend({
    urlRoot: "api/city",

    initialize: function () {
        this.validators = {};

        this.validators.name = function (value) {
            return value.length > 0 ? {
                isValid: true
            } : {
                isValid: false,
                message: "É necessário digitar um nome."
            };
        };
    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {
            isValid: true
        };
    },
    validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if (this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }

        return _.size(messages) > 0 ? {
            isValid: false,
            messages: messages
        } : {
            isValid: true
        };
    },

    defaults: {
        id: null,
        name: "",
    }
});

window.CityCollection = Backbone.Collection.extend({
    model: City,
    url: "api/city",
});