document.body.onclick = emote;
function emote()
{
    var emote_element=document.createElement("a");
    emote_element.style.position="absolute";
    var fontsize=(document.body.clientWidth/20).toFixed(0);
    emote_element.style.fontSize=fontsize.toString()+"px";
    emote_element.style.color="dark";
    emote_element.className="fa fa-linux";
    var posx=(Math.random()*document.body.clientWidth-fontsize*1.2).toFixed(0);
    var posy=window.scrollY;
    var rot=0;
    emote_element.style.left=posx.toString()+"px";
    emote_element.style.top=posy.toString()+"px";
    document.body.appendChild(emote_element);

    var anim=setInterval(frame,5);
    function frame()
    {
        if(posy>document.body.clientHeight-emote_element.clientHeight)
        {
            document.body.removeChild(emote_element);
            clearInterval(anim);       
        }
        else
        {
            rot+=1;
            posy+=5;
            emote_element.style.top=posy.toString()+"px";
            emote_element.style.transform="rotate("+rot.toString()+"deg)";
        }
    }    
}