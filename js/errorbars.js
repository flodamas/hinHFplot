
var width = document.documentElement.clientWidth/2.4,
    height = document.documentElement.clientWidth/3.;
// height = document.documentElement.clientHeight/2;

var svg = d3.select('svg').attr('width', width).attr('height', height);
// d3.select('svg').style("font-size", "50px");

var margin = { top: height*0.15, right: width*0.05, bottom: height*0.12, left: width*0.13 },
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

    var xtitle = svg.append("text")             
        .attr("transform",
              "translate(" + (chartWidth/2. + margin.left) + " ," + 
              (chartHeight + margin.top + margin.bottom/1.25) + ")")
        .style("text-anchor", "middle")
        .style("font", "1.3em sans-serif")
    // .text(document.getElementById('xvariable').value);
    if(document.getElementById('xvariable').value === "pT")
    {
        xtitle.append('tspan')
            .text('p')
            .style('font', '1.1em sans-serif')
        xtitle.append('tspan')
            .text('T')
            .style('font', '0.6em sans-serif')
            .attr('baseline-shift', 'sub')
        xtitle.append('tspan')
            .text(' (GeV/c)')
            .style('font', '1.1em sans-serif')
    }

    var ytitle = svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0)
        .attr("x", 0 - (margin.bottom + chartHeight / 2.))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("font", "1.1em sans-serif")

    if(document.getElementById('observable').value === "RAA")
    {
        ytitle.append('tspan')
            .text('R')
            .style('font', '1.3em sans-serif')
        ytitle.append('tspan')
            .text('AA')
            .style('font', '0.8em sans-serif')
            .attr('baseline-shift', 'sub')
    }
    else if(document.getElementById('observable').value === "v2")
    {
        ytitle.append('tspan')
            .text('v')
            .style('font', '1.3em sans-serif')
        ytitle.append('tspan')
            .text('2')
            .style('font', '0.8em sans-serif')
            .attr('baseline-shift', 'sub')
    }
    else if(document.getElementById('observable').value === "LcD0")
    {
        ytitle.append('tspan')
            .text('L')
            .style('font', '1.3em sans-serif')
        ytitle.append('tspan')
            .text('c')
            .style('font', '0.8em sans-serif')
            .attr('baseline-shift', 'sub')
        ytitle.append('tspan')
            .text(' / D')
            .style('font', '1.3em sans-serif')
        ytitle.append('tspan')
            .text('0')
            .style('font', '0.8em sans-serif')
            .attr('baseline-shift', 'super')
    }
}

var addData = function(da, data, thecolor, kmarker) {
    //     console.log(data);
    
    // var rects = d3.select("svg").select("g").selectAll('rect')
    var rects = d3.select("svg").select("g").selectAll('.rectd3'+da)
        .data(data);
    rects.enter()
        .append('rect')
        .attr('class', 'rectd3' + da)
        .merge(rects)
        .attr('x', function(d) { return Math.max(0, x(d.x) - chartWidth/80.); }) // box width = chartwidth/40.
        .attr('y', function(d) { return y(Math.min(d.y + d.systh, ymax)); })
        .attr('height', function(d) { return y(Math.max(d.y - d.systl, ymin)) - y(Math.min(d.y + d.systh, ymax)); })
        .attr('width', function(d) {
            var low = x(d.x) - chartWidth/80.;
            if(low < 0) { low = 0; }
            var high = x(d.x) + chartWidth/80.;
            if(high > chartWidth) { high = chartWidth; }
            if(high > low) { return (high - low); }
            else { return 0; }})
        .transition().duration(1000)
        .attr('fill', thecolor)
        .attr('stroke', thecolor)
        .attr('stroke-width', '1px')
        .attr('opacity', function(d) {
            if(d.x > xmin && d.x < xmax && d.y > ymin && d.y < ymax) { return 0.25; }
            else { return 0; }
        });

    // var lines = d3.select("svg").select("g").selectAll('line')
    var lines = d3.select("svg").select("g").selectAll('.lined3'+da)
        .data(data);
    lines.enter()
        .append('line')
        .attr('class', 'lined3' + da)
        .merge(lines)
        .attr('x1', function(d) { return x(d.x); })
        .attr('x2', function(d) { return x(d.x); })
        .attr('y1', function(d) { return y(Math.min(d.y + d.stath, ymax)); })
        .attr('y2', function(d) { return y(Math.max(d.y - d.statl, ymin)); })
        .transition().duration(1000)
        .attr('stroke', thecolor)
        .attr('stroke-width', '2px')
        .attr('opacity', function(d) {
	    if(d.x > xmin && d.x < xmax && d.y > ymin && d.y < ymax) { return 1; }
            else { return 0; }
        });
    ;

    // var points = d3.select("svg").select("g").selectAll('marker')
    var points = d3.select("svg").select("g").selectAll('.pointd3'+da)
        .data(data);
    if(kmarker==20) { m20(da, points, thecolor); }
};

var m20 = function(da, point, thecolor)
{
    point.enter()
        .append('circle')
        .attr('class', 'pointd3' + da)
        .merge( point )
        .attr('cx', function(d) { return x(d.x); })
        .attr('cy', function(d) { return y(d.y); })
    // .attr('r', 4)
        .attr('r', width/120.)
        .transition().duration(1000)
        .attr('fill', thecolor)
        .attr('opacity', function(d) {
            if(d.x > xmin && d.x < xmax && d.y > ymin && d.y < ymax) { return 1; }
            else { return 0; }
        });
};

var drawall = function()
{
    d3.selectAll("svg > *").remove();
    setsvg();

    var obs = document.getElementById('observable').value;

    for(var da in dataset)
    {
        var thisitem = dataset[da];
        if(thisitem.observable !== obs) { continue; }
        if(document.getElementById('check_'+da).checked == true)
            addData(da, thisitem.data, document.getElementById('color_'+da).value, 20);
    }
    // document.getElementById('reference').style = 'opacity : 0;';
    addref();
}

var draw = function(da)
{
    // d3.selectAll("svg > .d3_" + da).remove();

    var ichecked = document.getElementById('check_'+da).checked;
    if(ichecked)
    {
        d3.select("svg").select("g").selectAll('.rectd3'+da).remove();
        d3.select("svg").select("g").selectAll('.lined3'+da).remove();
        d3.select("svg").select("g").selectAll('.pointd3'+da).remove();

        var thisitem = dataset[da];
        addData(da, thisitem.data, document.getElementById('color_'+da).value, 20);
    }
    else
    {
        d3.select("svg").select("g").selectAll('.rectd3'+da).transition().attr('opacity', 0).duration(1000);
        d3.select("svg").select("g").selectAll('.lined3'+da).transition().attr('opacity', 0).duration(1000);
        d3.select("svg").select("g").selectAll('.pointd3'+da).transition().attr('opacity', 0).duration(1000);
    }
    // setsvg();

    addref();
}

function colorall()
{
    var colorb = document.getElementsByTagName("input");
    for(var i=0; i<colorb.length; i++)
    {
        if(colorb[i].type == 'color')
        {
            var da = colorb[i].id.replace("color_", "");
            var cc = Math.floor(Math.random()*16777215).toString(16);
            if(cc.length < 6)
            { for(var ic = 0; ic<(6-cc.length); ic++) { cc = '0' + cc; } }
            cc = '#' + cc;
            colorb[i].value = cc;
            // console.log(cc)
            d3.select("svg").select("g").selectAll('.rectd3'+da).attr('fill', cc);
            d3.select("svg").select("g").selectAll('.rectd3'+da).attr('stroke', cc);
            d3.select("svg").select("g").selectAll('.lined3'+da).transition().attr('stroke', cc).duration(500);
            d3.select("svg").select("g").selectAll('.pointd3'+da).transition().attr('fill', cc).duration(500);
        }
    }

    addref();
}
