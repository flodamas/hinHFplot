
function keyfilter() {
    var input = document.getElementById('filterinput').value.toLowerCase();
    var lines = document.getElementsByTagName('tr');

    
    for(var i=0; i<lines.length; i++)
    {
        // if(lines[i].getAttribute('type') != "line") continue;
        var idd = lines[i].id.toLowerCase();
        var findmatch = idd;
        if(idd.indexOf("psi") > -1) // quarkonia
        {
            findmatch += " quarkonium quarkonia";
            if(idd.indexOf("upsilon") > -1)
                findmatch += " bottomonium bottomonia beauty";
            else
                findmatch += " charmonium charmonia";
        }
        else if(idd.indexOf("toe_") > -1 || idd.indexOf("tomu_") > -1) // semileptonic
        {
            findmatch += " semileptonic";
        }
        else if(idd.indexOf("ks0") > -1 || idd.indexOf("light") > -1) // light
            findmatch += " light";
        else // open
        {
            findmatch += " open";
            if(idd.indexOf("lambda") > -1)
                findmatch += " baryon";
            if(idd.indexOf("bplus") > -1 || idd.indexOf("bsubs") > -1 || idd.indexOf("b0") > -1 || idd.indexOf("bc") > -1)
                findmatch += " beauty"
        }
        
        if(idd.indexOf("bto") > -1)
            findmatch += " nonprompt beauty";

        // console.log(idd, findmatch);
        
        if(input == "" || findmatch.indexOf(input) > -1) { lines[i].style.display = ""; }
        else { lines[i].style.display = "none"; }
    }
}
