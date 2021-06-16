
function loaditem()
{
    var datainput = document.getElementById('datainput');
    var obs = document.getElementById('observable').innerText;

    console.log(dataset);
    
    for(var da in dataset)
    {
        // console.log(da);
        
        var thisitem = dataset[da];
        if(thisitem.observable != obs) continue;

        var iline = document.createElement("div");
        iline.id = "div_" + da;
        datainput.appendChild(iline);

        var icheck = document.createElement("input");
        icheck.setAttribute('type', 'checkbox');
        icheck.id = "check_" + da;
        iline.appendChild(icheck);

        var ilabel = document.createElement("label");
        ilabel.setAttribute('for', icheck.id);
        var tlabel = thisitem.particle
            + " " + thisitem.observable
            + " " + thisitem.collision
            + " " + thisitem.energy;
        if(thisitem.xtitle == "pT (GeV/c)")
            tlabel = tlabel + " " + thisitem.centrality;
        tlabel = tlabel + " " + thisitem.collab;
        ilabel.innerText = tlabel
        ilabel.id = "label_" + da;
        iline.appendChild(ilabel);

        var icolor = document.createElement("input");
        icolor.setAttribute('type', 'color');
        icolor.id = "color_" + da;
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        icolor.value = "#" + randomColor;
        iline.appendChild(icolor);
    }
}
