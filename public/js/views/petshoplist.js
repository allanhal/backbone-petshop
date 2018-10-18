window.PetshopListView = Backbone.View.extend({

    initialize: function () {

        let cityCollection = new CityCollection();
        cityCollection.fetch({
            success: function (cityCollection) {
                let cityCollectionJson = cityCollection.toJSON()
                cityCollectionJson.forEach(city => {
                    $('.cityId-' + city.id).each(function () {
                        this.append(city.name)
                    });
                });
            }
        });

        this.render()
    },

    render: function () {
        var petshops = this.model.models;
        var len = petshops.length;
        var startPos = (this.options.page - 1) * 8;
        var endPos = Math.min(startPos + 8, len);

        $(this.el).html('<ul class="thumbnails"></ul>');

        for (var i = startPos; i < endPos; i++) {
            $('.thumbnails', this.el).append(new PetshopListItemView({
                model: petshops[i]
            }).render().el);
        }

        $(this.el).append(new Paginator({
            model: this.model,
            page: this.options.page
        }).render().el);

        return this;
    }
});

window.PetshopListItemView = Backbone.View.extend({

    tagName: "li",

    className: "span3",

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        let modelJson = this.model.toJSON();

        let cityCollection = new CityCollection();
        cityCollection.fetch({
            success: function (cityCollection) {
                let cityCollectionJson = cityCollection.toJSON()
                cityCollectionJson.forEach(city => {
                    $('.cityId-' + city.id).each(function () {
                        this.replaceWith(city.name)
                    });
                });
            }
        });

        $(this.el).html(this.template(modelJson));
        return this;
    }

});