/** @jsx React.DOM */


$(document).ready(function(){
  $('a.eat').on('click', function () {
    Materialize.toast('Hooray eating!', 4000);
  });
});


// Values with .5 in them adapted from values with same max and min.
// This helps keep them visible on the chart.
var ingredients = [
{name: 'artichoke heart', minutesMin: 9.5, minutesMax: 10.5}, // HSW estimate
{name: 'asparagus, pieces', minutesMin: 4.5, minutesMax: 5.5}, // HSW estimate
{name: 'bell peppers', minutesMin: 2, minutesMax: 3}, // HSW estimate
{name: 'broccoli florets', minutesMin: 3, minutesMax: 4}, // HSW estimate
{name: 'brussels sprouts, halved', minutesMin: 3, minutesMax: 4}, // HSW estimate
{name: 'cabbage, shredded', minutesMin: 3, minutesMax: 4}, // HSW estimate
{name: 'carrots, sliced', minutesMin: 3, minutesMax: 4}, // HSW estimate
{name: 'cauliflower florets', minutesMin: 3, minutesMax: 4}, // HSW estimate
{name: 'corn, off the cob', minutesMin: 3, minutesMax: 4}, // HSW, BA summer soba salad
{name: 'eggplant, large diced', minutesMin: 3, minutesMax: 5}, // BA summer ciambotta stew
{name: 'garlic', minutesMin: 1, minutesMax: 2, until: 'fragrant'}, // BA soba noodle salad
{name: 'green beans', minutesMin: 3, minutesMax: 4}, // HSW estimate
{name: 'greens, collard/mustard/turnip', minutesMin: 4, minutesMax: 6}, // HSW estimate
{name: 'greens, kale/beet', minutesMin: 2, minutesMax: 3}, // HSW estimate
{name: 'mushrooms', minutesMin: 4, minutesMax: 5, until: 'lightly browned'}, // HSW, BA summer bean & mushroom paste
{name: 'onion', minutesMin: 2, minutesMax: 3}, // my estimate
{name: 'peas', minutesMin: 2, minutesMax: 3}, // HSW estimate
{name: 'potatoes', minutesMin: 12, minutesMax: 15, until: 'browned'}, // Estimate based on BA fried egg-topped summer suate
{name: 'spinach', minutesMin: 2.5, minutesMax: 3.5}, // HSW estimate
{name: 'squash, large diced', minutesMin: 4, minutesMax: 6, until: 'softened'}, // BA fresh lemon linguine
{name: 'tofu', minutesMin: 8, minutesMax: 10, until: 'crispy and browned'}, // BA cool long bean & tofu salad
{name: 'turnips, cubed', minutesMin: 2, minutesMax: 3} // HSW estimate
];

var CookingTimeline = React.createClass({
  render: function() {
    var self = this;
    self.renderChart();

    return (
      <div className="cookingTimeline">
      <h2>Ingredients</h2>
      <ul className="ingredients" onChange={this.renderChart}>
      {
        ingredients.map(function(ingredient) {
          return <li key={ingredient.name}>{self.ingredientCheckbox(ingredient)}</li>;
        })
      }
      </ul>
      </div>
      );
  },

  ingredientCheckbox: function(ingredient) {
    var element_id = ingredient.name.replace( /(\s+,?)|(\s*,)/, '-' );
    return (
      <div>
      <input id={element_id} type="checkbox" />
      <label htmlFor={element_id}>{ingredient.name}</label>
      </div>
      );
  },

  getIngredient: function(ingredientId) {
    return ingredients.find(
      function(element,index,array) { 
        return element.name.replace( /(\s+,?)|(\s*,)/, '-' ) == ingredientId;
      }
    )
  },

  cookTime: function() {
    var allMaxTimes = this.includedIngredients().map(function(ingredient) { return ingredient.minutesMax });

    return Math.max.apply(null, allMaxTimes);
  },

  includedIngredients: function() {
    var self = this;

    return $('input[type="checkbox"]:checked').map(function(i,ingredientInput) {
      var ingredientId = ingredientInput.id;
      return self.getIngredient(ingredientId);
    }).toArray();
  },

  renderChart: function() {
    var self = this;

    $('#container').highcharts({

      chart: { type: 'columnrange', inverted: true },

      title: { text: 'Cooking Times' },

      subtitle: { text: 'Start/Stop' },

      xAxis: { categories: self.includedIngredients().map(function(ingredient) { return 'add ' + ingredient.name }).concat('Total Cooking Duration') },

      yAxis: { title: { text: 'Time (min)' } },

      tooltip: { valueSuffix: 'min' },

      plotOptions: {
        columnrange: {
          dataLabels: {
            enabled: true,
            formatter: function () {
              return this.y + 'min';
            }
          }
        }
      },

      legend: {
        enabled: false
      },

      series: [{
        name: 'Times',
        data: self.includedIngredients().map(function(ingredient) { return [self.cookTime() - ingredient.minutesMax, self.cookTime() - ingredient.minutesMin] }).concat([[0,self.cookTime()]])
      }]
    });
  }
});

React.render(
  <CookingTimeline />,
  document.getElementById('content')
  );