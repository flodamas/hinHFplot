var obss = [
    { name: "RAA",         title: "RAA",            pymin: 0,     pymin_log: 0.1,  pymax: 1.5 },
    { name: "RpA",         title: "RpA",            pymin: 0,     pymin_log: 0.1,  pymax: 1.8 },
    { name: "RpARAA",      title: "RpA, RAA",       pymin: 0,     pymin_log: 0.1,  pymax: 1.5 },
    { name: "v2",          title: "v2",             pymin: -0.03, pymin_log: 0.02, pymax: 0.24 },
    { name: "v3",          title: "v3",             pymin: -0.03, pymin_log: 0.02, pymax: 0.2 },
    { name: "vn",          title: "vn",             pymin: -0.03, pymin_log: 0.02, pymax: 0.24 },
    { name: "LcToD0",      title: "&Lambda;c/D0",   pymin: 0,     pymin_log: 0.1,  pymax: 0.9 },
    { name: "Ratio",       title: "Particle ratio", pymin: 0,     pymin_log: 0.15, pymax: 0.9 },
    { name: "DoubleRatio", title: "Double ratio",   pymin: 0,     pymin_log: 0.1,  pymax: 2 },
];

var vars = [
    { name: "pT",    title: "pT",         pxmin: 0,    pxmin_log: 1,   pxmax: 40 },
    { name: "y",     title: "y",          pxmin: -4.5, pxmin_log: 0.1, pxmax: 4.5 },
    { name: "absy",  title: "|y|",        pxmin: 0,    pxmin_log: 0.1, pxmax: 4 },
    { name: "Npart", title: "Npart",      pxmin: 0,    pxmin_log: 7,   pxmax: 450 },
    { name: "cent",  title: "Centrality", pxmin: 0,    pxmin_log: 4,   pxmax: 100 },
];

function defaultrange()
{
    var iiobs = iobs(document.getElementById('observable').value),
        iivar = ivar(document.getElementById('xvariable').value);
    document.getElementById('pxmin').value = iivar.pxmin;
    document.getElementById('pxmax').value = iivar.pxmax;
    document.getElementById('pymin').value = iiobs.pymin;
    document.getElementById('pymax').value = iiobs.pymax;
}

function loadoptions()
{
    for(var i=0; i<obss.length; i++)
    {
        var opt = document.createElement('option');
        opt.value = obss[i].name;
        opt.innerHTML = obss[i].title;
        document.getElementById('observable').appendChild(opt);
    }
    for(var i=0; i<vars.length; i++)
    {
        var opt = document.createElement('option');
        opt.value = vars[i].name;
        opt.innerHTML = vars[i].title;
        document.getElementById('xvariable').appendChild(opt);
    }
}

function decodehtml(str)
{
    var temp = document.createElement("p");
    temp.innerHTML = str;
    var result = temp.innerText;
    temp.remove();
    return result;
}

function unityzero()
{
    var obs = document.getElementById('observable').value;
    var vy = 0;
    if(obs == "RAA" || obs == "RpA" || obs == "RpARAA" || obs == "DoubleRatio") vy = 1;
    return vy;
};

function iobs(name)
{
    var i=0;
    for(; i<obss.length; i++)
        if(obss[i].name === name)
            break;
    return obss[i];
}

function ivar(name)
{
    var i=0;
    for(; i<vars.length; i++)
        if(vars[i].name === name)
            break;
    return vars[i];
}

