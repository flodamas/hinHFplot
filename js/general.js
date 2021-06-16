
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
