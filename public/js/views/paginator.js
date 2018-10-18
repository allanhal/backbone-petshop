window.Paginator = Backbone.View.extend({

    className: "pagination pagination-centered",

    initialize: function () {
        this.model.bind("reset", this.render, this);
        this.render();
    },

    render: function () {

        var items = this.model.models;
        var len = items.length;
        var pageCount = Math.ceil(len / 8);

        $(this.el).html('<ul />');

        var route = Backbone.history.getFragment()
        var searchTerm = route.indexOf('search') > 0 ? route.split("/")[2] : undefined
        var pagination = 'petshops/page/'
        if (searchTerm) {
            pagination = "petshops/search/" + searchTerm + "/page/"
        }

        for (var i = 0; i < pageCount; i++) {
            $('ul', this.el).append("<li" + ((i + 1) === this.options.page ? " class='active'" : "") + `><a href='#${pagination}` + (i + 1) + "'>" + (i + 1) + "</a></li>");
        }

        return this;
    }
});