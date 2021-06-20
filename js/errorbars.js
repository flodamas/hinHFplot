
var width, height;
var svg;
var margin, chartWidth, chartHeight;

var xmin, xmax, ymin, ymax;
var x, y;

// legend -->
var x0, y0, dy;
var ynow = -1;
var legys = {};
// <-- legend

var setscale = function()
{
    width = document.getElementById('rightpad').clientWidth*0.85;
    height = width * 0.695;

    svg = d3.select('svg').attr('width', width).attr('height', height);

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

    x0 = margin.left + chartWidth/6.;
    y0 = margin.top + chartHeight/9.;
    if(ynow < 0)
        ynow = y0;
    dy = chartHeight/15.;
}

// create svg
var setsvg = function()
{
    setscale();
    var g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
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

    var obs = document.getElementById('observable').value;
    var vy = 0;
    if(obs == "RAA") vy = 1;
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
            .attr('stroke', '#bbb')
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
              (chartHeight + margin.top + margin.bottom/1.15) + ")")
        .style("text-anchor", "middle")
    if(document.getElementById('xvariable').value === "pT")
    {
        xtitle.append('tspan').attr('class', 'axistitle')
            .text('p');
        xtitle.append('tspan').attr('class', 'axistitlesub')
            .text('T');
        xtitle.append('tspan').attr('class', 'axistitle')
            .text(' (GeV/c)');
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
            .text('R');
        ytitle.append('tspan').attr('class', 'axistitlesub')
            .text('AA');
    }
    else if(obs === "v2")
    {
        ytitle.append('tspan').attr('class', 'axistitle')
            .text('v');
        ytitle.append('tspan').attr('class', 'axistitlesub')
            .text('2');
    }
    else if(obs === "v3")
    {
        ytitle.append('tspan').attr('class', 'axistitle')
            .text('v');
        ytitle.append('tspan').attr('class', 'axistitlesub')
            .text('3');
    }
    else if(obs === "vn")
    {
        ytitle.append('tspan').attr('class', 'axistitle')
            .text('v');
        ytitle.append('tspan').attr('class', 'axistitlesub')
            .text('n');
    }
    else if(obs === "LcD0")
    {
        ytitle.append('tspan').attr('class', 'axistitle')
            .text('L');
        ytitle.append('tspan').attr('class', 'axistitlesub')
            .text('c');
        ytitle.append('tspan').attr('class', 'axistitle')
            .text(' / D');
        ytitle.append('tspan').attr('class', 'axistitlesup')
            .text('0');
    }

    var tmark = svg.append("text")
        .attr("transform",
              "translate(" + (chartWidth + margin.left) + " ," +
              margin.top*0.8 + ")")
        .attr("class", "watermark")
        .style("text-anchor", "end")
    tmark.append('tspan')
        .style("font-variant", "small-caps")
        .text("Generated by boundino.github.io/hinHFplot");
    // tmark.append('tspan')
    //     .text("boundino.github.io/hinHFplot");
    
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
        .attr('height', function(d) { return y(Math.max(d.y - d.systl, ymin)) - y(Math.min(d.y + d.systh, ymax)); })
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
        .attr('stroke-width', '2px')
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
    ynow = y0;

    var checkb = document.getElementsByTagName("input");
    for(var i=0; i<checkb.length; i++)
    {
        if(checkb[i].type == 'checkbox')
        {
            if(!checkb[i].checked) continue;
            var da = checkb[i].id.replace("check_", "");
            var thisitem = dataset[da];
            addData(da, thisitem.data, document.getElementById('color_'+da).value, 20, transt);
            legend(da, transt);
        }
    }
    addref();
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
    
    legend(da, transt);
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
            console.log(d3.select("svg").select("#legendmark_"+da));
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
}

function legend(da, trans = 500)
{
    var icheck = document.getElementById('check_' + da);
    if(!icheck.checked)
    {
        ynow = ynow - dy;
        ilegend = svg.select('#legend_'+da);
        ilegend.remove();
        var trs = document.getElementsByTagName('tr');
        for(var l=0; l<trs.length; l++)
        {
            var ida = trs[l].id.replace("tr_", "");
            if(!(document.getElementById("check_" + ida).checked))
                continue;
            if(legys["legend_" + ida] > legys["legend_" + da])
            {
                var ileg = d3.select('svg').select('#legend_' + ida);
                console.log(ileg);
                ileg.transition().attr("y", legys["legend_" + ida] - dy).duration(trans);
                legys["legend_" + ida] = legys["legend_" + ida] - dy;
            }
        }
    }
    else
    {
        var thisitem = dataset[da];

        legys["legend_" + da] = ynow;
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
        if(thisitem.centrality != "")
        {
            tlegend.append('tspan')
                .style("class", "legendlabel")
                .text(' ' + thisitem.centrality);
        }
        if(thisitem.rapidity != "")
        {
            tlegend.append('tspan')
                .style("class", "legendlabel")
                .text(', ' + decodehtml(thisitem.rapidity));
        }

        tlegend.transition().attr('opacity', document.getElementById('btnlegend').value).duration(trans);

        ynow = ynow + dy;
    }
}

var legendopacity = function() {
    var tlegend = d3.select("svg").selectAll('.legend');
    if(document.getElementById('btnlegend').value == 1)
    {
        tlegend.attr('opacity', '0')
        document.getElementById('btnlegend').value = 0;
    }
    else
    {
        tlegend.attr('opacity', '1')
        document.getElementById('btnlegend').value = 1;
    }
}

window.addEventListener("resize", function() { drawall(0); });
