
function addref()
{
    // var divreference = document.getElementById('divreference');
    // divreference.removeChild(divreference.lastChild);

    // var reference = document.createElement('ul');
    // reference.id = "reference";
    // // reference.style = 'opacity : 0;';
    // divreference.appendChild(reference);

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
        // iref.id = "ref_" + da;
        iref.style = 'color : ' + cc + ';';
        reference.appendChild(iref);
        var iaref = document.createElement("a");
        iaref.id = "aref_" + da;
        iaref.setAttribute('class', 'liref');
        iaref.setAttribute('onmouseover', "changecolor('"+iaref.id+"')");
        iaref.setAttribute('onmouseleave', "changecolorback('"+iaref.id+"')");
        iaref.innerText = dataset[da].reference;
        iaref.href = dataset[da].link;
        iaref.style = 'color: ' + cc + ';';
        iref.appendChild(iaref);
        var sp = document.createElement("a");
        sp.innerText = ' ';
        iref.appendChild(sp);
        var iacref = document.createElement("a");
        iacref.id = "acref_" + da;
        iacref.setAttribute('class', 'liref');
        iacref.innerHTML = '&#10000;';
        iacref.setAttribute('onmouseover', "changecolor('"+iacref.id+"')");
        iacref.setAttribute('onmouseleave', "changecolorback('"+iacref.id+"')");
        iacref.setAttribute("onclick", "copylink(event, '"+dataset[da].reference+"', '" + cc + "')");
        iacref.style = 'color: ' + cc + ';';
        iref.appendChild(iacref);
    }
    reference.style = 'opacity : 1;';
}

function changecolor(da)
{
    var iaref = document.getElementById(da);
    var cc = iaref.style.color;
    iaref.style = 'color: white; background-color: ' + cc + ';';
}

function changecolorback(da)
{
    var iaref = document.getElementById(da);
    var cc = iaref.style.backgroundColor;
    iaref.style = 'background-color: white; color: ' + cc + ';';
}

function copylink(event, str, cc)
{
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el); 
    var cl = document.getElementById('clipboard');
    // var rr = (document.documentElement.clientWidth - event.clientX) * 1.02 + 'px';
    // var bb = (document.documentElement.clientHeight - event.clientY) * 1.02 + 'px';
    var ll = event.clientX + 10 + 'px';
    var tt = event.clientY + 'px';

    cl.innerHTML = "Copied \""+str+"\"";
    // cl.style.right = rr;
    // cl.style.bottom = bb;
    cl.style.left = ll;
    cl.style.top = tt;
    cl.style.backgroundColor = cc;
    cl.style.opacity = '0.8';
    setTimeout(function() {
        cl.style.opacity = '0';
    }, 1000);
}
