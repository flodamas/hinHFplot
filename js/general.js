
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
            "v3+pT" : {
                pxmin : 0,
                pxmax : 40,
                pymin : -0.03,
                pymax : 0.1
            },
            "vn+pT" : {
                pxmin : 0,
                pxmax : 40,
                pymin : -0.03,
                pymax : 0.24
            },
            "RAA+pT" : {
                pxmin : 0.1,
                pxmax : 50,
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
