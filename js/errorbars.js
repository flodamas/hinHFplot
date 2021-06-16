// generate random data with d3 range and map
// var data = d3.range(40).map(function(i) {
//   return {
//     x: i + 1,
//     // generate a random value between 40 and 60
//     y: d3.randomUniform(40, 60)(), 
//     // generate a random interval between 1 and 5
//     e: d3.randomUniform(1, 5)()
//   };
// });

var width = document.documentElement.clientWidth/2.2,
    height = document.documentElement.clientWidth/3.2;
// height = document.documentElement.clientHeight/2;

var svg = d3.select('svg').attr('width', width).attr('height', height);
// d3.select('svg').style("font-size", "50px");

var margin = { top: height*0.01, right: width*0.05, bottom: height*0.12, left: width*0.12 },
    chartWidth = width - margin.left - margin.right,
    chartHeight = height - margin.top - margin.bottom;

var xmin, xmax, ymin, ymax;
var x, y;

var setscale = function()
{
    xmin = document.getElementById('pv2xmin').innerText;
    xmax = document.getElementById('pv2xmax').innerText;
    ymin = -0.03, ymax = 0.27;
    x = d3.scaleLinear()
        .range([0, chartWidth])
        .domain([xmin, xmax]);
    y = d3.scaleLinear()
        .range([chartHeight, 0])
        .domain([ymin, ymax]);
}

// create svg
var setsvg = function()
{
    var g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    setscale();
    drawaxisgrid();
}

// axes
var drawaxisgrid = function()
{
    var ticksx = 10, ticksy = 5;
    var ticksize = -5;
    var xGrid = d3.select("svg").select("g").append('g')
        .attr('transform', 'translate(0,' + chartHeight + ')')
        .attr("class", "grid")
        .call( d3.axisBottom(x).tickSize(-chartHeight).ticks(ticksx).tickFormat("").tickSizeOuter(0) );
    var yGrid = d3.select("svg").select("g").append('g')
        .attr('transform', 'translate(0,0)')
        .attr("class", "grid")
        .call( d3.axisLeft(y).tickSize(-chartWidth).ticks(ticksy).tickFormat("").tickSizeOuter(0) );

    var xAxis = d3.select("svg").select("g").append('g')
        .attr('transform', 'translate(0,' + chartHeight + ')')
        .attr("class", "axis")
        .call( d3.axisBottom(x).tickSize(ticksize).ticks(ticksx).tickSizeOuter(0).tickPadding(10) );
    var yAxis = d3.select("svg").select("g").append('g')
        .attr('transform', 'translate(0,0)')
        .attr("class", "axis")
        .call( d3.axisLeft(y).tickSize(ticksize).ticks(ticksy).tickSizeOuter(0).tickPadding(6) );
    var xLine = d3.select("svg").select("g").append('g')
        .attr('transform', 'translate(0,0)')
        .attr("class", "axis")
        .call( d3.axisBottom(x).tickFormat("").tickSize(0).ticks(ticksx).tickSizeOuter(0) );
    var yLine = d3.select("svg").select("g").append('g')
        .attr('transform', 'translate(' + chartWidth + ',0)')
        .attr("class", "axis")
        .call( d3.axisLeft(y).tickFormat("").tickSize(0).ticks(ticksy).tickSizeOuter(0) );
}

var addData = function(data, thecolor, kmarker) {
    //     console.log(data);
    
    var rects = d3.select("svg").select("g").selectAll('rect.systs')
        .data(data);
    rects.enter()
        .append('rect')
    // .attr('class', 'systs')
        .merge(rects)
        .attr('x', function(d) { return x(d.x) - chartWidth/80.; }) // box width = chartwidth/40.?
        .attr('y', function(d) { return y(d.y + d.systh); })
    // .attr('height', function(d) { return y(d.y - d.systl) - y(d.y + d.systh); })
        .attr('height', function(d) { return y(Math.max(d.y - d.systl, ymin)) - y(Math.min(d.y + d.systh, ymax)); })
        .attr('width', function(d) {
            var low = x(d.x) - chartWidth/80.;
            if(low < 0) { low = 0; }
            var high = x(d.x) + chartWidth/80.;
            if(high > chartWidth) { high = chartWidth; }
            if(high > low) { return (high - low); }
            else { return 0; }})
        // .attr('width', function(d) { return chartWidth/40.; })
        .attr('fill', thecolor)
        .attr('stroke', thecolor)
        .attr('stroke-width', '2px')
        .attr('opacity', function(d) {
            if(d.x > xmin && d.x < xmax) { return 0.25; }
            else { return 0; }
        });

    var lines = d3.select("svg").select("g").selectAll('line.stats')
        .data(data);
    lines.enter()
        .append('line')
    // .attr('class', 'stats')
        .merge(lines)
        .attr('x1', function(d) { return x(d.x); })
        .attr('x2', function(d) { return x(d.x); })
        .attr('y1', function(d) { return y(Math.min(d.y + d.stath, ymax)); })
        .attr('y2', function(d) { return y(Math.max(d.y - d.statl, ymin)); })
        .attr('stroke', thecolor)
        .attr('stroke-width', '2px')
        .attr('opacity', function(d) {
	    if(d.x > xmin && d.x < xmax) { return 1; }
            else { return 0; }
        });
    ;

    var points = d3.select("svg").select("g").selectAll('marker.points')
        .data(data);
    if(kmarker==20) { m20(points, thecolor); }
};

var m20 = function(point, thecolor)
{
    point.enter()
        .append('circle')
    // .attr('class', 'points')
        .merge( point )
        .attr('cx', function(d) { return x(d.x); })
        .attr('cy', function(d) { return y(d.y); })
    // .attr('r', 4)
        .attr('r', width/100.)
        .attr('fill', thecolor)
        .attr('opacity', function(d) {
            if(d.x > xmin && d.x < xmax) { return 1; }
            else { return 0; }
        });
};

var draw = function()
{
    d3.selectAll("svg > *").remove();
    setsvg();
    if(document.getElementById('ALICE_D0_v2_pt_30-50').checked == true)
        addData(dataset["ALICE_D0_v2_pt_30-50"].data, '#EAAD31', 20);
    if(document.getElementById('CMS_D0_v2_pt_30-50').checked ==true)
        addData(dataset["CMS_D0_v2_pt_30-50"].data, '#CF5959', 20);
    // addData(dataset["ATLAS_bm_v2_pt_30-40"].data, '#2D6BB4', 20);
    // // addData(dataset["CMS_upsilon1S_v2_pt_30-50"].data, '#329FAE', 20);
    // addData(dataset["ALICE_Jpsi_v2_pt_30-50_fwd"].data, '#89AF4B', 20);
}

// resize
// window.onresize = function() {
//     width = document.documentElement.clientWidth;
//     height = document.documentElement.clientHeight;

//     svg.attr('width', width).attr('height', height)

//     chartWidth = width - margin.left - margin.right;
//     chartHeight = height - margin.top - margin.bottom;

//     x.range([0, chartWidth]);
//     y.range([chartHeight, 0]);

//     xAxis
//         .attr('transform', 'translate(0,' + chartHeight + ')')
//         .call( d3.axisBottom(x) );
//     yAxis.call( d3.axisLeft(y) );

//     addData();
// };


