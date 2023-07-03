function addtext() {
    var textfarm = document.getElementById("textfarm");
    var ntext = document.getElementById("btnaddtext").value;
    var iname = "text" + ntext;

    addtextgroup(iname);
    addtexttosvg(iname);

    document.getElementById("btnaddtext").value = parseInt(ntext) + 1;

    return iname;
}

function addtextgroup(iname) {
    var itextgroup = document.createElement("div");
    itextgroup.id = iname;
    itextgroup.setAttribute("style", "padding: 0.1rem 0;");
    textfarm.appendChild(itextgroup);
    var textsvgid = iname + "svg";

    var iminus = document.createElement("button");
    iminus.setAttribute('type', 'submit');
    iminus.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    iminus.setAttribute("class", "btnaction smallbtn whitebtn");
    iminus.setAttribute('onclick', 'document.getElementById("'+iname+'").remove(); document.getElementById("'+iname+'svg").remove();');
    itextgroup.appendChild(iminus);

    var iinput = document.createElement("input");
    iinput.setAttribute('type', 'text');
    iinput.id = iname + "content";
    iinput.value = "eg. D<sup>0</sup>, J/&psi;, p<sub>T</sub>";
    iinput.setAttribute('onkeyup', 'changecontent("'+iname+'")');
    itextgroup.appendChild(iinput);

    var ibold = document.createElement("button");
    ibold.setAttribute('type', 'submit');
    ibold.setAttribute('class', 'btncheck whitebtn smallbtn');
    ibold.id = iname + "tbold";
    ibold.value = 0;
    ibold.innerHTML = '<i class="fa-solid fa-bold"></i>';
    ibold.setAttribute('onclick', 'switchbtn(this.id); colorbtn(this.id); changebold("'+iname+'");');
    itextgroup.appendChild(ibold);

    var iitalic = document.createElement("button");
    iitalic.setAttribute('type', 'submit');
    iitalic.setAttribute('class', 'btncheck whitebtn smallbtn');
    iitalic.id = iname + "titalic";
    iitalic.value = 0;
    iitalic.innerHTML = '<i class="fa-solid fa-italic"></i>';
    iitalic.setAttribute('onclick', 'switchbtn(this.id); colorbtn(this.id); changeitalic("'+iname+'");');
    itextgroup.appendChild(iitalic);
    
    var itsize = document.createElement("input");
    itsize.setAttribute('type', 'number');
    itsize.setAttribute('class', 'shorter leftgap');
    itsize.id = iname + "tsize";
    itsize.setAttribute('min', '0');
    itsize.setAttribute('onchange', 'changetsize("'+iname+'")');
    itsize.setAttribute('value', '30');
    itsize.setAttribute('step', '5');
    itextgroup.appendChild(itsize);

    var ifa2 = document.createElement("i");
    ifa2.setAttribute("class", "fa-solid fa-arrows-left-right");
    ifa2.setAttribute("style", "margin: 0 0.3rem;");
    itextgroup.appendChild(ifa2);

    var itx = document.createElement("input");
    itx.setAttribute('type', 'range');
    itx.id = iname + "itx";
    itx.setAttribute('class', 'slider');
    itx.setAttribute('min', '10');
    itx.setAttribute('max', '99');
    itx.setAttribute('value', '15');
    itx.setAttribute('oninput', 'changetxx("'+iname+'")');
    itextgroup.appendChild(itx);

    var ifa3 = document.createElement("i");
    ifa3.setAttribute("class", "fa-solid fa-arrows-up-down");
    ifa3.setAttribute("style", "margin: 0 0.3rem;");
    itextgroup.appendChild(ifa3);

    var ity = document.createElement("input");
    ity.setAttribute('type', 'range');
    ity.id = iname + "ity";
    ity.setAttribute('class', 'slider');
    ity.setAttribute('min', '10');
    ity.setAttribute('max', '99');
    ity.setAttribute('value', '15');
    ity.setAttribute('oninput', 'changetyy("'+iname+'")');
    itextgroup.appendChild(ity);
}

function addtexttosvg(name) {
    var ttext = svg.append("text")
                   .attr("id", name+"svg")
                   .style("text-anchor", "start");
    refreshtext(name);
}

function refreshtext(name) {
    changecontent(name);
    changetsize(name);
    changetxx(name);
    changetyy(name);
    changebold(name);
    changeitalic(name);
}

function drawalltext() {
    var children = document.getElementById("textfarm").children;
    for (var i = 0; i < children.length; i++) {
        var itext = children[i];
        addtexttosvg(itext.id);
    }
}

function changecontent(name) {
    var tname = name + "svg",
        content = document.getElementById(name+"content").value;
    document.getElementById(tname).innerHTML = '';
    var contents = parsescript(content);
    for (var p in contents) {
        svg.select('#' + tname).append('tspan')
           .attr("class", contents[p].cl)
           .attr("dominant-baseline", "middle")
           .text(decodehtml(contents[p].content));
    }
    settsuptsub(tname);
}

function changetsize(name) {
    var tname = name + "svg",
        tsize = document.getElementById(name+"tsize").value;
    svg.select('#' + tname).style("font-size", gettsize(tsize)+"em");
}

function changetxx(name) {
    var tname = name + "svg",
        xx = document.getElementById(name+"itx").value;
    svg.select('#' + tname).attr("x", getx0(xx));
}

function changetyy(name) {
    var tname = name + "svg",
        yy = document.getElementById(name+"ity").value;
    svg.select('#' + tname).attr("y", gety0(yy));
}

function changebold(name) {
    document.getElementById(name+"svg").style.fontWeight = document.getElementById(name+"tbold").value>0?"bold":"normal";
}

function changeitalic(name) {
    document.getElementById(name+"svg").style.fontStyle = document.getElementById(name+"titalic").value>0?"italic":"normal";
}

function removealltext() {
    var texts = document.getElementById("textfarm").getElementsByTagName("div");
    var names = [];
    for (let i=0; i<texts.length; i++) {
        names.push(texts[i].id);
    }
    for(let i in names) {
        var iname = names[i];
        document.getElementById(iname).remove();
        document.getElementById(iname+'svg').remove();
    }
    document.getElementById("btnaddtext").value = 0;
}

function freshalltext() {
    var texts = document.getElementById("textfarm").getElementsByTagName("div");
    var names = [];
    for (let i=0; i<texts.length; i++) {
        names.push(texts[i].id);
    }
    for(let i in names) {
        refreshtext(names[i]);
    }
}
