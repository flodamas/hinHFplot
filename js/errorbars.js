
var width, height;
var svg;
var margin, chartWidth, chartHeight;

var xmin, xmax, ymin, ymax;
var x, y;

// legend -->
var x0, y0, dy;
var legs = [];
// <-- legend

var setscale = function()
{
    width = document.getElementById('rightpad').clientWidth*0.85;
    height = width * 0.695;

    svg = d3.select('svg').attr('width', width).attr('height', height)
        .attr('font-family', 'sans-serif')
        .attr('font-size', width/100.);

    margin = { top: height*0.06, right: width*0.05, bottom: height*0.13, left: width*0.14 },
    chartWidth = width - margin.left - margin.right,
    chartHeight = height - margin.top - margin.bottom;

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

    x0 = margin.left + chartWidth/89.*(document.getElementById('x0range').value-10);
    y0 = margin.top + chartHeight/89.*(document.getElementById('y0range').value-10);
    dy = chartHeight/15.;
}

// create svg
var setsvg = function()
{
    // document.getElementsByTagName("svg")[0];//.style("background: white;");
    setscale();
    var g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    drawaxisgrid();
}

// axes
var drawaxisgrid = function()
{
    var ticksx = 8, ticksy = 5;
    var ticksize = -5;
    var xGrid = d3.select("svg").select("g").append('g')
        .attr('transform', 'translate(0,' + chartHeight + ')')
        .attr("class", "grid")
        .call( d3.axisBottom(x).tickSize(-chartHeight).ticks(ticksx).tickFormat("").tickSizeOuter(0) );
    var yGrid = d3.select("svg").select("g").append('g')
        .attr('transform', 'translate(0,0)')
        .attr("class", "grid")
        .call( d3.axisLeft(y).tickSize(-chartWidth).ticks(ticksy).tickFormat("").tickSizeOuter(0) );

    var obs = document.getElementById('observable').value;
    var vy = 0;
    if(obs == "RAA" || obs == "RpA" || obs == "RpARAA") vy = 1;
    else if(obs == "LcD0") vy = -10;

    if(vy > ymin && vy < ymax)
    {
        var vline = d3.select("svg").select("g")
            .append('line')
            .attr("class", "hline")
            .attr('id', 'vline')
            .attr('x1', function() { return x(xmin); })
            .attr('x2', function() { return x(xmax); })
            .attr('y1', function() { return y(vy); })
            .attr('y2', function() { return y(vy); })
            .attr('stroke', '#333')
            .attr('stroke-dasharray', '5,3')
            .attr('opacity', document.getElementById('btnvline').value);
    }

    var xAxis = d3.select("svg").select("g").append('g')
        .attr('transform', 'translate(0,' + chartHeight + ')')
        .attr("class", "axis")
        .call( d3.axisBottom(x).tickSize(ticksize).ticks(ticksx).tickSizeOuter(0).tickPadding(6*Math.pow(document.documentElement.clientWidth/document.documentElement.clientHeight, 0.3)) );
    var yAxis = d3.select("svg").select("g").append('g')
        .attr('transform', 'translate(0,0)')
        .attr("class", "axis")
        .call( d3.axisLeft(y).tickSize(ticksize).ticks(ticksy).tickSizeOuter(0).tickPadding(5*Math.pow(document.documentElement.clientWidth/document.documentElement.clientHeight, 0.6)) );
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
              (chartHeight + margin.top + margin.bottom/1.3) + ")")
        .style("text-anchor", "middle")

    if(document.getElementById('xvariable').value === "pT")
    {
        xtitle.append('tspan').attr('class', 'axistitle')
            .text('p')
            .append('tspan').attr('class', 'axistitlesub')
            .text('T');
        xtitle.append('tspan').attr('class', 'axistitle')
            .text(' (GeV/c)');
    }
    else if(document.getElementById('xvariable').value === "y")
    {
        xtitle.append('tspan').attr('class', 'axistitle')
            .text('y')
            .append('tspan').attr('class', 'axistitlesub')
            .text('CM');
    }
    else if(document.getElementById('xvariable').value === "absy")
    {
        xtitle.append('tspan').attr('class', 'axistitle')
            .text('|y')
            .append('tspan').attr('class', 'axistitlesub')
            .text('CM');
        xtitle.append('tspan').attr('class', 'axistitle')
            .text('|');
    }
    else if(document.getElementById('xvariable').value === "cent")
    {
        xtitle.append('tspan').attr('class', 'axistitle')
            .text('Centrality');
    }
    else if(document.getElementById('xvariable').value === "Npart")
    {
        xtitle.append('tspan').attr('class', 'axistitle')
            .text('N')
            .append('tspan').attr('class', 'axistitlesub')
            .text('part');
    }

    var ytitle = svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", margin.left / 3.8)
        .attr("x", 0 - (margin.top + chartHeight / 2.))
        .attr("class", "ytitle")
        .style("text-anchor", "middle")

    if(obs === "RAA")
    {
        ytitle.append('tspan').attr('class', 'axistitle')
            .text('R')
            .append('tspan').attr('class', 'axistitlesub')
            .text('AA');
    }
    else if(obs === "RpA")
    {
        ytitle.append('tspan').attr('class', 'axistitle')
            .text('R')
            .append('tspan').attr('class', 'axistitlesub')
            .text('pA');
    }
    else if(obs === "RpARAA")
    {
        ytitle.append('tspan').attr('class', 'axistitle')
            .text('R')
            .append('tspan').attr('class', 'axistitlesub')
            .text('pA');
        ytitle.append('tspan').attr('class', 'axistitle')
            .text(', R')
            .append('tspan').attr('class', 'axistitlesub')
            .text('AA');
    }
    else if(obs === "v2")
    {
        ytitle.append('tspan').attr('class', 'axistitle')
            .text('v')
            .append('tspan').attr('class', 'axistitlesub')
            .text('2');
    }
    else if(obs === "v3")
    {
        ytitle.append('tspan').attr('class', 'axistitle')
            .text('v')
            .append('tspan').attr('class', 'axistitlesub')
            .text('3');
    }
    else if(obs === "vn")
    {
        ytitle.append('tspan').attr('class', 'axistitle')
            .text('v')
            .append('tspan').attr('class', 'axistitlesub')
            .text('n');
    }
    else if(obs === "LcD0")
    {
        ytitle.append('tspan').attr('class', 'axistitle')
            .text('L')
            .append('tspan').attr('class', 'axistitlesub')
            .text('c');
        ytitle.append('tspan').attr('class', 'axistitle')
            .text(' / D')
            .append('tspan').attr('class', 'axistitlesup')
            .text('0');
    }

    var tmark = svg.append("text")
        .attr("transform",
              "translate(" + (chartWidth + margin.left) + " ," +
              margin.top*0.8 + ")")
        .attr("class", "watermark")
        .style("text-anchor", "end")
        .style("font-variant", "small-caps")
        // .style("font-weight", "bold")
        .style("font-family", "Garamond")
        .text("Generated by boundino.github.io/hinHFplot");
    
}

var vlineopacity = function() {
    var vline = d3.select("svg").select("g").select('#vline');
    if(document.getElementById('btnvline').value == 1)
    {
        vline.attr('opacity', '0')
        document.getElementById('btnvline').value = 0;
    }
    else
    {
        vline.attr('opacity', '1')
        document.getElementById('btnvline').value = 1;
    }
}


var addData = function(da, data, thecolor, kmarker, transt = 500) {

    var rects = d3.select("svg").select("g").selectAll('.rectd3'+da)
        .data(data);
    rects.enter()
        .append('rect')
        .attr('class', 'rectd3' + da)
        .merge(rects)
        .attr('x', function(d) { return Math.max(0, x(d.x) - chartWidth/80.); }) // box width = chartwidth/40.
        .attr('y', function(d) { return y(Math.min(d.y + d.systh, ymax)); })
        .attr('height', function(d) {
            return y(Math.max(d.y - d.systl, ymin)) - y(Math.min(d.y + d.systh, ymax)); })
        .attr('width', function(d) {
            var low = x(d.x) - chartWidth/80.;
            if(low < 0) { low = 0; }
            var high = x(d.x) + chartWidth/80.;
            if(high > chartWidth) { high = chartWidth; }
            if(high > low) { return (high - low); }
            else { return 0; }})
        .transition().duration(transt)
        .attr('fill', thecolor)
        .attr('stroke', thecolor)
        .attr('stroke-width', '1px')
        .attr('opacity', function(d) {
            if(d.x > xmin && d.x < xmax && d.y > ymin && d.y < ymax) { return 0.25; }
            else { return 0; }
        });

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
        .transition().duration(transt)
        .attr('stroke', thecolor)
        .attr('stroke-width', width/100.*0.3)
        .attr('opacity', function(d) {
	    if(d.x > xmin && d.x < xmax && d.y > ymin && d.y < ymax) { return 1; }
            else { return 0; }
        });
    ;

    var points = d3.select("svg").select("g").selectAll('.pointd3'+da)
        .data(data);
    if(kmarker==20) { m20(da, points, thecolor, transt); }
};

var m20 = function(da, point, thecolor, transt = 500)
{
    point.enter()
        .append('circle')
        .attr('class', 'pointd3' + da)
        .merge( point )
        .attr('cx', function(d) { return x(d.x); })
        .attr('cy', function(d) { return y(d.y); })
        .attr('r', width/120.)
        .transition().duration(transt)
        .attr('fill', thecolor)
        .attr('opacity', function(d) {
            if(d.x > xmin && d.x < xmax && d.y > ymin && d.y < ymax) { return 1; }
            else { return 0; }
        });
};

var drawall = function(transt = 500)
{
    d3.selectAll("svg > *").remove();
    setsvg();

    var checkb = document.getElementsByTagName("input");
    for(var i=0; i<checkb.length; i++)
    {
        if(checkb[i].type == 'checkbox')
        {
            if(!checkb[i].checked) continue;
            var da = checkb[i].id.replace("check_", "");
            var thisitem = dataset[da];
            addData(da, thisitem.data, document.getElementById('color_'+da).value, 20, transt);
        }
    }

    addref();
}

var drawallwleg = function(transt = 500)
{
    drawall(transt);
    alllegend(transt);
}

var drawallnoleg = function(transt = 500)
{
    drawall(transt);
    legs = [];
}

var draw = function(da, transt = 500)
{
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
        d3.select("svg").select("g").selectAll('.rectd3'+da).transition().attr('opacity', 0).duration(transt);
        d3.select("svg").select("g").selectAll('.lined3'+da).transition().attr('opacity', 0).duration(transt);
        d3.select("svg").select("g").selectAll('.pointd3'+da).transition().attr('opacity', 0).duration(transt);
    }
    
    addref();
}

function colorall(transt = 500)
{
    var colorb = document.getElementsByTagName("input");
    for(var i=0; i<colorb.length; i++)
    {
        if(colorb[i].type == 'color')
        {
            var da = colorb[i].id.replace("color_", "");
            var cc = Math.floor(Math.random()*16777215).toString(16);
            var ccl = cc.length;
            if(ccl < 6)
            { for(var ic = 0; ic<(6-ccl); ic++) { cc = '0' + cc; } }
            cc = '#' + cc;
            colorb[i].value = cc;

            d3.select("svg").select("g").selectAll('.rectd3'+da).attr('fill', cc);
            d3.select("svg").select("g").selectAll('.rectd3'+da).attr('stroke', cc);
            d3.select("svg").select("g").selectAll('.lined3'+da).transition().attr('stroke', cc).duration(transt);
            d3.select("svg").select("g").selectAll('.pointd3'+da).transition().attr('fill', cc).duration(transt);

            if(!document.getElementById("check_"+da).checked) continue;
            d3.select("svg").select("#legendmark_"+da).transition().style('fill', cc).duration(transt);
        }
    }

    addref();
}

function clearall()
{
    var checkm = document.getElementsByClassName("checkmark");
    for(var i=0; i<checkm.length; i++)
        checkm[i].style = '';
    
    var checkb = document.getElementsByTagName("input");
    for(var i=0; i<checkb.length; i++)
    {
        var da;
        if(checkb[i].type == 'checkbox')
        {
            checkb[i].checked = false;
            da = checkb[i].id.replace("check_", "");
        }
        d3.select("svg").select("g").selectAll('.rectd3'+da).transition().attr('opacity', 0).duration(500);
        d3.select("svg").select("g").selectAll('.lined3'+da).transition().attr('opacity', 0).duration(500);
        d3.select("svg").select("g").selectAll('.pointd3'+da).transition().attr('opacity', 0).duration(500);
    }
    addref();

    d3.select("svg").selectAll('.legend').attr('opacity', 0).transition().duration(500);
    setTimeout(function() {
        d3.select("svg").selectAll('.legend').remove();
    }, 500);
    legs = [];
}

function legend(da, trans = 500)
{
    var icheck = document.getElementById('check_' + da);
    if(!icheck.checked)
    {
        // remove legend;
        ilegend = svg.select('#legend_'+da);
        ilegend.remove();
        var ileg = legs.indexOf(da);
        legs.splice(ileg, 1);
        for(var l=ileg; l<legs.length; l++)
        {
            var lleg = d3.select('svg').select('#legend_' + legs[l]);
            lleg.transition().attr("y", y0 + dy*l).duration(trans);
        }
    }
    else
    {
        // add legend
        var thisitem = dataset[da];
        var ynow = y0 + legs.length*dy; 
        legs.push(da);
        var tlegend = svg.append("text")
            .attr("x", x0)
            .attr("y", ynow)
            .attr("class", "legend")
            .attr("id", "legend_" + da)
            .attr('opacity', '0')
	    .style("text-anchor", "start");
        tlegend.append('tspan')
            .attr("class", "legendmark")
            .attr("id", "legendmark_" + da)
            .style("fill", document.getElementById('color_'+da).value)
            .text(decodehtml("&#9679; "));
        tlegend.append('tspan')
            .style("class", "legendlabel")
            .style("font-weight", "bold")
            .text(' ' + decodehtml(thisitem.particle));
        tlegend.append('tspan')
            .style("class", "legendlabel")
            .text(' ' + thisitem.collab);
        tlegend.append('tspan')
            .style("class", "legendlabel")
            .style("font-style", "italic")
            .text(' ' + thisitem.collision + ' ' + thisitem.energy);
        if(thisitem.kinea != "" || thisitem.kineb != "")
        {
            tlegend.append('tspan')
                .style("class", "legendlabel")
                .text(', ');
        }
        if(thisitem.kinea != "")
        {
            tlegend.append('tspan')
                .style("class", "legendlabel")
                .text(decodehtml(thisitem.kinea));
        }
        if(thisitem.kineb != "")
        {
            tlegend.append('tspan')
                .style("class", "legendlabel")
                .text(' ' + decodehtml(thisitem.kineb));
        }

        tlegend.transition().attr('opacity', document.getElementById('btnlegend').value).duration(trans);
    }
}

function relegend(da, transt = 500)
{
    var icheck = document.getElementById('check_' + da);
    var cc = document.getElementById('color_' + da).value;
    // var ileg = d3.select('svg').select('#legend_' + da);
    if(icheck.checked)
    {
        d3.select("svg").select("#legendmark_"+da).transition().style('fill', cc).duration(transt);
    }
}

function alllegend(transt = 500)
{
    var copy_legs = legs;
    legs = [];
    for(var l=0; l<copy_legs.length; l++)
        legend(copy_legs[l], transt);
}

function movelegendx()
{
    x0 = margin.left + chartWidth/89.*(document.getElementById('x0range').value-10);
    d3.select("svg").selectAll(".legend").attr("x", x0);
    document.getElementById('tx0').innerText = " " + document.getElementById('x0range').value;
}

function movelegendy()
{
    for(var l=0; l<legs.length; l++)
    {
        y0 = margin.top + chartHeight/89.*(document.getElementById('y0range').value-10);
        d3.select("svg").select("#legend_" + legs[l]).attr("y", y0 + l*dy);;
    }
    document.getElementById('ty0').innerText = " " + document.getElementById('y0range').value;
}

var legendopacity = function() {
    var tlegend = d3.select("svg").selectAll('.legend');
    if(document.getElementById('btnlegend').value == 1)
    {
        tlegend.transition().attr('opacity', '0').duration(500);
        document.getElementById('btnlegend').value = 0;
    }
    else
    {
        tlegend.transition().attr('opacity', '1').duration(500);
        document.getElementById('btnlegend').value = 1;
    }
}

window.addEventListener("resize", function() { drawallwleg(0); });
