var width, height;
var svg;
var margin, chartWidth, chartHeight;

var xmin, xmax, ymin, ymax;
var x, y;

// legend -->
var x0, y0, dy;
var legs = [];
// <-- legend

var styles = { "rect":0,  "rectl":1,  "line":2,  "linev":3,  "rectv":4,  "rectvl":5 };
var styles_mapping = {
    0 : [1, 0, 1, 1, 0, 0],
    1 : [1, 0, 1, 0, 0, 0],
    2 : [1, 1, 1, 0, 0, 0],
    3 : [1, 1, 1, 1, 0, 0],
    4 : [0, 1, 1, 1, 0, 0],
    5 : [0, 1, 1, 0, 0, 0],
    6 : [0, 0, 1, 0, 1, 0],
    7 : [0, 0, 1, 1, 1, 0],
    8 : [0, 0, 1, 1, 1, 1],
    9 : [0, 0, 1, 0, 1, 1],
    10 : [0, 0, 1, 0, 0, 1],
    11 : [0, 0, 1, 1, 0, 1]
};
var changetonext = function(idd) {
    function next(i) { return (parseInt(i)+1) % Object.keys(styles_mapping).length; }
    document.getElementById(idd).value = next(document.getElementById(idd).value);
}
var drawornot = function(da, name) { return styles_mapping[document.getElementById('display_'+da).value][styles[name]]; }
var shadowopacity = 0.12;
var stroke_width = function() { return width/100.*0.25; }
var stroke_width_axis = function() { return width/100.*0.24; }
var marker_size = function() { return width/80.; }
var diamondoffset = 1.2,
    staroffset = 3.5,
    triangleoffset = 3.5;

var xoverflow = function(x)
{
    var val = Math.min(x, chartWidth);
    val = Math.max(val, 0);
    return val;
}
var yoverflow = function(y)
{
    var val = Math.min(y, chartHeight);
    val = Math.max(val, 0);
    return val;
}
var xthrow = function(x)
{
    if(x >=0 && x <= chartWidth) return x;
    else return 0-chartWidth*2;
}
var ythrow = function(y)
{
    if(y >=0 && y <= chartHeight) return y;
    else return 0-chartHeight*2;
}

var addaxistitle = function(xtitle, ytitle) {
    // xtitle
    if(document.getElementById('xvariable').value === "pT")
    {
        xtitle.append('tspan').attr('class', 'axistitle')
            .text('p')
            .append('tspan').attr('class', 'tsub')
            .text('T');
        xtitle.append('tspan').attr('class', 'axistitle')
            .text(' (GeV/c)');
    }
    else if(document.getElementById('xvariable').value === "y")
    {
        xtitle.append('tspan').attr('class', 'axistitle')
            .text('y')
            .append('tspan').attr('class', 'tsub')
            .text('CM');
    }
    else if(document.getElementById('xvariable').value === "absy")
    {
        xtitle.append('tspan').attr('class', 'axistitle')
            .text('|y')
            .append('tspan').attr('class', 'tsub')
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
            .text(decodehtml('&#10216;N'))
            .append('tspan').attr('class', 'tsub')
            .text('part');
        xtitle.append('tspan').attr('class', 'axistitle')
            .text(decodehtml('&#10217;'));
    }

    // ytitle
    if(document.getElementById('observable').value === "RAA")
    {
        ytitle.append('tspan').attr('class', 'axistitle')
            .text('R')
            .append('tspan').attr('class', 'tsub')
            .text('AA');
    }
    else if(document.getElementById('observable').value === "RpA")
    {
        ytitle.append('tspan').attr('class', 'axistitle')
            .text('R')
            .append('tspan').attr('class', 'tsub')
            .text('pA');
    }
    else if(document.getElementById('observable').value === "RpARAA")
    {
        ytitle.append('tspan').attr('class', 'axistitle')
            .text('R')
            .append('tspan').attr('class', 'tsub')
            .text('pA');
        ytitle.append('tspan').attr('class', 'axistitle')
            .text(', R')
            .append('tspan').attr('class', 'tsub')
            .text('AA');
    }
    else if(document.getElementById('observable').value === "v2")
    {
        ytitle.append('tspan').attr('class', 'axistitle')
            .text('v')
            .append('tspan').attr('class', 'tsub')
            .text('2');
    }
    else if(document.getElementById('observable').value === "v3")
    {
        ytitle.append('tspan').attr('class', 'axistitle')
            .text('v')
            .append('tspan').attr('class', 'tsub')
            .text('3');
    }
    else if(document.getElementById('observable').value === "vn")
    {
        ytitle.append('tspan').attr('class', 'axistitle')
            .text('v')
            .append('tspan').attr('class', 'tsub')
            .text('n');
    }
    else if(document.getElementById('observable').value === "LcToD0")
    {
        ytitle.append('tspan').attr('class', 'axistitle')
            .text(decodehtml('&Lambda;'))
            .append('tspan').attr('class', 'tsub')
            .text('c');
        ytitle.append('tspan').attr('class', 'axistitle')
            .text(' / D')
            .append('tspan').attr('class', 'tsup')
            .text('0');
    }
    else if(document.getElementById('observable').value === "Ratio")
    {
        ytitle.append('tspan').attr('class', 'axistitle')
            .text('Yield ratio');
    }
    else if(document.getElementById('observable').value === "DoubleRatio") // improvable if one can access the yield ratio name
    {
        ytitle.append('tspan').attr('class', 'axistitle')
            .text('(Yield ratio)')
            .append('tspan').attr('class', 'tsub')
            .text('AA');
        ytitle.append('tspan').attr('class', 'axistitle')
            .text(' / (Yield ratio)')
            .append('tspan').attr('class', 'tsub')
            .text('pp');
    }
}

var checklogx = function()
{
    return (document.getElementById('logx').value == 1);
}

var checklogy = function()
{
    return (document.getElementById('logy').value == 1);
}

function changerangewlog()
{
    var varkey = document.getElementById('observable').value + "+" + document.getElementById('xvariable').value;
    if(checklogx() && xmin <= 0)
    {
        xmin = drange[varkey].pxmin_log;
        document.getElementById('pxmin').value = xmin;
    }
    if(checklogx() && xmax <= 0)
    {
        xmax = 1;
        document.getElementById('pxmax').value = xmax;
    }
    if(checklogy() && ymin <= 0)
    {
        ymin = drange[varkey].pymin_log;
        document.getElementById('pymin').value = ymin;
    }
    if(checklogy() && ymax <= 0)
    {
        ymax = 1;
        document.getElementById('pymax').value = ymax;
    }
}


