// set scale
function setscale()
{
    width = document.getElementById('rightpad').clientWidth*0.93;
    height = width * 0.76;

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
    changerangewlog();

    x0 = margin.left + chartWidth/89.*(document.getElementById('x0range').value-10);
    y0 = margin.top + chartHeight/89.*(document.getElementById('y0range').value-10);
    dy = chartHeight/17.; // 
    dxmark = chartWidth/45.; // 

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
    var ticksx = checklogx()?5:8, ticksy = checklogy()?5:5;
    var ticksize = -5;
    d3.select("svg").select("g").append('g')
        .attr('transform', 'translate(0,' + chartHeight + ')')
        .attr("class", "grid")
        .attr('opacity', document.getElementById('btngrid').value)
        .attr('stroke-width', stroke_width_axis())
        .call( d3.axisBottom(x).tickSize(-chartHeight).ticks(ticksx).tickFormat("").tickSizeOuter(0) );
    d3.select("svg").select("g").append('g')
        .attr('transform', 'translate(0,0)')
        .attr("class", "grid")
        .attr('opacity', document.getElementById('btngrid').value)
        .attr('stroke-width', stroke_width_axis())
        .call( d3.axisLeft(y).tickSize(-chartWidth).ticks(ticksy).tickFormat("").tickSizeOuter(0) );

    // ==> Axis <==
    var xaxis = d3.axisBottom(x).tickSize(ticksize).tickSizeOuter(0).tickPadding(6*Math.pow(document.documentElement.clientWidth/document.documentElement.clientHeight, 0.3));
    if(checklogx()) xaxis.ticks(ticksx, "");
    else xaxis.ticks(ticksx);
    var yaxis = d3.axisLeft(y).tickSize(ticksize).tickSizeOuter(0).tickPadding(5*Math.pow(document.documentElement.clientWidth/document.documentElement.clientHeight, 0.6));
    if(checklogy()) yaxis.ticks(ticksy, "");
    else yaxis.ticks(ticksy);
    d3.select("svg").select("g").append('g')
        .attr('transform', 'translate(0,' + chartHeight + ')')
        .attr("class", "axis")
        .call( xaxis );
    d3.select("svg").select("g").append('g')
        .attr('transform', 'translate(0,0)')
        .attr("class", "axis")
        .call( yaxis );
    d3.select("svg").select("g").append('g')
        .attr('transform', 'translate(0,0)')
        .attr("class", "axis")
        .call( d3.axisBottom(x).tickFormat("").tickSize(0).ticks(ticksx).tickSizeOuter(0) );
    d3.select("svg").select("g").append('g')
        .attr('transform', 'translate(' + chartWidth + ',0)')
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
        .style("font-variant", "small-caps")
    // .style("font-weight", "bold")
        .style("font-family", "Garamond")
        .text("Generated by boundino.github.io/hinHFplot");
}

var vlineopacity = function(transt = 400)
{
    var vline = d3.select("svg").select("g").select('#vline');
    var vo = 1 - document.getElementById('btnvline').value;
    vline.transition().attr('opacity', vo).duration(transt);
    document.getElementById('btnvline').value = vo;
}

var drawdisplay = function(da, transt = 400)
{
    d3.select("svg").select("g").selectAll('.rectd3'+da).transition().attr('opacity', shadowopacity*drawornot(da, 'rect')).duration(transt);
    d3.select("svg").select("g").selectAll('.rectld3'+da).transition().attr('opacity', 1.*drawornot(da, 'rectl')).duration(transt);
    d3.select("svg").select("g").selectAll('.rectvd3'+da).transition().attr('opacity', shadowopacity*drawornot(da, 'rectv')).duration(transt);
    d3.select("svg").select("g").selectAll('.rectvld3'+da).transition().attr('opacity', 1.*drawornot(da, 'rectvl')).duration(transt);
    d3.select("svg").select("g").selectAll('.linevd3'+da).transition().attr('opacity', 1.*drawornot(da, 'linev')).duration(transt);
}

var changedisplay = function(da, transt = 400)
{
    changetonext('display_'+da);
    drawdisplay(da, transt);
}

var binningopacity = function(transt = 400)
{
    changetonext('btnbinning');
    var checkb = document.getElementsByTagName("input");
    for(var i=0; i<checkb.length; i++)
    {
        if(checkb[i].type !== 'checkbox') continue;
        var da = checkb[i].id.replace("check_", "");
        document.getElementById('display_'+da).value = document.getElementById('btnbinning').value;

     	if(!checkb[i].checked) continue;
        drawdisplay(da, transt);
    }
}

var gridopacity = function(transt=500) {
    var grid = d3.select("svg").select("g").selectAll('.grid');
    var next = {0 : 1, 1 : 0.8, 0.8 : 0.4, 0.4 : 0.2, 0.2 : 0};
    var newopa = next[document.getElementById('btngrid').value];
    grid.transition().attr('opacity', newopa).duration(transt);
    document.getElementById('btngrid').value = newopa;
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
            addData(da, thisitem.data, document.getElementById('color_'+da).value, document.getElementById('marker_'+da).value, transt);
        }
    }

    // addref();
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
        d3.select("svg").select("g").selectAll('.rectld3'+da).remove();
        d3.select("svg").select("g").selectAll('.rectvd3'+da).remove();
        d3.select("svg").select("g").selectAll('.rectvld3'+da).remove();
        d3.select("svg").select("g").selectAll('.lined3'+da).remove();
        d3.select("svg").select("g").selectAll('.linevd3'+da).remove();
        d3.select("svg").select("g").selectAll('.pointd3'+da).remove();

        var thisitem = dataset[da];
        addData(da, thisitem.data, document.getElementById('color_'+da).value, document.getElementById('marker_'+da).value);
        addoneref(da, document.getElementById('reference'));
    }
    else
    {
        d3.select("svg").select("g").selectAll('.rectd3'+da).transition().attr('opacity', 0).duration(transt);
        d3.select("svg").select("g").selectAll('.rectld3'+da).transition().attr('opacity', 0).duration(transt);
        d3.select("svg").select("g").selectAll('.rectvd3'+da).transition().attr('opacity', 0).duration(transt);
        d3.select("svg").select("g").selectAll('.rectvld3'+da).transition().attr('opacity', 0).duration(transt);
        d3.select("svg").select("g").selectAll('.lined3'+da).transition().attr('opacity', 0).duration(transt);
        d3.select("svg").select("g").selectAll('.linevd3'+da).transition().attr('opacity', 0).duration(transt);
        d3.select("svg").select("g").selectAll('.pointd3'+da).transition().attr('opacity', 0).duration(transt);
        rmoneref(da);
    }

    // addref();
}

function changeone(da, transt = 500)
{
    if(document.getElementById('check_' + da).checked)
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
        
        relegend(da, transt);
        coloroneref(da);
    }
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
            document.getElementById('color_'+da).value = cc;
            changeone(da, transt);
        }
    }

    // addref();
}

function clearall()
{
    var checkm = document.getElementsByClassName("checkmark");
    for(var i=0; i<checkm.length; i++)
        checkm[i].style = '';

    var checkb = document.getElementsByTagName("input");
    for(var i=0; i<checkb.length; i++)
    {
        if(checkb[i].type == 'checkbox')
        {
            if(checkb[i].checked == false) continue;
            var da = checkb[i].id.replace("check_", "");
            d3.select("svg").select("g").selectAll('.rectd3'+da).transition().attr('opacity', 0).duration(500);
            d3.select("svg").select("g").selectAll('.rectld3'+da).transition().attr('opacity', 0).duration(500);
            d3.select("svg").select("g").selectAll('.rectvd3'+da).transition().attr('opacity', 0).duration(500);
            d3.select("svg").select("g").selectAll('.rectvld3'+da).transition().attr('opacity', 0).duration(500);
            d3.select("svg").select("g").selectAll('.lined3'+da).transition().attr('opacity', 0).duration(500);
            d3.select("svg").select("g").selectAll('.linevd3'+da).transition().attr('opacity', 0).duration(500);
            d3.select("svg").select("g").selectAll('.pointd3'+da).transition().attr('opacity', 0).duration(500);
            rmoneref(da);
            checkb[i].checked = false;
        }
    }

    d3.select("svg").selectAll('.legend').attr('opacity', 0).transition().duration(500);
    d3.select("svg").selectAll('.legendmark').attr('opacity', 0).transition().duration(500);
    setTimeout(function() {
        d3.select("svg").selectAll('.legend').remove();
        d3.select("svg").selectAll('.legendmark').remove();
    }, 500);
    legs = [];
}

window.addEventListener("resize", function() { drawallwleg(0); });

function changescale(id, transt = 500)
{
    var btnlog = document.getElementById(id);
    btnlog.value = 1 - btnlog.value;
    if(btnlog.value == 1)
    {
        btnlog.style.backgroundColor = "#1f77b4";
        btnlog.style.color = "white";
    }
    else
    {
        btnlog.style.backgroundColor = "#f5f5f5";
        btnlog.style.color = "black";
    }    
    drawall(transt);
    alllegend(transt);
}
