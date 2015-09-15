/** @jsx React.DOM */

var ingredients = [
{name: 'artichoke heart', minutesMin: 10, minutesMax: 10}, // HSW estimate
{name: 'asparagus, pieces', minutesMin: 5, minutesMax: 5}, // HSW estimate
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
{name: 'spinach', minutesMin: 3, minutesMax: 3}, // HSW estimate
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
    ingredients.find(
      function(element,index,array) { 
        return element.name.replace( /(\s+,?)|(\s*,)/, '-' ) == ingredientId;
      }
    )
  },

  renderChart: function() {
    var self = this;

    var includedIngredients = $('input[type="checkbox"]:checked').map(function(ingredientInput) {
      var ingredientId = ingredientInput.id;
      self.getIngredient(ingredientId);
    });

    console.log('includedIngredients');
    console.log(includedIngredients);

    $('#container').highcharts({

      chart: { type: 'columnrange', inverted: true },

      title: { text: 'Cooking Times' },

      subtitle: { text: 'Start/Stop' },

      // xAxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
      xAxis: { categories: includedIngredients.map(function(ingredient) { return ingredient.name }) },

      yAxis: { title: { text: 'Temperature ( °C )' } },

      tooltip: { valueSuffix: '°C' },

      plotOptions: {
        columnrange: {
          dataLabels: {
            enabled: true,
            formatter: function () {
              return this.y + '°C';
            }
          }
        }
      },

      legend: {
        enabled: false
      },

      series: [{
        name: 'Temperatures',
        data: [
        [-9.7, 9.4],
        [-8.7, 6.5],
        [-3.5, 9.4],
        [-1.4, 19.9],
        [0.0, 22.6],
        [2.9, 29.5],
        [9.2, 30.7],
        [7.3, 26.5],
        [4.4, 18.0],
        [-3.1, 11.4],
        [-5.2, 10.4],
        [-5.2, 10.4],
        [-5.2, 10.4],
        [-5.2, 10.4],
        [-5.2, 10.4],
        [-13.5, 9.8]
        ]
      }]
    });
  }
});

React.render(
  <CookingTimeline />,
  document.getElementById('content')
  );