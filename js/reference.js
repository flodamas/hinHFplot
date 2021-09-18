
function addref()
{
    var reference = document.getElementById('reference');
    while(reference.firstChild)
    {
        reference.removeChild(reference.firstChild);
    }

    var datainput = document.getElementById('datainput');
    var checkb = datainput.getElementsByTagName('input');

    for(var i=0; i<checkb.length; i++)
    {
        if(checkb[i].type != 'checkbox') { continue; }
        if(checkb[i].checked == false) { continue; }
        var da = checkb[i].id.replace("check_", "");
        var cc = document.getElementById("color_" + da).value;

        var iref = document.createElement("li");
        iref.style = 'color : ' + cc + ';';
        reference.appendChild(iref);
        var iaref = document.createElement("a");
        iaref.id = "aref_" + da;
        iaref.setAttribute('class', 'liref');
        iaref.setAttribute('onmouseover', "changecolor('"+iaref.id+"')");
        iaref.setAttribute('onmouseleave', "changecolorback('"+iaref.id+"')");
        iaref.setAttribute('onclick', "window.open('"+dataset[da].link+"', '_blank');");
        iaref.innerText = dataset[da].reference;
        iaref.style = 'color: ' + cc + ';';
        iref.appendChild(iaref);
        var sp = document.createElement("a");
        sp.innerHTML = "&nbsp;";
        iref.appendChild(sp);
        var iacref = document.createElement("i");
        iacref.id = "acref_" + da;
        iacref.setAttribute('class', 'far fa-copy liref');
        iacref.setAttribute('onmouseover', "showcopy('acref_"+da+"', '" + cc + "')");
        iacref.setAttribute('onmouseleave', "hidecopy()");
        iacref.setAttribute("onclick", "copylink('acref_"+da+"', '"+dataset[da].reference+"', '" + cc + "')");
        iacref.style = 'color: ' + cc + ';';
        iacref.innerHTML = iacref.innerHTML + "&nbsp";
        iref.appendChild(iacref);
    }
    reference.style = 'opacity : 1;';
}

function changecolor(da)
{
    document.getElementById(da).style.textDecoration = "underline";
}

function changecolorback(da)
{
    document.getElementById(da).style.textDecoration = "none";
}

function showcopy(id, cc)
{
    var rect = document.getElementById(id).getBoundingClientRect();
    var cl = document.getElementById('clipboard');
    var clheight = cl.getBoundingClientRect().top - cl.getBoundingClientRect().bottom;
    cl.innerHTML = "&nbsp;Copy reference&nbsp;";
    cl.style.backgroundColor = cc;
    cl.style.display = 'block';
    cl.style.left = rect.right + 'px';
    cl.style.top = (rect.top+rect.bottom)/2. - cl.offsetHeight/2. + 'px';
}

function hidecopy()
{
    document.getElementById('clipboard').style.display = 'none';
}

function copylink(id, str, cc)
{
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    var rect = document.getElementById(id).getBoundingClientRect();
    var cl = document.getElementById('clipboard');
    cl.innerHTML = "&nbsp;Copied reference&nbsp;";
    cl.style.backgroundColor = cc;
    cl.style.left = rect.right + 'px';
    cl.style.top = (rect.top+rect.bottom)/2. - cl.offsetHeight/2. + 'px';
}
