/**
 * Though the data array is part of drawD3 function, I am just pretending
 * it is resolved by calling promise hence we are calling metaweather & then
 * call drawD3.
 */
async function getMapAyncData() {
    try {
        let response = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${2487956}/`);
        let data = await response.json();
        drawD3();
    } catch (error) {
        console.log(error);
    }
}

/**
 * Fetch URL param needed to determine if we need to project
 * chart on y axis alone. So the truthy url would be like
 *`http://127.0.0.1:8887/index.html?bySize`
 */
const getUrlParam = () => {
    const parsedUrl = new URL(window.location.href);
    return parsedUrl.searchParams.has("bySize");
};

const drawD3 = () => {

    var rectWidth = 4;
    var width = 800;
    var height = 500;
    var data = [50, 60, 87, 455, 100, 250, 175, 200, 120, 400, 320, 50, 220, 320, 131, 260, 333, 390, 280, 350, 355, 80, 99, 245, 152];
    var margin = {
        top: 20,
        bottom: 20,
        left: 40, // helped in shifting y axis little more towards right for reading ticks
        right: 20
    };

    /**
     * Step 0:
     * Define svg element so we can append everything to it
     */

    var svg = d3.select('svg');
    var animate = d3.transition().duration(1000); // define animation delay time

    /**
     * Step 1:
     * Scale Aspects
     */
    var min = d3.min(data, d => d);
    var max = d3.max(data, d => d);

    // scale
    var yScale = d3.scaleLinear()
        .domain([0, max])
        .range([height - margin.bottom, margin.top]);

    var xScale = d3.scaleLinear()
        .domain([min, max])
        .range([margin.left, width - margin.right]);

    // axis def
    var yAxis = d3.axisLeft()
        .scale(yScale);

    var xAxis = d3.axisBottom()
        .scale(xScale);

    // check for param
    const checkUrlParam = getUrlParam();

    if (checkUrlParam) {
        xAxis
            .tickSize(0) // helps removing tick marks ( particulary first and last ticks )
            .tickValues([]); // helps removing values and ticks all together
    }

    // transform to visualize
    svg.append('g')
        .attr('transform', 'translate(' + [margin.left, 0] + ')')
        .call(yAxis);

    svg.append('g')
        .attr('transform', 'translate(' + [0, height - margin.bottom] + ')')
        .attr("class", "x axis")
        .call(xAxis);

    /**
     * Step 2:
     * Data Aspects
     */

    var render = svg.selectAll('rect')
        .data(data)
        .enter().append('rect')
        .attr('fill', 'steelblue') // color to fill the bar
        .attr('stroke', '#fff'); // color between the bars

    if (checkUrlParam) {
        render
            .attr('x', 0)
            .attr('y', d => yScale(d))
            .attr('width', d => d) // width of the bar
            .attr('transform', 'translate(' + [margin.left, 0] + ')')
            .transition(animate) // delay the loading to have animation effect
            .attr('height', rectWidth) // height of the bar
            // making it fun by adding some color definition based on modulo calculation
            .attr('fill', (d) => {
                return (d % 10) === 0 ? '#EDA631' : 'steelblue';
            });

    } else {
        render
            .attr('x', (d, i) => xScale(d))
            .attr('y', d => (height - 20 - (d))) // -20 helped to align the bars on x axis
            .attr('width', rectWidth) // width of the bar
            .attr('height', d => d); // height of the bar
    }

};

getMapAyncData();
