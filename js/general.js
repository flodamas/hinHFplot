
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
    drawall();
}

function defaultrange()
{
    var drange =
        {
            "v2+pT" : {
                pxmin : 0,
                pxmax : 40,
                pymin : -0.03,
                pymax : 0.24
            },
            "RAA+pT" : {
                pxmin : 0.1,
                pxmax : 85,
                pymin : 0,
                pymax : 1.3
            },
            "LcD0+pT" : {
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
