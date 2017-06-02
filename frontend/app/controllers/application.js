import Ember from 'ember';

export default Ember.Controller.extend({
  recipes: [],
  init: function () {
    fetch('/recipes')
      .then(response => response.json())
      .then(recipeData => {
        this.set('recipes', recipeData);
      });
  }
});
