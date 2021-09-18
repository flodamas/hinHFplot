function changeyto(id, nexty, transt = 0)
{
    var original = svg.select('#'+id).attr("transform");
    var thisx = original.replace('translate(', '');
    thisx = thisx.replace(/,.+/, '');
    svg.select('#'+id).transition().attr("transform", 'translate(' + thisx + ',' + nexty + ')').duration(transt);
}

function changexto(id, nextx, transt = 0)
{
    var original = svg.select('#'+id).attr("transform");
    var thisy = original.replace(/[^,]*,/, '');
    thisy = thisy.replace(')', '');
    svg.select('#'+id).transition().attr("transform", 'translate(' + nextx + ',' + thisy + ')').duration(transt);
}

function parsescript(pa)
{
    var results = [];
    while(pa.length > 0)
    {
     	var i = pa.indexOf("<su"), j = pa.indexOf("</su");
        var substr = "";
        if(i > 0) substr = pa.substring(0, i);
        else if(j > 0) substr = pa.substring(0, j);
        else substr = pa;
	pa = pa.replace(substr, "");

        var icl = "";
	if(substr.indexOf("<sub>") > -1) { icl = icl + " tsub"; substr = substr.replace("<sub>", ""); }
        if(substr.indexOf("<sup>") > -1) { icl = icl + " tsup"; substr = substr.replace("<sup>", ""); }
	if(substr.indexOf("</su") > -1) substr = substr.replace(substr.substring(0, 6), "");

        results.push({
            content : substr,
            cl : icl
        });
    }
    return results;
}

function legenditem(tlegend, thisitem, type=1)
{
    var type_legend = document.getElementById('btnlegend').value;

    // particle
    var rpa = parsescript(thisitem.particle);
    for(var p in rpa)
    {
        tlegend.append('tspan')
            .attr("class", rpa[p].cl)
            .style("font-weight", "bold")
            .text(type_legend==0?'':decodehtml(rpa[p].content));
    }
    // collab
    if(type_legend != 0)
    {
    tlegend.append('tspan')
            .text(' ' + thisitem.collab);
    }
    // collision
    if(type_legend != 4 && type_legend != 0)
    {
        tlegend.append('tspan')
            .style("font-style", "italic")
            .text(' ' + thisitem.collision + ' ' + thisitem.energy);
    }
    // kinea
    if(thisitem.kinea != "" && type_legend != 3 && type_legend != 0)
    {
        var rpa = parsescript(thisitem.kinea);
        rpa[0].content = ", " + rpa[0].content;
        for(var p in rpa)
        {
            tlegend.append('tspan')
                .attr("class", rpa[p].cl)
                .text(decodehtml(rpa[p].content));
        }
    }
    // kineb
    if(thisitem.kineb != "" && type_legend != 2 && type_legend != 0)
    {
        var rpa = parsescript(thisitem.kineb);
        rpa[0].content = ", " + rpa[0].content;
        for(var p in rpa)
        {
            tlegend.append('tspan')
                .attr("class", rpa[p].cl)
                .text(decodehtml(rpa[p].content));
        }
    }
}

function legend(da, trans = 500)
{
    var icheck = document.getElementById('check_' + da);
    if(!icheck.checked) // remove legend
    {
        svg.select('#legend_'+da).remove();
        svg.select('#legendmark_'+da).remove();
        var ileg = legs.indexOf(da);
        legs.splice(ileg, 1);
        for(var l=ileg; l<legs.length; l++)
        {
            d3.select('svg').select('#legend_' + legs[l])
                .transition().attr("y", y0 + dy*l).duration(trans);
            changeyto("legendmark_"+legs[l], y0 + dy*l, trans);
        }
    }
    else  // add legend
    {
        var thisitem = dataset[da];
        var ynow = y0 + legs.length*dy;
        legs.push(da);
        var tlegend = svg.append("text")
            .attr("x", x0 + dxmark)
            .attr("y", ynow)
            .attr("class", "legend")
            .attr("dominant-baseline", "central")
            .attr("id", "legend_" + da)
            .attr('opacity', '0')
            .style("text-anchor", "start");
        legenditem(tlegend, thisitem);
        legendmarker(da, x0, ynow, trans);
        tlegend.transition().attr('opacity', 1.).duration(trans);
    }
}

function legendmarker(da, xx, yy, transt)
{
    var kmarker = document.getElementById('marker_'+da).value;
    var thecolor = document.getElementById('color_'+da).value;
    svg.append('path')
        .attr("d", d3.symbol().type(vopt[kmarker].type).size(marker_size()*vopt[kmarker].offset[0]))
	.attr("transform", function(d) { return "translate(" + xx + "," + yy + ")"; })
        .attr('id', 'legendmark_' + da)
        .attr('class', 'legendmark')
        .attr('fill', vopt[kmarker].fill==1?thecolor:'transparent')
        .attr('stroke', thecolor)
        .attr('stroke-width', stroke_width())
        .attr('opacity', 0).transition()
        .attr('opacity', document.getElementById('btnlegend').value==0?0:1).duration(transt);
}

function relegend(da, transt = 500) // change color
{
    var icheck = document.getElementById('check_' + da);
    var kmarker = document.getElementById('marker_'+da).value;
    var thecolor = document.getElementById('color_'+da).value;
    if(icheck.checked)
    {
        d3.select("svg").select("#legendmark_"+da).transition()
            .attr("d", d3.symbol().type(vopt[kmarker].type).size(marker_size()*vopt[kmarker].offset[0]))
            .attr('stroke', thecolor)
            .attr('fill', vopt[kmarker].fill==1?thecolor:'transparent')
            .duration(transt);
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
    d3.select("svg").selectAll(".legend").attr("x", x0+dxmark);
    d3.select("svg").selectAll(".legendmark").each(function() {
        changexto( d3.select(this).attr('id'), x0 );
    })
    document.getElementById('tx0').innerText = " " + document.getElementById('x0range').value;
}

function movelegendy()
{
    for(var l=0; l<legs.length; l++)
    {
        y0 = margin.top + chartHeight/89.*(document.getElementById('y0range').value-10);
        d3.select("svg").select("#legend_" + legs[l]).attr("y", y0 + l*dy);
        changeyto( "legendmark_" + legs[l], y0 + l*dy );
    }
    document.getElementById('ty0').innerText = " " + document.getElementById('y0range').value;
}

function legendopacity() {
    var next = {1 : 2, 2 : 3, 3 : 4, 4 : 0, 0 : 1};
    var newtype = next[document.getElementById('btnlegend').value];
    document.getElementById('btnlegend').value = newtype;
    d3.select("svg").selectAll('.legend').remove();
    d3.select("svg").selectAll('.legendmark').remove();
    alllegend(0);
}

