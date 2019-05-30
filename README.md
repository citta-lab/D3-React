# D3 with React

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

### SVG Scales

Example format:
```
d3.scaleLinear()
  .domain([min, max])   // this will act as input
  .range([min, max]);  // this will be output mapped from input
```

### Helper Function
-

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
