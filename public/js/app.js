/** @jsx React.DOM */

var estimates = [
{name: 'artichoke heart', minutesMin: 10, minutesMax: 10}, // HSW estimate
{name: 'asparagus, pieces', minutesMin: 5, minutesMax: 5}, // HSW estimate
{name: 'green beans', minutesMin: 3, minutesMax: 4}, // HSW estimate
{name: 'broccoli florets', minutesMin: 3, minutesMax: 4}, // HSW estimate
{name: 'brussels sprouts, halved', minutesMin: 3, minutesMax: 4}, // HSW estimate
{name: 'cabbage, shredded', minutesMin: 3, minutesMax: 4}, // HSW estimate
{name: 'carrots, sliced', minutesMin: 3, minutesMax: 4}, // HSW estimate
{name: 'cauliflower florets', minutesMin: 3, minutesMax: 4}, // HSW estimate
{name: 'corn, off the cob', minutesMin: 3, minutesMax: 4}, // HSW, BA summer soba salad
{name: 'squash, large diced', minutesMin: 4, minutesMax: 6, until: 'softened'}, // BA fresh lemon linguine
{name: 'eggplant, large diced', minutesMin: 3, minutesMax: 5}, // BA summer ciambotta stew
{name: 'greens, collard/mustard/turnip', minutesMin: 4, minutesMax: 6}, // HSW estimate
{name: 'greens, kale/beet', minutesMin: 2, minutesMax: 3}, // HSW estimate
{name: 'garlic', minutesMin: 1, minutesMax: 2, until: 'fragrant'}, // BA soba noodle salad
{name: 'mushrooms', minutesMin: 4, minutesMax: 5, until: 'lightly browned'}, // HSW, BA summer bean & mushroom paste
{name: 'peas', minutesMin: 2, minutesMax: 3}, // HSW estimate
{name: 'bell peppers', minutesMin: 2, minutesMax: 3}, // HSW estimate
{name: 'onion', minutesMin: 2, minutesMax: 3}, // my estimate
{name: 'spinach', minutesMin: 3, minutesMax: 3}, // HSW estimate
{name: 'potatoes', minutesMin: 12, minutesMax: 15, until: 'browned'}, // Estimate based on BA fried egg-topped summer suate
{name: 'tofu', minutesMin: 8, minutesMax: 10, until: 'crispy and browned'}, // BA cool long bean & tofu salad
{name: 'turnips, cubed', minutesMin: 2, minutesMax: 3} // HSW estimate
];

var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        Hello, world! I am a CommentBox.
      </div>
    );
  }
});

React.render(
  <CommentBox />,
  document.getElementById('content')
);