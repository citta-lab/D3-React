// Data fetch here
async function getMapAyncData() {
    try {
        let response = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${2487956}/`);
        let data = await response.json();
        console.log(data);
        drawD3();
    } catch (error) {
        console.log(error);
    }
}

const pathCheck = false;

const drawD3 = () => {

    var rectWidth = 10;
    //    var height = 500;
    var width = 800;
    var height = 600;
    var data = [100, 250, 175, 200, 120, 400, 320, 50, 220, 320, 111, 260, 333, 390, 280, 350, 355, 80, 99, 245, 152];
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

    /**
     * Step 1:
     * Scale Aspects 
     */
    var min = d3.min(data, d => d);
    var max = d3.max(data, d => d);

    // scale
    var yScale = d3.scaleLinear()
        .domain([min, max])
        .range([height - margin.bottom, margin.top]);
        

    var xScale = d3.scaleLinear()
        .domain([min, max])
        .range([margin.left, width - margin.right]);

    // axis def
    var yAxis = d3.axisLeft()
        .scale(yScale);

    var xAxis = d3.axisBottom()
        .scale(xScale);

    if (!pathCheck) {
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

    // // hiding x-axis values from user    
    // var ticks = d3.selectAll("g.x.axis g.tick text");

    // ticks.attr("class", function (d, i) {
    //     d3.select(this).attr('fill', 'white');
    //     yAxis.ticks(10, ",f");
    //     /**
    //      * OR
    //      * d3.select(this).remove();
    //      */
    // });



    /**
     * Step 2:
     * Data Aspects 
     */

    var render = svg.selectAll('rect')
        .data(data)
        .enter().append('rect')
        .attr('fill', 'blue') // color to fill the bar
        .attr('stroke', '#fff'); // color between the bars 

    if (!pathCheck) {
        render
            //.attr('x', (d, i) => xScale(d))
            .attr('y', d => (height - 20 - d)) // -20 helped to align the bars on x axis 
            .attr('width', rectWidth) // width of the bar
            .attr('height', d => d) // height of the bar 
            
            // .attr("class", "bar")
            .attr("y", function (d) {
                return d;
            })
            // .attr("height", y.rangeBand())
            .attr("x", 0)
            .attr("width", 10);
    } else {
        render
            .attr('x', d => (width - 20 - d))
            .attr('y', d => xScale(d))
            .attr('height', rectWidth)
            .attr('width', d => d);

    }


};



getMapAyncData();