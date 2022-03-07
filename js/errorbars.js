// set scale
function setscale()
{
    setbasic();
    svg = d3.select('svg').attr('width', width).attr('height', height)
        .attr('font-family', 'sans-serif')
        // .attr('font-family', "'Noto Sans', sans-serif")
        .attr('font-size', width/100.);

    xmin = Math.min(document.getElementById('pxmin').value,
                    document.getElementById('pxmax').value);
    xmax = Math.max(document.getElementById('pxmin').value,
                    document.getElementById('pxmax').value);
    ymin = Math.min(document.getElementById('pymin').value,
                    document.getElementById('pymax').value);
    ymax = Math.max(document.getElementById('pymin').value,
                    document.getElementById('pymax').value);
    changerangewlog();

    if(checklogx())
        x = d3.scaleLog().range([0, chartWidth]).domain([xmin, xmax]);
    else
        x = d3.scaleLinear().range([0, chartWidth]).domain([xmin, xmax]);
    if(checklogy())
        y = d3.scaleLog().range([chartHeight, 0]).domain([ymin, ymax]);
    else
        y = d3.scaleLinear().range([chartHeight, 0]).domain([ymin, ymax]);
    
}

// create svg
function setsvg()
{
    setscale();
    var g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    drawaxisgrid();
}

// axes and grid
var drawaxisgrid = function()
{
    // ==> Grid <==
    var ticksx = checklogx()?8:5, ticksy = 5;
    var ticksize = -7;
    var ismajortick = function (i) { return i%10==0; }

    d3.select("svg").select("g").append('g')
        .attr('transform', 'translate(0,' + chartHeight + ')')
        .attr("class", "grid")
        .attr('opacity', document.getElementById('btngrid').value)
        .attr('stroke-width', stroke_width_axis())
        .call( d3.axisBottom(x).tickSize(-chartHeight).tickFormat("").ticks(ticksx).tickSizeOuter(0) );
    d3.select("svg").select("g").append('g')
        .attr('transform', 'translate(0,0)')
        .attr("class", "grid")
        .attr('opacity', document.getElementById('btngrid').value)
        .attr('stroke-width', stroke_width_axis())
        .call( d3.axisLeft(y).tickSize(-chartWidth).ticks(ticksy).tickFormat("").tickSizeOuter(0) );

    // ==> Axis <==
    var addminor = function (theaxis, ticksn) {        
        var ntickval = theaxis.scale().ticks(ticksn, "");
        theaxis.tickFormat(function (d, i) { return ntickval.includes(d)?d:""; }).ticks(ticksn*5);
        return ntickval;
    }
    var xaxis = d3.axisBottom(x).tickSize(ticksize).tickSizeOuter(0).tickPadding(6*Math.pow(document.documentElement.clientWidth/document.documentElement.clientHeight, 0.3)).ticks(ticksx, "");
    var xaxismajor = checklogx()?[]:addminor(xaxis, ticksx);
    var yaxis = d3.axisLeft(y).tickSize(ticksize).tickSizeOuter(0).tickPadding(5*Math.pow(document.documentElement.clientWidth/document.documentElement.clientHeight, 0.6)).ticks(ticksy, "");
    var yaxismajor = checklogy()?[]:addminor(yaxis, ticksy);
    var shortenminor = function(the_axis, naxismajor)
    {
        the_axis.selectAll("g")
            .filter(function (d, i) { return !naxismajor.includes(d); })
            .style("stroke-dasharray", '4,6');
    }
    // xaxis
    var x_axis = d3.select("svg").select("g").append('g')
        .attr('transform', 'translate(0,' + chartHeight + ')')
        .attr('stroke-width', stroke_width_axis())
        .attr("class", "axis")
        .call( xaxis );
    if(!checklogx()) shortenminor(x_axis, xaxismajor);
    // yaxis
    var y_axis = d3.select("svg").select("g").append('g')
        .attr('transform', 'translate(0,0)')
        .attr('stroke-width', stroke_width_axis())
        .attr("class", "axis")
        .call( yaxis );
    if(!checklogy()) shortenminor(y_axis, yaxismajor);
    // xframe
    d3.select("svg").select("g").append('g')
        .attr('transform', 'translate(0,0)')
        .attr('stroke-width', stroke_width_axis())
        .attr("class", "axis")
        .call( d3.axisBottom(x).tickFormat("").tickSize(0).ticks(ticksx).tickSizeOuter(0) );
    // yframe
    d3.select("svg").select("g").append('g')
        .attr('transform', 'translate(' + chartWidth + ',0)')
        .attr('stroke-width', stroke_width_axis())
        .attr("class", "axis")
        .call( d3.axisLeft(y).tickFormat("").tickSize(0).ticks(ticksy).tickSizeOuter(0) );
    var xtitle = svg.append("text")
        .attr("transform",
              "translate(" + (chartWidth/2. + margin.left) + " ," +
              (chartHeight + margin.top + margin.bottom/1.3) + ")")
        .style("text-anchor", "middle")
    var ytitle = svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", margin.left / 3.8)
        .attr("x", 0 - (margin.top + chartHeight / 2.))
        .attr("class", "ytitle")
        .style("text-anchor", "middle")
    addaxistitle(xtitle, ytitle);

    // ==> Unity/Zero line <==
    var vline = d3.select("svg").select("g")
        .append('line')
        .attr('id', 'vline')
        .attr('x1', x(xmin))
        .attr('x2', x(xmax))
        .attr('y1', y(unityzero()))
        .attr('y2', y(unityzero()))
        .attr('stroke', '#000')
        .attr('stroke-dasharray', '5,3')
        .attr('stroke-width', stroke_width_axis())
        .attr('opacity', document.getElementById('btnvline').value)
        .attr('display', function() { return (unityzero() > ymin && unityzero() < ymax)?'default':'none'; });

    // ==> Watermark <==
    var tmark = svg.append("text")
        .attr("transform",
              "translate(" + (chartWidth + margin.left) + " ," +
              margin.top*0.8 + ")")
        .attr("class", "watermark")
        .style("text-anchor", "end")
        .text("Generated by boundino.github.io/hinHFplot");
}

var drawdisplay = function(da, transt = 400)
{
    d3.select("svg").select("g").selectAll('.rectd3'+da).transition().attr('opacity', shadowopacity*drawornot(da, 'rect')).duration(transt);
    d3.select("svg").select("g").selectAll('.rectld3'+da).transition().attr('opacity', 1.*drawornot(da, 'rectl')).duration(transt);
    d3.select("svg").select("g").selectAll('.rectvd3'+da).transition().attr('opacity', shadowopacity*drawornot(da, 'rectv')).duration(transt);
    d3.select("svg").select("g").selectAll('.rectvld3'+da).transition().attr('opacity', 1.*drawornot(da, 'rectvl')).duration(transt);
    d3.select("svg").select("g").selectAll('.linevd3'+da).transition().attr('opacity', 1.*drawornot(da, 'linev')).duration(transt);
}

var addData = function(da, data, thecolor, kmarker, transt = 500) {
    addDataRects(da, data, thecolor, transt);
    addDataLines(da, data, thecolor, transt);
    addDataPoints(da, data, thecolor, kmarker, transt);
}

var addDataRects = function(da, data, thecolor, transt = 500) {
    var fill, strokewidth, group;

    // Narrow shadow
    fill = thecolor;
    strokewidth = 0;
    group = 'rect';
    opac = shadowopacity;
    d3.select("svg").select("g").selectAll('.'+group+'d3'+da)
        .data(data)
        .enter().append('rect')
        .attr('class', group+'d3'+da)
    // .merge(rects)
        .attr('x', function(d) { return xoverflow( x(d.x) - chartWidth/80. ); }) // 
        .attr('width', function(d) { return xoverflow( x(d.x) + chartWidth/80. ) - xoverflow( x(d.x) - chartWidth/80. ); }) //
        .attr('y', function(d) { return yoverflow(y(d.y + d.systh)); })
        .attr('height', function(d) { return yoverflow(y(d.y - d.systl)) - yoverflow(y(d.y + d.systh)); }) 
        .attr('fill', fill)
        .attr('stroke', thecolor)
        .attr('stroke-width', strokewidth)
        .attr('opacity', 0).transition()
        .attr('opacity', opac*drawornot(da, group))
        .duration(transt);        

    // Wide shadow
    fill = thecolor;
    strokewidth = 0;
    group = 'rectv';
    opac = shadowopacity;
    d3.select("svg").select("g").selectAll('.'+group+'d3'+da)
        .data(data)
        .enter().append('rect')
        .attr('class', group+'d3'+da)
    // .merge(rectvs)
        .attr('x', function(d) { return xoverflow( x(d.xl) ); }) // 
        .attr('width', function(d) { return xoverflow( x(d.xh) ) - xoverflow( x(d.xl) ); }) //
        .attr('y', function(d) { return yoverflow(y(d.y + d.systh)); })
        .attr('height', function(d) { return yoverflow(y(d.y - d.systl)) - yoverflow(y(d.y + d.systh)); }) 
        .attr('fill', fill)
        .attr('stroke', thecolor)
        .attr('stroke-width', strokewidth)
        .attr('opacity', 0).transition()
        .attr('opacity', opac*drawornot(da, group))
        .duration(transt);        

    // Narrow outline
    fill = 'transparent';
    strokewidth = stroke_width()*0.85;
    group = 'rectl';
    opac = 1.0;
    d3.select("svg").select("g").selectAll('.'+group+'d3'+da)
        .data(data)
        .enter().append('rect')
        .attr('class', group+'d3'+da)
    // .merge(rectls)
        .attr('x', function(d) { return xoverflow( x(d.x) - chartWidth/80. ); }) // 
        .attr('width', function(d) { return xoverflow( x(d.x) + chartWidth/80. ) - xoverflow( x(d.x) - chartWidth/80. ); }) //
        .attr('y', function(d) { return yoverflow(y(d.y + d.systh)); })
        .attr('height', function(d) { return yoverflow(y(d.y - d.systl)) - yoverflow(y(d.y + d.systh)); }) 
        .attr('fill', fill)
        .attr('stroke', thecolor)
        .attr('stroke-width', strokewidth)
        .attr('opacity', 0).transition()
        .attr('opacity', opac*drawornot(da, group))
        .duration(transt);        

    // Wide outline
    fill = 'transparent';
    strokewidth = stroke_width()*0.85;
    group = 'rectvl';
    opac = 1.0;
    d3.select("svg").select("g").selectAll('.'+group+'d3'+da)
        .data(data)
        .enter().append('rect')
        .attr('class', group+'d3'+da)
    // .merge(rectvls)
        .attr('x', function(d) { return xoverflow( x(d.xl) ); }) // 
        .attr('width', function(d) { return xoverflow( x(d.xh) ) - xoverflow( x(d.xl) ); }) //
        .attr('y', function(d) { return yoverflow(y(d.y + d.systh)); })
        .attr('height', function(d) { return yoverflow(y(d.y - d.systl)) - yoverflow(y(d.y + d.systh)); }) 
        .attr('fill', fill)
        .attr('stroke', thecolor)
        .attr('stroke-width', strokewidth)
        .attr('opacity', 0).transition()
        .attr('opacity', opac*drawornot(da, group))
        .duration(transt);        
}

var addDataLines = function(da, data, thecolor, transt = 500) {
    var kmarker = document.getElementById('marker_'+da).value;
    var delta_up = Math.sqrt(marker_size())*vopt[kmarker].offset[1],
        delta_down = Math.sqrt(marker_size())*vopt[kmarker].offset[2],
        delta_lr = Math.sqrt(marker_size())*vopt[kmarker].offset[3];

    // Error line
    var lines = d3.select("svg").select("g").selectAll('.lined3'+da)
        .data(data);
    // --> error line 1
    lines.enter().append('line')
        .attr('class', 'lined3' + da)
        .attr('x1', function(d) { return xthrow(x(d.x)); })
        .attr('x2', function(d) { return xthrow(x(d.x)); })
        .attr('y1', function(d) { return yoverflow( y(d.y + d.stath) ); })
        .attr('y2', function(d) { return yoverflow( Math.max(y(d.y) - delta_up, y(d.y + d.stath)) ); })
        .attr('stroke', thecolor)
        .attr('stroke-width', stroke_width())
        .attr('opacity', 0).transition()
        .attr('opacity', 1.0*drawornot(da, 'line'))
        .duration(transt);
    // --> error line 2
    lines.enter().append('line')
        .attr('class', 'lined3' + da)
        .attr('x1', function(d) { return xthrow(x(d.x)); })
        .attr('x2', function(d) { return xthrow(x(d.x)); })
        .attr('y1', function(d) { return yoverflow( Math.min(y(d.y) + delta_down, y(d.y - d.statl)) ); })
        .attr('y2', function(d) { return yoverflow( y(d.y - d.statl) ); })
        .attr('stroke', thecolor)
        .attr('stroke-width', stroke_width())
        .attr('opacity', 0).transition()
        .attr('opacity', 1.0*drawornot(da, 'line'))
        .duration(transt);

    // Horizontal line
    var linevs = d3.select("svg").select("g").selectAll('.linevd3'+da)
        .data(data);
    // --> horizontal line 1
    linevs.enter().append('line')
        .attr('class', 'linevd3' + da)
        .attr('x1', function(d) { return xoverflow( x(d.xl) ); })
        .attr('x2', function(d) { return xoverflow( Math.max(x(d.x) - delta_lr, x(d.xl)) ); })
        .attr('y1', function(d) { return ythrow(y(d.y)); })
        .attr('y2', function(d) { return ythrow(y(d.y)); })
        .attr('stroke', thecolor)
        .attr('stroke-width', stroke_width())
        .attr('opacity', 0).transition()
        .attr('opacity', 1.0*drawornot(da, 'linev'))
        .duration(transt);
    // --> horizontal line 2
    linevs.enter().append('line')
        .attr('class', 'linevd3' + da)
        .attr('x1', function(d) { return xoverflow( Math.min(x(d.x) + delta_lr, x(d.xh)) ); })
        .attr('x2', function(d) { return xoverflow( x(d.xh) ); })
        .attr('y1', function(d) { return ythrow(y(d.y)); })
        .attr('y2', function(d) { return ythrow(y(d.y)); })
        .attr('stroke', thecolor)
        .attr('stroke-width', stroke_width())
        .attr('opacity', 0).transition()
        .attr('opacity', 1.0*drawornot(da, 'linev'))
        .duration(transt);
}

var addDataPoints = function(da, data, thecolor, kmarker, transt = 500) {
    // Marker
    var points = d3.select("svg").select("g").selectAll('.pointd3'+da)
        .data(data)
        .enter()
        .append('path')
        .attr("d", d3.symbol().type(vopt[kmarker].type).size(marker_size()*vopt[kmarker].offset[0]))
        .attr("transform", function(d) { return "translate(" + xthrow(x(d.x)) + "," + ythrow(y(d.y)) + ")"; })
        .attr('class', 'pointd3' + da)
        .attr('fill', vopt[kmarker].fill==1?thecolor:'transparent')
        .attr('stroke', thecolor)
	.attr('stroke-width', stroke_width())
        .attr('opacity', 0).transition()
        .attr('opacity', 1.).duration(transt);
};

// ==> ONE functions
var rmone = function(da)
{
    d3.select("svg").select("g").selectAll('.rectd3'+da).remove();
    d3.select("svg").select("g").selectAll('.rectld3'+da).remove();
    d3.select("svg").select("g").selectAll('.rectvd3'+da).remove();
    d3.select("svg").select("g").selectAll('.rectvld3'+da).remove();
    d3.select("svg").select("g").selectAll('.lined3'+da).remove();
    d3.select("svg").select("g").selectAll('.linevd3'+da).remove();
    d3.select("svg").select("g").selectAll('.pointd3'+da).remove();
}

var clearone = function(da, transt = 500)
{
    d3.select("svg").select("g").selectAll('.rectd3'+da).transition().attr('opacity', 0).duration(transt);
    d3.select("svg").select("g").selectAll('.rectld3'+da).transition().attr('opacity', 0).duration(transt);
    d3.select("svg").select("g").selectAll('.rectvd3'+da).transition().attr('opacity', 0).duration(transt);
    d3.select("svg").select("g").selectAll('.rectvld3'+da).transition().attr('opacity', 0).duration(transt);
    d3.select("svg").select("g").selectAll('.lined3'+da).transition().attr('opacity', 0).duration(transt);
    d3.select("svg").select("g").selectAll('.linevd3'+da).transition().attr('opacity', 0).duration(transt);
    d3.select("svg").select("g").selectAll('.pointd3'+da).transition().attr('opacity', 0).duration(transt);
}

var drawone = function(da, transt = 500)
{
    if(checkb(da))
    {
        rmone(da);
        var thisitem = dataset[da];
        addData(da, thisitem.data, document.getElementById('color_'+da).value, document.getElementById('marker_'+da).value);
    }
    else
    {
        clearone(da);
    }
}

function changeone(da, transt = 500)
{
    var kmarker = document.getElementById("marker_"+da).value;
    var cc = document.getElementById("color_"+da).value;

    d3.select("svg").select("g").selectAll('.rectd3'+da).transition().attr('fill', cc).attr('stroke', cc).duration(transt);
    d3.select("svg").select("g").selectAll('.rectld3'+da).transition().attr('stroke', cc).duration(transt);
    d3.select("svg").select("g").selectAll('.rectvd3'+da).transition().attr('fill', cc).attr('stroke', cc).duration(transt);
    d3.select("svg").select("g").selectAll('.rectvld3'+da).transition().attr('stroke', cc).duration(transt);
    d3.select("svg").select("g").selectAll('.lined3'+da).transition().attr('stroke', cc).duration(transt);
    d3.select("svg").select("g").selectAll('.linevd3'+da).transition().attr('stroke', cc).duration(transt);

    d3.select("svg").select("g").selectAll('.pointd3'+da)
        .attr("d", d3.symbol().type(vopt[kmarker].type).size(marker_size()*vopt[kmarker].offset[0]))
        .transition()
        .attr('stroke', cc)
        .attr('fill', vopt[kmarker].fill==1?cc:'transparent')
        .duration(transt);
}

// ONE functions <==

var drawall = function(transt = 500)
{
    d3.selectAll("svg > *").remove();
    setsvg();

    var checkbs = document.getElementsByClassName("checkb");
    for(var i=0; i<checkbs.length; i++)
    {
        var da = checkbs[i].id.replace("check_", "");
        if(!checkb(da)) continue;
        var thisitem = dataset[da];
        addData(da, thisitem.data, document.getElementById('color_'+da).value, document.getElementById('marker_'+da).value, transt);
    }
}

