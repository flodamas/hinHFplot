
var width = document.documentElement.clientWidth/2.4,
    height = document.documentElement.clientWidth/3.;
// height = document.documentElement.clientHeight/2;

var svg = d3.select('svg').attr('width', width).attr('height', height);
// d3.select('svg').style("font-size", "50px");

var margin = { top: height*0.15, right: width*0.05, bottom: height*0.12, left: width*0.12 },
    chartWidth = width - margin.left - margin.right,
    chartHeight = height - margin.top - margin.bottom;

var xmin, xmax, ymin, ymax;
var x, y;

var setscale = function()
{
    xmin = Math.min(document.getElementById('pxmin').value,
                    document.getElementById('pxmax').value);
    xmax = Math.max(document.getElementById('pxmin').value,
                    document.getElementById('pxmax').value);
    ymin = Math.min(document.getElementById('pymin').value,
                    document.getElementById('pymax').value);
    ymax = Math.max(document.getElementById('pymin').value,
                    document.getElementById('pymax').value);

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
        // .transition().duration(300)
        .call( d3.axisBottom(x).tickSize(-chartHeight).ticks(ticksx).tickFormat("").tickSizeOuter(0) );
    var yGrid = d3.select("svg").select("g").append('g')
        .attr('transform', 'translate(0,0)')
        .attr("class", "grid")
        // .transition().duration(300)
        .call( d3.axisLeft(y).tickSize(-chartWidth).ticks(ticksy).tickFormat("").tickSizeOuter(0) );

    var xAxis = d3.select("svg").select("g").append('g')
        .attr('transform', 'translate(0,' + chartHeight + ')')
        .attr("class", "axis")
        // .transition().duration(300)
        .call( d3.axisBottom(x).tickSize(ticksize).ticks(ticksx).tickSizeOuter(0).tickPadding(10) );
    var yAxis = d3.select("svg").select("g").append('g')
        .attr('transform', 'translate(0,0)')
        .attr("class", "axis")
        // .transition().duration(300)
        .call( d3.axisLeft(y).tickSize(ticksize).ticks(ticksy).tickSizeOuter(0).tickPadding(6) );
    var xLine = d3.select("svg").select("g").append('g')
        .attr('transform', 'translate(0,0)')
        .attr("class", "axis")
        // .transition().duration(300)
        .call( d3.axisBottom(x).tickFormat("").tickSize(0).ticks(ticksx).tickSizeOuter(0) );
    var yLine = d3.select("svg").select("g").append('g')
        .attr('transform', 'translate(' + chartWidth + ',0)')
        .attr("class", "axis")
        // .transition().duration(300)
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
        .attr('y', function(d) { return y(Math.min(d.y + d.systh, ymax)); })
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
        .transition().duration(300)
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
        .transition().duration(300)
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
        .attr('r', width/120.)
        .transition().duration(300)
        .attr('fill', thecolor)
        .attr('opacity', function(d) {
            if(d.x > xmin && d.x < xmax && d.y > ymin && d.y < ymax) { return 1; }
            else { return 0; }
        });
};

var draw = function()
{
    d3.selectAll("svg > *").remove();
    setsvg();

    var obs = document.getElementById('observable').value;

    for(var da in dataset)
    {
        // console.log(da);
        var thisitem = dataset[da];
        if(thisitem.observable !== obs) { continue; }
        if(document.getElementById('check_'+da).checked == true)
            addData(thisitem.data, document.getElementById('color_'+da).value, 20);
    }
}
