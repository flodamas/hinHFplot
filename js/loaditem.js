
function clearitems()
{
    var datainput = document.getElementById('datainput');
    while(datainput.firstChild)
    {
        datainput.removeChild(datainput.firstChild);
    }
    // console.log(document.getElementsByTagName('tr'));
}

function loaditem(nomarkerpicker = 0)
{
    var datainput = document.getElementById('datainput');
    clearitems();
    var obs = document.getElementById('observable').value;
    var xvar = document.getElementById('xvariable').value;

    for(var da in dataset)
    {
        var thisitem = dataset[da];

        var ifdrawx = thisitem.xtitle == xvar ||
            (xvar == "y" && (thisitem.xtitle == "absy" || thisitem.xtitle == "ycm" || thisitem.xtitle == "absycm")) ||
            (xvar == "absy" && (thisitem.xtitle == "absycm")) ||
            false;
        var ifdrawy = thisitem.observable == obs ||
	    (obs == "vn" && (thisitem.observable == "v2" || thisitem.observable == "v3")) ||
	    (obs == "RpARAA" && (thisitem.observable == "RpA" || thisitem.observable == "RAA")) ||
	    (obs == "DsToD" && (thisitem.observable == "DsToD0" || thisitem.observable == "DsToDplusmn" || thisitem.observable == "DsToDstar")) ||
	    (obs == "Ratio" && thisitem.observable.includes("To")) ||
            (obs == "DoubleRatio" && thisitem.observable == "DoubleRatio") ||
            false;

        if(!ifdrawx || !ifdrawy) { continue; }

        var iline = document.createElement("tr");
        iline.id = "tr_" + da;
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
        var icheckmark = document.createElement("span");
        icheckmark.setAttribute('class', 'checkmark');
        icheckmark.id = "checkmark_" + da;
        itchecklabel.appendChild(icheckmark);
        icheck.setAttribute('onchange', "draw('"+da+"'); legend('"+da+"'); document.getElementById('checkmark_' + '"+da+"').style = ''; ");

        if(obs == "vn")
        {
            var itobs = document.createElement("td");
            var iobs = document.createElement("span");
            iobs.innerHTML = thisitem.observable;
            itobs.appendChild(iobs);
            iline.appendChild(itobs);
        }

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
        itcentrality.innerHTML = thisitem.kinea;
        iline.appendChild(itcentrality);

        var itrapidity = document.createElement("td");
        itrapidity.innerHTML = thisitem.kineb;
        iline.appendChild(itrapidity);

        var itcolor = document.createElement("td");
        iline.appendChild(itcolor);
        var icolor = document.createElement("input");
        icolor.setAttribute('type', 'color');
        icolor.id = "color_" + da;
        icolor.value = "#" + Math.floor(Math.random()*16777215).toString(16);
        icolor.setAttribute('class', 'colorpicker');
        icolor.setAttribute('onchange', "changeone('" + da + "'); ");
        itcolor.appendChild(icolor);
        
        var itmarker = document.createElement("td");
        iline.appendChild(itmarker);
        var imarker = document.createElement("select");
        for(var key of vorders) {
            var opt = document.createElement('option');
            opt.value = key;
            opt.innerHTML = vopt[key].option;
            imarker.appendChild(opt);
        }
        imarker.id = "marker_" + da;
        imarker.setAttribute('class', 'markerpicker');
        imarker.setAttribute('onchange', "changeone('" + da + "'); ");
        itmarker.appendChild(imarker);
        if(nomarkerpicker == 1) itmarker.style.display = 'none';

        var itdisplay = document.createElement("td");
        iline.appendChild(itdisplay);
        var idisplay = document.createElement("button");
        idisplay.setAttribute('type', 'submit');
        idisplay.id = "display_" + da;
        idisplay.innerHTML = '<i class="fas fa-paint-roller"></i>';
        idisplay.value = '6';
        idisplay.setAttribute('class', 'btnaction btndisplay');
        idisplay.setAttribute('onclick', "changedisplay('" + da + "'); ");
        itdisplay.appendChild(idisplay);
        if(nomarkerpicker == 1)
            itdisplay.style.display = 'none';
        
        itparticle.setAttribute('onclick', "checkthis('"+da+"')");
        itcollision.setAttribute('onclick', "checkthis('"+da+"')");
        itenergy.setAttribute('onclick', "checkthis('"+da+"')");
        itcollab.setAttribute('onclick', "checkthis('"+da+"')");
        itcentrality.setAttribute('onclick', "checkthis('"+da+"')");
        itrapidity.setAttribute('onclick', "checkthis('"+da+"')");

        iline.setAttribute('onmouseover', "checkcolor('"+da+"')");
        iline.setAttribute('onmouseout', "checkcolorback('"+da+"')");
    }
    
    keyfilter();
}

function selectall()
{
    var checkm = document.getElementsByClassName("checkmark");
    for(var i=0; i<checkm.length; i++)
        checkm[i].style = '';

    var checkb = document.getElementsByTagName("input");
    for(var i=0; i<checkb.length; i++)
    {
        if(checkb[i].type == 'checkbox')
        {
            checkb[i].checked = true;

        }
    }
    drawall();
}

function checkthis(da)
{
    var icheck = document.getElementById('check_' + da);
    if(icheck.checked == true)
    {
        icheck.checked = false;
        document.getElementById('checkmark_' + da).style = '';
    }
    else
    {
        icheck.checked = 'checked';
        document.getElementById('checkmark_' + da).style = '';
    }

    draw(da);
    legend(da);
}

function checkcolor(da)
{
    var icheck = document.getElementById('check_' + da);
    if(icheck.checked == false)
        document.getElementById('checkmark_' + da).style.backgroundColor = '#ccc';
}

function checkcolorback(da)
{
    var icheck = document.getElementById('check_' + da);
    if(icheck.checked == false)
        document.getElementById('checkmark_' + da).style.backgroundColor = '#eee';
}
