
function clearitems()
{
    var datainput = document.getElementById('datainput');
    while(datainput.firstChild)
    {
        datainput.removeChild(datainput.firstChild);
    }
    // console.log(document.getElementsByTagName('tr'));    
}

function loaditem()
{
    var datainput = document.getElementById('datainput');
    clearitems();
    var obs = document.getElementById('observable').value;

    for(var da in dataset)
    {
        var thisitem = dataset[da];
        // console.log(thisitem.observable);
        // console.log(obs);
        
        if(thisitem.observable !== obs) { continue; }

        var iline = document.createElement("tr");
        iline.id = "tr_" + da;
        // iline.setAttribute('style', 'height: 4vh;');
        datainput.appendChild(iline);

        var itcheck = document.createElement("td");
        iline.appendChild(itcheck);
        var itchecklabel = document.createElement("label");
        itchecklabel.setAttribute('class', 'container');
        itcheck.appendChild(itchecklabel);
        var icheck = document.createElement("input");
        icheck.setAttribute('type', 'checkbox');
        icheck.id = "check_" + da;
        // icheck.checked = true;
        itchecklabel.appendChild(icheck);
        icheck.setAttribute('onchange', "draw('"+da+"')");
        var icheckspan = document.createElement("span");
        icheckspan.setAttribute('class', 'checkmark');
        itchecklabel.appendChild(icheckspan);

        var itparticle = document.createElement("td");
        var iparticle = document.createElement("span");
        iparticle.innerHTML = thisitem.particle;
        itparticle.appendChild(iparticle);
        iline.appendChild(itparticle);

        var itcollision = document.createElement("td");
        itcollision.innerHTML = thisitem.collision;
        iline.appendChild(itcollision);

        var itenergy = document.createElement("td");
        itenergy.innerHTML = thisitem.energy;
        iline.appendChild(itenergy);

        var itcollab = document.createElement("td");
        itcollab.innerHTML = thisitem.collab;
        iline.appendChild(itcollab);

        var itcentrality = document.createElement("td");
        itcentrality.innerHTML = thisitem.centrality;
        iline.appendChild(itcentrality);

        var itrapidity = document.createElement("td");
        itrapidity.innerHTML = thisitem.rapidity;
        iline.appendChild(itrapidity);

        var itcolor = document.createElement("td");
        iline.appendChild(itcolor);
        var icolor = document.createElement("input");
        icolor.setAttribute('type', 'color');
        icolor.id = "color_" + da;
        icolor.value = "#" + Math.floor(Math.random()*16777215).toString(16);
        icolor.setAttribute('class', 'colorpicker');
        icolor.setAttribute('onchange', "draw('" + da + "')");
        itcolor.appendChild(icolor);

    }
}
