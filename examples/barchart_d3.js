
const data = [
    {
        name: "E",
        value: 0.12702
    },
    {
        name: "T",
        value: 0.09056
    },
    {
        name: "A",
        value: 0.08167
    },
    {
        name: "O",
        value: 0.07507
    },
    {
        name: "I",
        value: 0.06966
    }
    , {
        name: "N",
        value: 0.06749
    }
   , {
        name: "S",
        value: 0.06327
    }
   , {
        name: "H",
        value: 0.06094
    }
   , {
        name: "R",
        value: 0.05987
    }
    ,{
        name: "D",
        value: 0.04253
    }
    ,{
        name: "L",
        value: 0.04025
    }
    , {
        name: "C",
        value: 0.02782
    }
    , {
        name: "U",
        value: 0.02758
    }
    ,{
        name: "M",
        value: 0.02406
    }
    , {
        name: "W",
        value: 0.0236
    }
    , {
        name: "F",
        value: 0.02288
    }
    , {
        name: "G",
        value: 0.02015
    }
    ,{
        name: "Y",
        value: 0.01974
    }
    ,{
        name: "P",
        value: 0.01929
    },
    {
        name: "B",
        value: 0.01492
    }
]; 


const chart = () => {


    const width = 300;
    var height = 690;
    const margin = {
        top: 30,
        right: 0,
        bottom: 10,
        left: 30
    };

    
    var svg = d3.select('svg');


    // build linear scale 
    var x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .range([margin.left, width - margin.right]);

    var y = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([margin.top, height - margin.bottom])
        .padding(0.1);

    // build x and y axis 
    var xAxis = g => g
        .attr("transform", `translate(0,${margin.top})`)
        .call(d3.axisTop(x).ticks(width / 80))
        .call(g => g.select(".domain").remove());

    var yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).tickSizeOuter(0));

    // utils 
    height = data.length * 25 + margin.top + margin.bottom;


    svg.append("g")
        .attr("fill", "steelblue")
    .selectAll("rect")
    .data(data)
    .enter().append('rect')
        .attr("x", () => {
            console.log("test "+x(0));
            return x(0);
        })
        .attr("y", d => y(d.name))
        .attr("width", d => x(d.value) - x(0))
        .attr("height", y.bandwidth());

    svg.append("g")
        .attr("fill", "white")
        .attr("text-anchor", "end")
        .style("font", "12px sans-serif")
    .selectAll("text")
    .data(data)
    .enter().append('rect')
        .attr("x", d => x(d.value) - 4)
        .attr("y", d => y(d.name) + y.bandwidth() / 2)
        .attr("dy", "0.35em")
        .text(d => format(d.value));

    svg.append("g")
        .call(xAxis);

    svg.append("g")
        .call(yAxis);
};


// calling the function 
chart();