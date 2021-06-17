
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
        iaref.setAttribute('onmouseover', "changecolor('"+da+"')");
        iaref.setAttribute('onmouseleave', "changecolorback('"+da+"')");
        iaref.innerText = dataset[da].reference;
        iaref.href = dataset[da].link;
        iaref.style = 'color: ' + cc + ';';
        iref.appendChild(iaref);
    }
    reference.style = 'opacity : 1;';
}

function changecolor(da)
{
    var iaref = document.getElementById("aref_" + da);
    var cc = document.getElementById("color_" + da).value;
    iaref.style = 'color: white; background-color: ' + cc + ';';
}

function changecolorback(da)
{
    var iaref = document.getElementById("aref_" + da);
    var cc = document.getElementById("color_" + da).value;
    iaref.style = 'background-color: white; color: ' + cc + ';';
}
