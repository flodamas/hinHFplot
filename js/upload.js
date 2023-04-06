function onFileLoad() {
    // document.getElementById(elementId).innerText = event.target.result;
    // console.log(event.target.result);
    var text, parser, xmlDoc;

    var text = event.target.result;
    // console.log(text);
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(text, "text/xml");
    var sets = xmlDoc.getElementsByTagName("set");
    for(let i=0; i<sets.length; i++)
    {
        var item = sets[i].getElementsByTagName("item")[0].innerHTML,
            value = sets[i].getElementsByTagName("value")[0].innerHTML;
        document.getElementById(item).value = value;
        
        // console.log(xmlDoc.getElementsByTagName("set")[0].getElementsByTagName("item")[0].innerHTML);
    }

    var parts = xmlDoc.getElementsByTagName("part");
    for(let i=0; i<parts.length; i++)
    {
        var item = parts[i].getElementsByTagName("item")[0].innerHTML,
            value = parts[i].getElementsByTagName("active")[0].innerHTML;
        var sw = document.getElementById(item);
        if(value==1 && !sw.classList.contains("active"))
        {
            sw.classList.add("active");
            sw.querySelector('i').className = 'fa-solid fa-square-check';
        }
        else if(value==0 && sw.classList.contains("active"))
        {
            sw.classList.remove("active");
	    sw.querySelector('i').className = 'fa-regular fa-square';
        }
        // console.log(xmlDoc.getElementsByTagName("set")[0].getElementsByTagName("item")[0].innerHTML);
    }
    
    clearall(0);
    removealltext();
    defaultrange();
    loaditem();
    freshall(0);
    var das = xmlDoc.getElementsByTagName("da");
    for(let i=0; i<das.length; i++)
    {
        var da = das[i].getElementsByTagName("item")[0].innerHTML,
            color = das[i].getElementsByTagName("color")[0].innerHTML,
            marker = das[i].getElementsByTagName("marker")[0].innerHTML,
            display = das[i].getElementsByTagName("display")[0].innerHTML;
        document.getElementById('color_'+da).value = color;
        document.getElementById('marker_'+da).value = marker;
        document.getElementById('display_'+da).value = display;
        checkthis(da, 0);
    }

    var texts = xmlDoc.getElementsByTagName("line");
    for(let i=0; i<texts.length; i++)
    {
        var tt = texts[i].getElementsByTagName("item")[0].innerHTML,
            content = texts[i].getElementsByTagName("content")[0].innerHTML;
        content = content.replaceAll("&gt;", ">");
        content = content.replaceAll("&lt;", "<");
        content = content.replaceAll("&amp;", "&");
        var iname = addtext();
        document.getElementById(iname+"content").value = content;
        document.getElementById(iname+"tbold").value = texts[i].getElementsByTagName("tbold")[0].innerHTML;
        document.getElementById(iname+"titalic").value = texts[i].getElementsByTagName("titalic")[0].innerHTML;
        document.getElementById(iname+"tsize").value = texts[i].getElementsByTagName("tsize")[0].innerHTML;
        document.getElementById(iname+"itx").value = texts[i].getElementsByTagName("itx")[0].innerHTML;
        document.getElementById(iname+"ity").value = texts[i].getElementsByTagName("ity")[0].innerHTML;
        refreshtext(iname);
    }
}

function onChooseFile(event, onLoadFileHandler) {
    if (typeof window.FileReader !== 'function')
        throw ("The file API isn't supported on this browser.");
    let input = event.target;
    if (!input)
        throw ("The browser does not properly implement the event object");
    if (!input.files)
        throw ("This browser does not support the `files` property of the file input.");
    if (!input.files[0])
        return undefined;
    let file = input.files[0];
    let fr = new FileReader();
    fr.onload = onLoadFileHandler;
    fr.readAsText(file);
}

