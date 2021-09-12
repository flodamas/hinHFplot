
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
            findmatch += " quarkonium quarkonia hidden closed";
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
        let re = /cent-([0-9]+)-([0-9]+)/;
        findmatch = findmatch.replace(re, 'cent-$1-$2%');

        if((input == "" || findmatch.indexOf(input) > -1) &&
           (document.getElementById('btncheckedonly').value == 0 || document.getElementById(lines[i].id.replace('tr_', 'check_')).checked))
            lines[i].style.display = ""; 
        else { lines[i].style.display = "none"; }
    }
}

function checkedonly() {

    var lines = document.getElementsByTagName('tr');
    var btncheck = document.getElementById('btncheckedonly');
    var checkonly = 1 - btncheck.value;
    btncheck.value = checkonly;

    if(btncheck.value == 1)
    {
        btncheck.style.backgroundColor = "#1f77b4";
	btncheck.style.color = "white";
    }
    else
    {
        btncheck.style.backgroundColor = "#f5f5f5";
	btncheck.style.color = "black";
    }
    
    for(var i=0; i<lines.length; i++)
    {
        var da = lines[i].id.replace("tr_", "");
        if(checkonly == 0) lines[i].style.display = "";
        else if(document.getElementById('check_' + da).checked) {  lines[i].style.display = ""; }
        else {  lines[i].style.display = "none"; }
    }
}
