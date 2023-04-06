function exportsetup()
{
    var setups = ["observable", "xvariable",
                  "pxmin", "pxmax", "logx",
                  "pymin", "pymax", "logy",
                  "btnbinning", "btnvline", "btngrid",
                  "legsizerange", "x0range", "y0range",
                  "ratiorange"
                 ];
    // var xmlDoc = document.implementation.createDocument(null, "setup");
    var xmlDoc = new DOMParser().parseFromString('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><hinHFplot><setup></setup><data></data><text></text><legopacity></legopacity></hinHFplot>',
                                                 "application/xml");
    var setup = xmlDoc.getElementsByTagName("setup")[0];
    for(let i in setups)
    {
        var newset = xmladdnode(xmlDoc, setup, "set");
        xmladdnode(xmlDoc, newset, "item", setups[i]);
        xmladdnode(xmlDoc, newset, "value", document.getElementById(setups[i]).value);
    }

    var as = document.getElementById("dropdown-content").getElementsByTagName("a");
    var legopacity = xmlDoc.getElementsByTagName("legopacity")[0];
    for(let i=0; i<as.length; i++)
    {
        var value = as[i].classList.contains("active")?"1":"0";
        var newpart = xmladdnode(xmlDoc, legopacity, "part");
        xmladdnode(xmlDoc, newpart, "item", as[i].id);
        xmladdnode(xmlDoc, newpart, "active", value);
    }

    var data = xmlDoc.getElementsByTagName("data")[0];
    for(let i in legs)
    {
        var da = legs[i];
        var newda = xmladdnode(xmlDoc, data, "da");
        xmladdnode(xmlDoc, newda, "item", da);
        xmladdnode(xmlDoc, newda, "color", document.getElementById('color_'+da).value);
        xmladdnode(xmlDoc, newda, "marker", document.getElementById('marker_'+da).value);
        xmladdnode(xmlDoc, newda, "display", document.getElementById('display_'+da).value);
    }

    var texts = document.getElementById("textfarm").getElementsByTagName("div");
    var textnode = xmlDoc.getElementsByTagName("text")[0];
    for(let i=0; i<texts.length; i++)
    {
        var iname = texts[i].id;
        var newt = xmladdnode(xmlDoc, textnode, "line");
        xmladdnode(xmlDoc, newt, "item", iname);
        var content = document.getElementById(iname+"content").value;
        content = content.replaceAll("&", "&amp;");
        content = content.replaceAll("<", "&lt;");
        content = content.replaceAll(">", "&gt;");
        xmladdnode(xmlDoc, newt, "content", content);
        xmladdnode(xmlDoc, newt, "tbold", document.getElementById(iname+"tbold").value);
        xmladdnode(xmlDoc, newt, "titalic", document.getElementById(iname+"titalic").value);
        xmladdnode(xmlDoc, newt, "tsize", document.getElementById(iname+"tsize").value);
        xmladdnode(xmlDoc, newt, "itx", document.getElementById(iname+"itx").value);
        xmladdnode(xmlDoc, newt, "ity", document.getElementById(iname+"ity").value);
    }

    var xmltext = new XMLSerializer().serializeToString(xmlDoc.documentElement);
    var blob = new Blob([prettifyXml(xmltext)], {
        type: "text/plain;charset=utf-8",
    });
    saveAs(blob, savename()+".xml");

    // console.log(prettifyXml(xmltext));
}

function xmladdnode(xmldoc, parentdoc, tag, value="")
{
    var newitem = xmldoc.createElement(tag);
    if(value != "") newitem.innerHTML = value;
    parentdoc.appendChild(newitem);
    return newitem;
}

// https://stackoverflow.com/questions/376373/pretty-printing-xml-with-javascript
var prettifyXml = function(sourceXml)
{
    var xmlDoc = new DOMParser().parseFromString(sourceXml, 'application/xml');
    var xsltDoc = new DOMParser().parseFromString([
        // describes how we want to modify the XML - indent everything
        '<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">',
        '  <xsl:strip-space elements="*"/>',
        '  <xsl:template match="para[content-style][not(text())]">', // change to just text() to strip space in text nodes
        '    <xsl:value-of select="normalize-space(.)"/>',
        '  </xsl:template>',
        '  <xsl:template match="node()|@*">',
        '    <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>',
        '  </xsl:template>',
        '  <xsl:output indent="yes"/>',
        '</xsl:stylesheet>',
    ].join('\n'), 'application/xml');

    var xsltProcessor = new XSLTProcessor();    
    xsltProcessor.importStylesheet(xsltDoc);
    var resultDoc = xsltProcessor.transformToDocument(xmlDoc);
    var resultXml = new XMLSerializer().serializeToString(resultDoc);
    return resultXml;
};
