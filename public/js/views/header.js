window.HeaderView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    },

    events: {
        "keyup #search": "search",
    },

    search: function (searchTerm) {
        function makeSearch() {
            searchTerm = searchTerm.target.value
            let path = searchTerm && searchTerm.length > 0 ? 'petshops/search/' + searchTerm : ''
            Backbone.history.navigate(path, true);
        }
        _.debounce(makeSearch, 300)();
    },

    selectMenuItem: function (menuItem) {
        $('.nav li').removeClass('active');
        if (menuItem) {
            $('.' + menuItem).addClass('active');
        }
    }

});