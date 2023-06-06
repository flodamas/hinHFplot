function freshall(transt = 0) {
    drawall(transt);
    legall(transt);
    refall(transt);
    colorbtn("logx");
    colorbtn("logy");
}

function colorall(transt = 200) {
    var colorb = document.getElementsByTagName("input");
    for (var i=0; i<colorb.length; i++) {
        if (colorb[i].type == 'color') {
            var da = colorb[i].id.replace("color_", "");
            var cc = Math.floor(Math.random()*16777215).toString(16);
            var ccl = cc.length;
            if (ccl < 6)
            { for (var ic = 0; ic<(6-ccl); ic++) { cc = '0' + cc; } }
            cc = '#' + cc;
            document.getElementById('color_'+da).value = cc;
            changeone(da, transt);
            changeoneleg(da, transt);
            changeoneref(da);
        }
    }
}

function clearall(transt = 100) {
    var checkbs = document.getElementsByClassName("checkb");
    for (var i=0; i<checkbs.length; i++) {
        var da = checkbs[i].id.replace("check_", "");
        if (!checkb(da)) continue;
        swapcheckb(da);
        clearone(da, transt);
        refone(da, transt);
        legone(da, transt);
    }
}

window.addEventListener("resize", function() { freshall(); });

// Opacity series

function vlineopacity() {
    var vline = d3.select("svg").select("g").select('#vline');
    var vo = 1 - document.getElementById('btnvline').value;
    vline.transition().attr('opacity', vo);
    document.getElementById('btnvline').value = vo;
}

function binningopacity(transt = 200) {
    changetonext('btnbinning');
    var checkbs = document.getElementsByClassName("checkb");
    for (var i=0; i<checkbs.length; i++) {
        var da = checkbs[i].id.replace("check_", "");
        document.getElementById('display_'+da).value = document.getElementById('btnbinning').value;

        if (!checkb(da)) continue;
        drawdisplay(da, transt);
    }
}

function gridopacity(transt = 0) {
    var grid = d3.select("svg").select("g").selectAll('.grid');
    var next = {0 : 1, 1 : 0.3, 0.3 : 0.15, 0.15 : 0};
    var newopa = next[document.getElementById('btngrid').value];
    grid.transition().attr('opacity', newopa).duration(transt);
    document.getElementById('btngrid').value = newopa;
}

function legendopacity(sw) {
    if (sw.classList.contains("active")) {
        sw.classList.remove("active");
        sw.querySelector('i').className = 'fa-regular fa-square';
    }
    else {
        sw.classList.add("active");
        sw.querySelector('i').className = 'fa-solid fa-square-check';
    }
    d3.select("svg").selectAll('.legend').remove();
    d3.select("svg").selectAll('.legendmark').remove();
    legall(0);
}
