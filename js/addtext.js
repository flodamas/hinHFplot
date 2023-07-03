function addtext() {
    var textfarm = document.getElementById("textfarm");
    var ntext = document.getElementById("btnaddtext").value;
    var iname = "text" + ntext;

    addtextgroup(iname);
    addtexttosvg(iname);
    showtextset(iname);
    
    document.getElementById("btnaddtext").value = parseInt(ntext) + 1;

    return iname;
}

function addtextgroup(iname) {
    var itextgroup = document.createElement("div");
    itextgroup.id = iname;
    itextgroup.setAttribute("style", "padding: 0.1rem 0;");
    itextgroup.style.display = "none";
    textfarm.appendChild(itextgroup);
    var textsvgid = iname + "svg";

    var iminus = document.createElement("button");
    iminus.setAttribute('type', 'submit');
    iminus.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    iminus.setAttribute("class", "btnaction smallbtn whitebkg");
    iminus.setAttribute('onclick', 'removetext("'+iname+'");');
    itextgroup.appendChild(iminus);

    var iinput = document.createElement("input");
    iinput.setAttribute('type', 'text');
    iinput.setAttribute('class', 'textset');
    iinput.id = iname + "content";
    iinput.value = "eg. D<sup>0</sup>, J/&psi;, p<sub>T</sub>";
    iinput.setAttribute('onkeyup', 'changecontent("'+iname+'")');
    itextgroup.appendChild(iinput);

    var ibold = document.createElement("button");
    ibold.setAttribute('type', 'submit');
    ibold.setAttribute('class', 'btncheck whitebkg smallbtn');
    ibold.id = iname + "tbold";
    ibold.value = 0;
    ibold.innerHTML = '<i class="fa-solid fa-bold"></i>';
    ibold.setAttribute('onclick', 'switchbtn(this.id); colorbtn(this.id); changebold("'+iname+'");');
    itextgroup.appendChild(ibold);

    var iitalic = document.createElement("button");
    iitalic.setAttribute('type', 'submit');
    iitalic.setAttribute('class', 'btncheck whitebkg smallbtn');
    iitalic.id = iname + "titalic";
    iitalic.value = 0;
    iitalic.innerHTML = '<i class="fa-solid fa-italic"></i>';
    iitalic.setAttribute('onclick', 'switchbtn(this.id); colorbtn(this.id); changeitalic("'+iname+'");');
    itextgroup.appendChild(iitalic);
    
    var itsize = document.createElement("input");
    itsize.setAttribute('type', 'number');
    itsize.setAttribute('class', 'shorter whitebkg wborder');
    itsize.id = iname + "tsize";
    itsize.setAttribute('min', '0');
    itsize.setAttribute('onchange', 'changetsize("'+iname+'")');
    itsize.setAttribute('value', '30');
    itsize.setAttribute('step', '5');
    itextgroup.appendChild(itsize);

    var itx = document.createElement("input");
    itx.setAttribute('type', 'number');
    itx.id = iname + "itx";
    itx.setAttribute('value', '15');
    itx.setAttribute('oninput', 'changetxx("'+iname+'")');
    itx.style.display = "none";
    itextgroup.appendChild(itx);

    var ity = document.createElement("input");
    ity.setAttribute('type', 'number');
    ity.id = iname + "ity";
    ity.setAttribute('value', '15');
    ity.setAttribute('oninput', 'changetyy("'+iname+'")');
    ity.style.display = "none";
    itextgroup.appendChild(ity);
}

function addtexttosvg(name) {
    var recthighlight = svg.append("rect")
                           .attr("id", name+"svghighlight")
                           .attr("class", "svghighlight")
                           .attr("x", 0)
                           .attr("y", 0)
                           .attr("fill", "none");
    var ttext = svg.append("text")
                   .attr("id", name+"svg")
                   .attr("class", "dragmove")
                   .style("text-anchor", "start");
    
    refreshtext(name);
    document.getElementById(name+"svg").addEventListener("mousedown", dragMouseDown)
}

function refreshtext(name) {
    changecontent(name);
    changetsize(name);
    changetxx(name);
    changetyy(name);
    changebold(name);
    changeitalic(name);
    freshtextset(name);
}

function drawalltext() {
    var children = document.getElementById("textfarm").children;
    for (var i = 0; i < children.length; i++) {
        var itext = children[i];
        addtexttosvg(itext.id);
    }
}

function changehighlightsize(tname) {
    const bbox = document.getElementById(tname).getBBox();
    svg.select("#" + tname + "highlight")
       .attr("width", bbox.width)
       .attr("height", bbox.height*0.4);
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
    changehighlightsize(tname);
}

function changetsize(name) {
    var tname = name + "svg",
        tsize = document.getElementById(name+"tsize").value;
    svg.select('#' + tname).style("font-size", gettsize(tsize)+"em");
    changehighlightsize(tname);
}

function changetxx(name) {
    var tname = name + "svg",
        xx = document.getElementById(name+"itx").value;
    svg.select('#' + tname).attr("x", getx0(xx));
    svg.select('#' + tname + "highlight").attr("x", getx0(xx));
}

function changetyy(name) {
    var tname = name + "svg",
        yy = document.getElementById(name+"ity").value;
    svg.select('#' + tname).attr("y", gety0(yy));
    svg.select('#' + tname + "highlight").attr("y", gety0(yy));
}

function dragMouseDown(event) {
    event.preventDefault();
    document.getElementById("mousexsave").value = event.clientX;
    document.getElementById("mouseysave").value = event.clientY;
    var name = this.id.replace('svg', '');
    document.getElementById("focussave").value = name;
    showtextset(name);

    document.getElementById('svgparent').addEventListener("mousemove", textDrag);
    document.addEventListener("mouseup", (event) => {
        document.getElementById('svgparent').removeEventListener("mousemove", textDrag);
    });
}

function textDrag(event) {
    event.preventDefault();
    var scale = 1.; // width rightpad -> svgparent
    var name = document.getElementById("focussave").value;
    deltaitx = getx0value(document.getElementById("mousexsave").value)*scale - getx0value(event.clientX)*scale;
    document.getElementById("mousexsave").value = event.clientX;
    document.getElementById(name+"itx").value = document.getElementById(name+"itx").value - deltaitx;
    changetxx(name);
    deltaity = gety0value(document.getElementById("mouseysave").value)*scale - gety0value(event.clientY)*scale;
    document.getElementById("mouseysave").value = event.clientY;
    document.getElementById(name+"ity").value = document.getElementById(name+"ity").value - deltaity;
    changetyy(name);
}

function changebold(name) {
    document.getElementById(name+"svg").style.fontWeight = document.getElementById(name+"tbold").value>0?"bold":"normal";
}

function changeitalic(name) {
    document.getElementById(name+"svg").style.fontStyle = document.getElementById(name+"titalic").value>0?"italic":"normal";
}

function removetext(name) {
    document.getElementById(name).remove();
    document.getElementById(name+'svg').remove();
    document.getElementById(name+'svghighlight').remove();
}

function removealltext() {
    var texts = document.getElementById("textfarm").getElementsByTagName("div");
    var names = [];
    for (let i=0; i<texts.length; i++) {
        names.push(texts[i].id);
    }
    for(let i in names) {
        removetext(names[i]);
    }
    document.getElementById("btnaddtext").value = 0;
}

function hidealltextset() {
    var texts = document.getElementById("textfarm").getElementsByTagName("div");
    for (let i=0; i<texts.length; i++) {
        texts[i].style.display = "none";
    }
    svg.selectAll(".svghighlight").attr("fill", "none");
}

function showtextset(name) {
    hidealltextset();
    document.getElementById(name).style.display = "block";
    freshtextset(name);
}

function freshtextset(name) {
    if(document.getElementById(name).style.display == "none")
        svg.select('#' + name+"svghighlight").attr("fill", "none");
    else
        svg.select('#' + name+"svghighlight").attr("fill", "yellow");
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


function cleantextset(event) {
  const clickedElement = event.target;
  const excludedElements = document.querySelectorAll("text");
  const isExcluded = Array.from(excludedElements).some((element) => element.contains(clickedElement));
  if (!isExcluded) {
      hidealltextset();
  }
}

function handleclick() {
    document.getElementById('svgparent').addEventListener("click", cleantextset);
}
