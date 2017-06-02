import Ember from 'ember';

export default Ember.Controller.extend({
  recipes: [],
  init: function () {
    this.get('store')
      .findAll('recipe')
      .then(recipes => this.set('recipes', recipes))
  }
});
