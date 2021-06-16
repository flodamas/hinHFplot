
function selectall()
{
    var checkb = document.getElementsByTagName("input");
    for(var i=0; i<checkb.length; i++)
    {
        if(checkb[i].type == 'checkbox')
        {
            checkb[i].checked = true;
        }
    }
}

function clearall()
{
    var checkb = document.getElementsByTagName("input");
    for(var i=0; i<checkb.length; i++)
    {
        if(checkb[i].type == 'checkbox')
        {
            checkb[i].checked = false;
        }
    }
}

function colorall()
{
    var colorb = document.getElementsByTagName("input");
    for(var i=0; i<colorb.length; i++)
    {
        if(colorb[i].type == 'color')
        {
            colorb[i].value = "#" + Math.floor(Math.random()*16777215).toString(16);
        }
    }
}
