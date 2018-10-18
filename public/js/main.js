var AppRouter = Backbone.Router.extend({

    routes: {
        "": "list",
        "petshops/page/:page": "list",
        "petshops/search/:searchTerm": "search",
        "petshops/search/:searchTerm/page/:page": "search",
        "petshops/add": "addPetshop",
        "petshops/:id": "petshopDetails",
        "about": "about"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    list: function (page) {
        var p = page ? parseInt(page, 10) : 1;
        var petshopList = new PetshopCollection();
        petshopList.fetch({
            success: function () {
                $("#content").html(new PetshopListView({
                    model: petshopList,
                    page: p
                }).el);
            }
        });
        this.headerView.selectMenuItem('home-menu');
    },

    petshopDetails: function (id) {
        var petshop = new Petshop({
            id: id
        });
        petshop.fetch({
            success: function () {
                $("#content").html(new PetshopView({
                    model: petshop
                }).el);
            }
        });

        this.headerView.selectMenuItem();
    },

    addPetshop: function () {
        var petshop = new Petshop();
        $('#content').html(new PetshopView({
            model: petshop
        }).el);
        this.headerView.selectMenuItem('add-menu');
    },

    search: function (searchTerm, page) {
        var p = page ? parseInt(page, 10) : 1;
        var petshopList = searchTerm && searchTerm.length > 0 ? new PetshopCollectionSearch() : new PetshopCollection();
        petshopList.searchTerm = searchTerm;
        petshopList.fetch({
            success: function () {
                $("#content").html(new PetshopListView({
                    model: petshopList,
                    page: p
                }).el);
            }
        });
        this.headerView.selectMenuItem('home-menu');
    },

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    }

});

utils.loadTemplate(['HeaderView', 'PetshopView', 'PetshopListItemView', 'AboutView'], function () {
    app = new AppRouter();
    Backbone.history.start();
});