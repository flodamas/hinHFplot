
function selectall()
{
    var checkb = document.getElementsByTagName("input");
    for(var i=0; i<checkb.length; i++)
    {
        if(checkb[i].type == 'checkbox')
        {
            checkb[i].checked = true;
        }
    }
    draw();
}

function clearall()
{
    var checkb = document.getElementsByTagName("input");
    for(var i=0; i<checkb.length; i++)
    {
        if(checkb[i].type == 'checkbox')
        {
            checkb[i].checked = false;
        }
    }
    draw();
}

function colorall()
{
    var colorb = document.getElementsByTagName("input");
    for(var i=0; i<colorb.length; i++)
    {
        if(colorb[i].type == 'color')
        {
            colorb[i].value = "#" + Math.floor(Math.random()*16777215).toString(16);
        }
    }
    draw();
}

function defaultrange()
{
    var drange =
        {
            "v2+pT (GeV/c)" : {
                pxmin : 0,
                pxmax : 40,
                pymin : -0.03,
                pymax : 0.25
            },
            "RAA+pT (GeV/c)" : {
                pxmin : 0.2,
                pxmax : 98,
                pymin : 0,
                pymax : 1.3
            },
            "LcD0+pT (GeV/c)" : {
                pxmin : 0,
                pxmax : 22,
                pymin : 0,
                pymax : 2
            },
        }

    var varkey = document.getElementById('observable').value + "+" + document.getElementById('xvariable').value;
    document.getElementById('pxmin').value = drange[varkey].pxmin;
    document.getElementById('pxmax').value = drange[varkey].pxmax;
    document.getElementById('pymin').value = drange[varkey].pymin;
    document.getElementById('pymax').value = drange[varkey].pymax;
}
