
# Understanding D3

### Pointers
1. Live data update can be handled using `enter`, `update`, `exit` pattern in d3.  
2. `ticks(5)` can be added while drawing `axisBotton` or `axisLeft` to limit the number of ticks `d3` generates.
3. `tickFormat(d => d3.timeFormat('%b %Y')(d))` is equivalent to writing `tickFormat(d3.timeFormat('%b %Y'))`.
4. y or x ticks are defined by `d3.extent` then it will scale from `[min, max]` from the data set. If we want to start from `0` scale then we can calculate min and max separately and use it in `domain ([0, yMax])`
5. `d3.pie()(data)` sole purpose is to calculate start and end angle.
6. Make sure to have unique identifiers (keys) while implementing update, enter and exit.
7. Data dictates what should appear on the screen in `d3` and hence we select DOM element even if it's not there in the DOM at first.
8. Great example on padding axis and bringing x-axis bottom most [here](https://blockbuilder.org/sxywu/1d5123e1d5cdaced0d8dc37f70428132). Used `.attr('transform', 'translate(' + [0, height - margin.bottom] + ')')` over `.attr('transform', 'tranlate(40, 20)')`.
9. `.tickSize(0)` helps removing the tick marks on the axis. `.tickValues([])` helps removing the tick text on the axis.


### HTML Skeleton
We can refer this skeleton for using / testing d3 scripts
```html
<!DOCTYPE html>
<head>
  <meta charset="utf-8">
  <script src="https://d3js.org/d3.v4.min.js"></script>
  <style>
    body { margin:0;position:fixed;top:0;right:0;bottom:0;left:0; }
    svg {
      width: 100%;
      height: 100%;
    }
  </style>
</head>

<body>
  <svg></svg>
  <script>
    //.........
  </script>
</body>
</html>
```


### Data Types and common usage
1. Categorical ( example: movies, movie genres etc )
2. Ordinal ( example: t-shirt sizes )
3. Quantitative ( example: temperatures, degrees, meta score of movies )
4. Temporal ( example: year, dates, months )
5. Spatial ( example: countries, cities )

### Chart Types
1. Bar Chart
  - used for Categorical comparison
2. Line Chart
3. Tree
  - used for hierarchy
  - one directional relationship
4. Node-link diagram
  - establishing connections
5. Chloropleth
  - spatial trends

Refer [Datawrapper](https://academy.datawrapper.de/) for referral

### SVG Elements
XML type language used for drawing shapes into the page. Most commonly, rectangle, circle, text and lines are drawn.

1. Rectangle
Must provide `width` and `height` which will start the rectangle at (0,0) co-ordinates but adding `x` and `y` we define top left co-ordinates for the rectangle.
```
x: x-coordinate of top left
y: y-coordinate of top left
width
height
```

2. Circle
Must provide `r` for radius and `cx` and `cy` defines the co-ordinates from the center.
```
cx: x-coordinate of center
cy: y-coordinate of center
r: radius
```

3. Text
`text-anchor` is needed which represents `start middle center`. Example: `text-anchor: horizontal text alignment`
```
x: x-coordinate
y: y-coordinate
dx: x-coordinate offset
dy: y-coordinate offset
text-anchor : horizontal text alignment
```

### Shapes
Main feature of shapes is it takes care of figuring out data attribute so we don't have to. i.e d3-shapes calculates the path attribute so we don't have to.
- d3.line()
- d3.pie()




### Build Bar Chart:

Demo Slides : http://slides.com/shirleywu/fm-d3intro#/

#### Option 1:
Demo: https://blockbuilder.org/sxywu/a74ec5e8696fd14a8c03b353c91ae948
In this below example we will explicitly define the DOM element ( predefined ) to be selected by d3 elements.
```javascript
<!DOCTYPE html>
<head>
  <meta charset="utf-8">
  <script src="https://d3js.org/d3.v4.min.js"></script>
  <style>
    body { margin:0;position:fixed;top:0;right:0;bottom:0;left:0; }
    svg {
      width: 100%;
      height: 100%;
    }
  </style>
</head>


<body>
  <svg>
    <rect />
    <rect />
    <rect />
    <rect />
    <rect />
  </svg>
  <script>

    var data = [100, 250, 175, 200, 120];
    var rectWid = 100;
    var height = 300;

    d3.selectAll('rect')
        .data(data) //mapping given array data to data property of selectAll
         .attr('x', (d, i) => i * rectWid) //drawing x co-ordinate size
      .attr('y', d => height - d) // drawing y, (height-d) becase y co-ordinate starts from top left 0,0. height-d will push the bar those many pixels and remaining pixel would be our actual height from bottom.
      .attr('width', rectWid) // defining the size of each bar
      .attr('height', d => d) // defining height from the given data
      .attr('fill', 'blue') // adding color
      .attr('stroke', '#fff') // gaps between the bars

  </script>
</body>
```

#### Option 2:
In this below example we will make use of dynamic appending DOM element using sag functionality. Hence we don’t have to populate the HTML code to insert or remove SVG data. Here `rect` will be added on fly by d3.
Demo: https://blockbuilder.org/sxywu/bade25f3d1b1a0bbac9bf981ad0a4437
```javascript
<script>
var rectWidth = 100;
    var height = 300;
    var data = [100, 250, 175, 200, 120];

    var svg = d3.select('svg');
    const test = svg.selectAll('rect')
        .data(data)
        .enter().append('rect')
        .attr('x', (d, i) => i * rectWidth)
        .attr('y', d => height - d)
        .attr('width', rectWidth)
        .attr('height', d => d)
        .attr('fill', 'blue')
        .attr('stroke', '#fff');
    console.log(test); // test logger
</script>
```
Console log prints all 5 rect elements one for each data set. If we console log test before `.data(data)` then we will see no `rect` element is found however as soon as we do `.enter().append(‘rect’)` it starts adding rect for each defined data set.
- data( ).enter( ).append( ) helps in adding data on fly dynamically so it will auto populate

#### Customizing Option 3:
If we only want to select particular data element and perhaps change color of the bar then we can do like below mentioned example. Example: If the data is more than 250 then we will convert it to red else blue. Remember by default it will be black.
```javascript
<script>
var rectWidth = 50;
    var height = 300;
    var data = [100, 250, 175, 200, 120, 60, 251, 114];

    var svg = d3.select('svg');
    svg.selectAll('rect')
        .data(data)
        .enter().append('rect')
        .attr('x', (d, i) => i * rectWidth)
        .attr('y', d => height - d)
        .attr('width', rectWidth)
        .attr('height', d => d)
        .attr('fill', (d) => {
                return d >= 250 ? 'red' : 'blue'
         })
        .attr('stroke','#fff');
</script>
```
- console.log(enter.nodes( )); // will display all the nodes in the DOM
- console.log(enter.data( ) ); // will display all the data bound to the node i.e rect


### Scales and Axis :

If the data inputs are continuous then we can make use of d3 scale api which has [continuous](https://github.com/d3/d3-scale#continuous-scales) covers different types of scale. such as scaleTime, scaleLog etc.

* scaleLinear( ) : used to display the range from lowest to highest
* scaleLog( ) : used when we have smaller and extremely higher data set them using scaleLog( ) we can smoothen the curve.

Example:
```javascript
d3.scaleLinear()
  .domain([min, max])   // this will act as input
  .range([min, max]);  // this will be output mapped from input
```
* domain and range has to be an array values
* passed values can be mapped easily to get desired scale. Example: if we have domain as [0,100] then we can maybe convert that to display as [0,1.0] scale by mentioning that in the range.
* min and max can be calculated with d3.min, d3.max or using d3.extent.
```javascript
# option 1:
const min = d3.min(data, (d) => d[value]);
const max = d3.max(data, (d) => d[value]);

# option 2:
const extent = d3.extent((data), d => d[value]);
// extent will be [min, max] array
```
* scaleTime only accepts valid date format, such as string or date format. Can make use of `d3-time-format` to convert it to right format before passing it to scaleTime.
* while using scale we just have to pass in the data as it is a function. i.e `yScale = d3.scaleLinear().domain(yExtent).range(bottom, top);` then we can use yScale as `yScale(34)`.

demo: https://blockbuilder.org/sxywu/8045c7e4f4aebce27722e23eec960a6b

```javascript
<body>
  <svg></svg>
  <script>
    var city = 'San Francisco';
    var width = 900;
    var height = 300;

    // dataset of city temperatures across time
    d3.tsv('data.tsv', (err, data) => {
      // clean the data
      data.forEach(d => {
        d.date = new Date(d.date); // x
        ++d[city]; // y
      });

      // get min/max
      var min = d3.min(data, d => d[city]);
      var max = d3.max(data, d => d[city]);
      console.log(min, max);
      // or use extent, which gives back [min, max]
      var extent = d3.extent(data, d => d[city]);
      console.log(extent);


      // try different scales, change the ranges, see what happens
      var yScale = d3.scaleLinear()
        .domain(extent)
        .range([height, 0]);

      // try passing in tick valuess
         var yAxis = d3.axisLeft()
          .scale(yScale);

      d3.select('svg').append('g')
        .attr('transform', 'translate(40, 20)')
          .call(yAxis);

      //extra: customizing the y-axis value color
      var text = d3.selectAll('text')
                           .attr('fill', (d) => {
                   return d === 66 ? 'red' : 'blue'
                 })
    });
  </script>
</body>
```
Another example of writing scaleLinear to project temperature from a city over period of time. You can replace the
below script with in `<script>..</script>` to see the projections. Here is the demo [link](https://blockbuilder.org/sxywu/909992222842cdbda009006e456a23b0)
```javascript
<script>

    var city = 'New York';
    var width = 800;
    var height = 300;
    var margin = {top: 20, bottom: 20, left: 20, right: 20};

    // dataset of city temperatures across time
    d3.tsv('data.tsv', (err, data) => {
      // clean the data
      data.forEach(d => {
        d.date = d3.timeParse("%Y%m%d")(d.date);
        d.date = new Date(d.date); // x axis
        d.temp = ++d[city]; // y axis ( converting string to number by using ++ )
      });

      /**
        Step 1: need x and y scale for axis

        Description: In this step the focus is to extract min and max values
        for each axis using extent, then use appropriate scale api's to draw
        the data

        Calculation: In d3, y axis starts with 0,0 at top and if we put
        .range([0, margin.top]) then we would see inverted hence we need to
        push the margin to start from down by calculating where to start.
        (height-margin.bttom) will push it to start from the down.
      **/

      var xExtent = d3.extent(data, d => d.date);
      var xScale = d3.scaleTime()
      						 .domain(xExtent)
                   .range([margin.left, width - margin.right]);

      var yExtent = d3.extent(data, d => d[city]);
      var yScale = d3.scaleLinear()
      						 .domain(yExtent)
                   .range([(height-margin.bottom), margin.top]);


      /**
        Step 2: create the rectangles by defining svg & adding things to svg.

        Description: Note that we are selecting rect element which is not defined
        in the DOM yet, however using .data() and .enter().append() we can inject
        rect element to do the DOM based on number of available data elements
        (i.e length)
      */

      var svg = d3.select('svg');

      var rect = svg.selectAll('rect')
      					.data(data)
      					.enter().append('rect')
      					.attr('width', 5)
      					.attr('height', function(d) {
                  // by using yScale we are removing the inverted projection
                  return height - yScale(d[city])
                })
      					.attr('x', function(d) { return xScale(d.date)})
      					.attr('y', function(d) { return yScale(d[city])})
     						.attr('fill', 'blue')
      					.attr('stroke', 'white')

        /**
         Step 3: Define axis lines

        **/
        var xAxis = d3.axisBottom()
                	.scale(xScale);
        var yAxis = d3.axisLeft()
                	.scale(yScale);

        svg.append('g')
                .attr('transform', 'translate('+[0, height-margin.bottom ]+')' )
                .call(xAxis)

        svg.append('g')
                .attr('transform', 'translate('+[margin.left, 0]+')')
                .call(yAxis)

    })
  </script>
```

### Shapes

#### Pie Chart
Pie chart works by two main steps, one started with calculating the pie slices using `d3.pie()(data)` then creating the arcs using `d3.arc`.

1. pie calculation ?
Lets consider array of few numbers, then we will use `d3.pie()` on the dataset which will result in desired data set which we can use with `d3.arc()`.
```javascript
var data = [1,4,7];
var pies = d3.pie()(data); // calculates the pie slices
console.log(pies);
```
this will result in building data blog looks like below,
```javascript
// result of console.log(pies);
[{data: 1, index: 2, value: 1, startAngle: 5.759586531581287, endAngle: 6.283185307179586, …},
  {data: 4, index: 1, value: 4, startAngle: 3.665191429188092, endAngle: 5.759586531581287, …},
{data: 7, index: 0, value: 7, startAngle: 0, endAngle: 3.665191429188092, …}]
```

2. Complete Pie Example
```javascript
var colors = d3.scaleOrdinal(d3.schemeCategory10); // responsible for color
  var data = [1, 1, 2, 3, 5, 8, 13, 21];
  var pies = d3.pie()(data); // calculates the pie slices
  console.log(pies); // testing

  /**
   Building arc function which can be used as arc(data).
   Here `attr('d', arc)` is nothing but `attr('d', (d) => arc(d))`
  */
  var arc = d3.arc()
    .innerRadius(0) // 0 makes it inncer cicle stays as dot
    .outerRadius(150) // this will be radius from inner circle
    .startAngle(d => d.startAngle) // startAgnle is created by d3.pie()(data)
    .endAngle(d => d.endAngle); // endAngle is also created by d3.pie()(data)

  var svg = d3.select('svg')
  	.append('g') // g for group element
  	.attr('transform', 'translate(200,200)');
  svg.selectAll('path')
  	.data(pies).enter().append('path') // creating path for each data on fly
  	.attr('d', arc) // arc here nothing by function(d){ return arc(d)}
  	.attr('fill', (d, i) => colors(d.value))
  	.attr('stroke', '#fff');
```

### Update, Enter & Exit

If the we have static data which doesn't change every second then we were using `.data(data)`, but to achieve Update and Exit we need to pass second parameter to data i.e `.data(data, ....)`. So the second aspect is `key function`. Which helps in determining which data mapped to what.
```
data(data, key)
```

#### 1.0 Example
If we have array of integers we could pass same integers as the key. so it would look like
```javascript
var data = [1,3,5,6]; // array of integers
var bars = svg.selectAll('rect')
    .data(data, d => d) // d => d is key function returning integers as key itself. If we would have had object then maybe d.id can be key
bars.exit().remove(); // exit selection to remove
/**
 Always make sure to standardize non data dependent to minimize the DOM manipulation.
 Hence we are setting width of the bar and default color to be white always. enter() makes
 it for new addition rather than update ( i.e if no enter then it will be update )
 */
var enter = bars.enter().append('rect')
.attr('width', rectWidth)
.attr('stroke', '#fff')

/**
 Now remaining and newly added things to be displayed using one call i.e merge
 merge takes care of reflecting the new changes to existing data.
 */
 bars = enter.merge(bars)
 .attr('x', (d, i) => i * rectWidth)
 .attr('y', d => height - d)
 .attr('height', d => d )
 .attr('fill', d => colors(d));
```
during this process it calculates if the existing data key's matched with the incoming dataset, if it matches with any existing `keys` then it will UPDATE the `<rect>`, if the incoming dataset has new values which is not present in existing data then it will ENTER the data to existing `<rect>`, if any existing dataset keys

if it doesn't match then it triggers `exist` selection to get rid of the existing data from the `<rect>` element. Example of using update, enter and exit [here](https://blockbuilder.org/sxywu/2964ad9ee3fb5c3a9c3758af5a775516).


### Transition
The visualization to make it more engaging by adding time while removing and updating the elements. Below are the steps we could follow,

#### Step 1: Define Transition
```javascript
vat t = d3.transition()
        .duration(1000)
```
start with defining transition, if we don't define the duration then d3 will default to 250ms. By defining at top it will keep the synch process easy while updating.

#### Step 2: Use in Exit
```javascript
var bars = svg.selectAll('rect')
    .data(data, d => d)

bars.exit().transition(t) // t is already defined at top
.attr('y', height)
.attr('height', 0) // setting height to 0
.remove()
```

#### Step 3: Animate Remaning
```javascript
var enter = bars.enter().append('rect')
.attr('width', rectWidth)
.attr('stroke', '#fff')
.attr('y', height); // added new attribute

bars = enter.merge(bars)
.attr('x', (d, i) => i * rectWidth)
.attr('fill', d => colors(d))
.transition(t) // added transition for new items
// everything below will be transit
.attr('y', d => height - d)
.attr('height', d => d )
```

#### Example ( Update, Enter, Exit and Transition )
Demo starter example [here](https://blockbuilder.org/sxywu/87352259773cd6d68b8f867241d8c638), add below script in between `<script>..</script>` to see the demo.  
```javascript
  // properties
  var radius = 10;
  var duration = 1500;
  var width = 800;
  var height = 600;
  var svg = d3.select('body').append('svg');
  // scales
  var xScale = d3.scaleBand()
    .rangeRound([0, width]);
  var yScale = d3.scaleLinear()
    .range([height, 0]);
  var colorScale = d3.scaleOrdinal(d3.schemeCategory10);



  function update(data, year) {
    // only using data based on selected year
   	data = data.filter(d => d.year === year);

    // define transition
    var t = d3.transition().duration(1000);

    // defining circles for selected year data on not defined circle
    var circles = svg.selectAll('circle')
    		.data(data, d => d.key);

    // define exit before enter
    circles.exit().transition(t)
    		.attr('r', 0) // setting radius to 0 from 10
    		.remove(); // remove it completely

    // enter, this will create data.length number of circle
    var enter = circles.enter().append('circle')
    		.attr('r', radius) // constant as circle will be of same size
    		//.attr('cy', d => yScale(d.yield) ) // add this at the end if falling from top effect is not you wanted.
    circles = enter.merge(circles) // used for update with enter data
    		.attr('cx', d => xScale(d.site))
    		.transition(t) // add this once transition is defined, and exit is used
        .attr('cy', d => yScale(d.yield))
    		.attr('fill', d => colorScale(d.gen))
  }



  d3.csv('barleyfull.csv', function(err, response) {
    response.forEach(function(d) {
      // convert yield and year from string to int
      d.year = +d.year;
      d.yield = +d.yield;
      // use gen and site as the unique key for each datum
      d.key = d.site + ':' + d.gen;
    });

    console.log(response); // testing
    var xDomain = response.map( d => d.site);
    console.log(xDomain); // list of all x axis data

    xScale.domain(xDomain);
    console.log("xScale data : "+xScale.domain()); // the way we can test if the previous domains are set by not calling with data here.

    // just reference not used in the example (option 1)
    var yExtent = d3.extent(response, d => d.yield);
    console.log("yMin & yMax by using extent :"+yExtent); // [min, max] data here

    // manually doing yScale without using d3.extent so we can map it to 0 for min (option 2)
    var yMax = d3.max(response, d => d.yield);
    console.log("yMax for yScale : "+yMax); // should be same as max from d3.extent

    yScale.domain([0, yMax]);
    console.log("yScale data : "+yScale.domain());




    var startYear = 1927;
    var numYears = 9;
    var index = 0;
    // update(response, startYear); ---> using in timer
    setInterval(() => {
      update(response, startYear + (index % numYears));
      index += 1;
    }, 1000)
  });
```




### Example Snippet

Data
```javascript
let data = [{ date: 2019-01-12, high: 55, low: 35}, {date: 2019-01-23, high: 65, low: 22}];
```


1. Finding Minimum and Maximum values
```javascript
const width = 650; const height = 400;
barChartData = {

  // STEP 1:
  // map date for x position
  const extent = d3.extent(data, d=>d.date);
  const xScale = d3.scaleTime()
                 .domain(extent)
                 .range([0, width])

  console.log(extent); // test will return [Sun Jan 01 2017 00:00:00 GMT+0000 (UTC), Sun Dec 31 2017 00:00:00 GMT+0000 (UTC)] as min and max
  console.log(xScale); // test will return function
  console.log(xScale(new Date('12/31/2017'))); // test will return 0 pixel


  // STEP 2:
  // map temp for y position
  const yExtent = d3.extent(data, d=>d.high);
  const yScale = d3.scaleLinear()
                   .domain(yExtent)
                   .range([height, 0]);
  /**
   we are trying to map the lowest temp i.e to 400 (predefined height) pixel down and
   the higest temperature to 0 pixel at the top. In this charting the y co-ordinate starts
   from the top left
   */

  console.log(yExtent); // test will return [49, 104] temperature as min and max
  console.log(yScale((70))); // test for 70 degree gives 247.27272727272725 pixel

  // STEP 3:
  // map average temp to color
  // get min/max of avg
  const colorExtent = d3.extent(data, d=>d.avg).reverse(); // reverse is used to map low to blue and high to red
  const colorScale = d3.scaleSequential()
                      .domain(colorExtent)
                      .interpolator(d3.interpolateRdYlBu)

  console.log(colorScale(0)); // we reversed the example from scaleSequential to map red to high temp and blue to low. result is rgb(165, 0, 38)


 // array of objects : x, y, height
 return data.map(d => {
   return {
     x: xScale(d.date),
     y: yScale(d.high),
     height: (yScale(d.low) - yScale(d.high)), // this has to be y position of low and y position high
     fill: colorScale(d.avg) // defined from step 3
   }
 })
}
```

### Useful Snippets

1. Removing or coloring the ticks on axis
```javascript
var ticks = d3.selectAll("g.x.axis g.tick text"); // narrow-down it to the x-axis text

// Option 1: fill in the ticks text with preferred color and if the background is white then it will not be visible
ticks.attr("class", function (d, i) {
    d3.select(this).attr('fill', 'white');
    yAxis.ticks(10, ",f");
});

// Option 2: This removes the text from ticks
ticks.attr("class", function (d, i) {
    d3.select(this).remove();
});
```

### Useful Demo's

1. Flipping bars on axis
If the user want to see the projected data on y axis we wanted to flip the projection on y and hide the scale in x axis. This prototype complete code is in [this](https://github.com/citta-lab/d3-react/blob/master/examples/flipBarChart/flipBarChart_d3.js) with code comments and can see the demo in [here](https://8biz7.codesandbox.io/). Make sure to pass `bySize` param in url to check the flipping. Example: `https://8biz7.codesandbox.io/?bySize` and flipped version is [here](https://8biz7.codesandbox.io/?bySize).
![](https://github.com/citta-lab/d3-react/blob/master/examples/barChart/gif/flipBars.gif)







Observable [Reference](https://observablehq.com/@sxywu/data-visualization-for-react-developers-starter)
