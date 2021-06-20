
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
            "RAA+y" : {
                pxmin : -2.5,
                pxmax : 2.5,
                pymin : 0,
                pymax : 1.3
            },
            "RAA+absy" : {
                pxmin : 0,
                pxmax : 3.5,
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

function decodehtml(str)
{
    var temp = document.createElement("p");
    temp.innerHTML = str;
    var result = temp.innerText;
    temp.remove();
    return result;
}
