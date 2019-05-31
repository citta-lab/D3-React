
# Understanding D3

### Pointers
1. Live data update can be handled using `enter`, `update`, `exit` pattern in d3.  
2. `ticks(5)` can be added while drawing `axisBotton` or `axisLeft` to limit the number of ticks `d3` generates.
3. `tickFormat(d => d3.timeFormat('%b %Y')(d))` is equivalent to writing `tickFormat(d3.timeFormat('%b %Y'))`.
4. y or x ticks are defined by `d3.extent` then it will scale from `[min, max]` from the data set. If we want to start from `0` scale then we can calculate min and max separately and use it in `domain ([0, yMax])`


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

2. Circle
Must provide `r` for radius and `cx` and `cy` defines the co-ordinates from the center.

3. Text
`text-anchor` is needed which represents `start middle center`. Example: `text-anchor: horizontal text alignment`

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








Observable [Reference](https://observablehq.com/@sxywu/data-visualization-for-react-developers-starter)
