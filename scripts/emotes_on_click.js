document.body.onclick = emote;
var num_emotes=0;

function emote()
{
    if(num_emotes>10)return;
    num_emotes++;
    var emote_element=document.createElement("a");
    emote_element.style.position="absolute";
    var fontsize=(document.body.clientWidth/20).toFixed(0);
    emote_element.style.fontSize=fontsize.toString()+"px";
    emote_element.style.color="green";
    emote_element.className="fas fa-dollar-sign";
    var posx=(Math.random()*document.body.clientWidth-fontsize*1.2).toFixed(0);
    var posy=window.scrollY;
    var rot=Math.random()*360;
    emote_element.style.left=posx.toString()+"px";
    emote_element.style.top=posy.toString()+"px";
    document.body.appendChild(emote_element);

    var anim=setInterval(frame,5);
    function frame()
    {
        if(posy>document.body.clientHeight-emote_element.clientHeight)
        {
            document.body.removeChild(emote_element);
            num_emotes--;
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