var App = Ember.Application.create();

App.ApplicationAdapter = DS.FixtureAdapter.extend();

// router
App.Router.map(function() {
  this.resource("about");
  this.resource("posts", function() {
    this.resource("post", { path: ":post_id" })
  });
});


// routes (handlers)
App.PostsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find("post");
  }
});

App.PostRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find("post", params.post_id);
  },

  actions: {
    deletePost: function() {
      var model = this.modelFor("post");

      model.deleteRecord();
      model.save();

      this.transitionTo("posts");
    }
  }
});


// controller
App.PostsController = Ember.ArrayController.extend({
  postsCount: function() {
    return this.get("model.length");
  }.property("@each")

});


// model
App.Post = DS.Model.extend({
  title: DS.attr("string"),
  author: DS.attr("string"),
  body: DS.attr("string")
})

App.Post.FIXTURES = [
  {
    id: 1,
    title: "Ember.js rocks!",
    author: "Ugis",
    body: "Bacon ipsum dolor sit amet ham hock meatloaf turducken, pig pastrami \
    short ribs tongue t-bone spare ribs tenderloin. Strip steak salami pork loin \
    chicken prosciutto tenderloin. Kevin prosciutto kielbasa ribeye t-bone shank. \
    Fatback chuck pork loin sirloin salami, hamburger swine shank ham chicken jerky \
    t-bone. Pork chop fatback meatball rump, beef ribs ground round chuck filet \
    mignon leberkas. Chuck salami swine tenderloin, pork belly pork chop ham."
  },
  {
    id: 2,
    title: "Something else",
    author: "Who knows",
    body: "Ham drumstick bresaola swine, ground round sirloin capicola rump \
    tenderloin biltong short ribs tail flank. Ball tip pastrami leberkas, venison \
    tri-tip rump sirloin. Turkey shankle swine, doner spare ribs fatback bacon \
    salami ribeye biltong jowl beef chuck beef ribs. Doner short loin sirloin \
    pork jerky meatball pastrami tail ribeye pancetta. Salami brisket turducken \
    bacon ribeye tenderloin boudin fatback sausage, pork loin prosciutto pork \
    belly tri-tip. Prosciutto salami doner, ribeye frankfurter swine short loin \
    pork loin tri-tip ham hock tongue chuck. Swine chuck biltong ball tip salami."
  }
];
