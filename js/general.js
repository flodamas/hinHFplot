
function defaultrange()
{
    var drange =
        {
            "LcToD0+absy"    : { pxmin : 0   , pxmax : 4   , pymin : 0     , pymax : 0.9 }  ,
            "LcToD0+cent"    : { pxmin : 0   , pxmax : 100 , pymin : 0     , pymax : 0.9 }  ,
            "LcToD0+Npart"   : { pxmin : 0   , pxmax : 450 , pymin : 0     , pymax : 0.9 }  ,
            "LcToD0+pT"      : { pxmin : 0   , pxmax : 22  , pymin : 0     , pymax : 0.9 }  ,
            "LcToD0+y"       : { pxmin : -4  , pxmax : 4   , pymin : 0     , pymax : 0.9 }  ,

            "RAA+absy"     : { pxmin : 0   , pxmax : 4   , pymin : 0     , pymax : 1.5 }  ,
            "RAA+cent"     : { pxmin : 0   , pxmax : 100 , pymin : 0     , pymax : 1.5 }  ,
            "RAA+Npart"    : { pxmin : 0   , pxmax : 450 , pymin : 0     , pymax : 1.5 }  ,
            "RAA+pT"       : { pxmin : 0.1 , pxmax : 50  , pymin : 0     , pymax : 1.5 }  ,
            "RAA+y"        : { pxmin : -4  , pxmax : 4   , pymin : 0     , pymax : 1.5 }  ,

            "Ratio+absy"    : { pxmin : 0   , pxmax : 4   , pymin : 0     , pymax : 0.9 }  ,
            "Ratio+cent"    : { pxmin : 0   , pxmax : 100 , pymin : 0     , pymax : 0.9 }  ,
            "Ratio+Npart"   : { pxmin : 0   , pxmax : 450 , pymin : 0     , pymax : 0.9 }  ,
            "Ratio+pT"      : { pxmin : 0   , pxmax : 22  , pymin : 0     , pymax : 0.9 }  ,
            "Ratio+y"       : { pxmin : -4  , pxmax : 4   , pymin : 0     , pymax : 0.9 }  ,

            "DoubleRatio+absy"    : { pxmin : 0   , pxmax : 4   , pymin : 0     , pymax : 1.2 }  ,
            "DoubleRatio+cent"    : { pxmin : 0   , pxmax : 100 , pymin : 0     , pymax : 1.2 }  ,
            "DoubleRatio+Npart"   : { pxmin : 0   , pxmax : 450 , pymin : 0     , pymax : 1.2 }  ,
            "DoubleRatio+pT"      : { pxmin : 0   , pxmax : 30  , pymin : 0     , pymax : 1.2 }  ,
            "DoubleRatio+y"       : { pxmin : -4  , pxmax : 4   , pymin : 0     , pymax : 1.2 }  ,

            "RpA+absy"     : { pxmin : 0   , pxmax : 4   , pymin : 0.2   , pymax : 1.8 }  ,
            "RpA+cent"     : { pxmin : 0   , pxmax : 100 , pymin : 0.2   , pymax : 1.8 }  ,
            "RpA+Npart"    : { pxmin : 0   , pxmax : 450 , pymin : 0.2   , pymax : 1.8 }  ,
            "RpA+pT"       : { pxmin : 0   , pxmax : 30  , pymin : 0.2   , pymax : 1.8 }  ,
            "RpA+y"        : { pxmin : -4.5, pxmax : 4.5 , pymin : 0.2   , pymax : 1.8 }  ,

            "RpARAA+absy"  : { pxmin : 0   , pxmax : 4   , pymin : 0     , pymax : 1.5 }  ,
            "RpARAA+cent"  : { pxmin : 0   , pxmax : 100 , pymin : 0     , pymax : 1.5 }  ,
            "RpARAA+Npart" : { pxmin : 0   , pxmax : 450 , pymin : 0     , pymax : 1.5 }  ,
            "RpARAA+pT"    : { pxmin : 0.1 , pxmax : 50  , pymin : 0     , pymax : 1.5 }  ,
            "RpARAA+y"     : { pxmin : -4  , pxmax : 4   , pymin : 0     , pymax : 1.5 }  ,

            "v2+absy"      : { pxmin : 0   , pxmax : 4   , pymin : -0.03 , pymax : 0.24 } ,
            "v2+cent"      : { pxmin : 0   , pxmax : 100 , pymin : -0.03 , pymax : 0.24 } ,
            "v2+Npart"     : { pxmin : 0   , pxmax : 450 , pymin : -0.03 , pymax : 0.24 } ,
            "v2+pT"        : { pxmin : 0   , pxmax : 40  , pymin : -0.03 , pymax : 0.24 } ,
            "v2+y"         : { pxmin : -4  , pxmax : 4   , pymin : -0.03 , pymax : 0.24 } ,

            "v3+absy"      : { pxmin : 0   , pxmax : 4   , pymin : -0.03 , pymax : 0.1 }  ,
            "v3+cent"      : { pxmin : 0   , pxmax : 100 , pymin : -0.03 , pymax : 0.1 }  ,
            "v3+Npart"     : { pxmin : 0   , pxmax : 450 , pymin : -0.03 , pymax : 0.1 }  ,
            "v3+pT"        : { pxmin : 0   , pxmax : 40  , pymin : -0.03 , pymax : 0.1 }  ,
            "v3+y"         : { pxmin : -4  , pxmax : 4   , pymin : -0.03 , pymax : 0.1 }  ,

            "vn+absy"      : { pxmin : 0   , pxmax : 4   , pymin : -0.03 , pymax : 0.24 } ,
            "vn+cent"      : { pxmin : 0   , pxmax : 100 , pymin : -0.03 , pymax : 0.24 } ,
            "vn+Npart"     : { pxmin : 0   , pxmax : 450 , pymin : -0.03 , pymax : 0.24 } ,
            "vn+pT"        : { pxmin : 0   , pxmax : 40  , pymin : -0.03 , pymax : 0.24 } ,
            "vn+y"         : { pxmin : -4  , pxmax : 4   , pymin : -0.03 , pymax : 0.24 } ,
        }

    var varkey = document.getElementById('observable').value + "+" + document.getElementById('xvariable').value;
    document.getElementById('pxmin').value = drange[varkey].pxmin;
    document.getElementById('pxmax').value = drange[varkey].pxmax;
    document.getElementById('pymin').value = drange[varkey].pymin;
    document.getElementById('pymax').value = drange[varkey].pymax;
}

function decodehtml(str)
{
    str = str.replace("<sup>0</sup>", "&#8304;");
    // str = str.replace("<sub>s</sub>", "&#8347;");
    str = str.replace("<sup>&plusmn;</sup>", "&#8314;");
    var temp = document.createElement("p");
    temp.innerHTML = str;
    var result = temp.innerText;
    temp.remove();
    return result;
}
