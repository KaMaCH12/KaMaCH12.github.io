document.body.onclick = emote;
function emote()
{
    console.log("eldo");
    var emote_element=document.createElement("a");
    emote_element.style.position="absolute";
    emote_element.style.fontSize="3rem";
    emote_element.style.color="dark";
    emote_element.className="fa fa-linux";
    emote_element.style.left=((Math.random()*document.body.clientWidth).toFixed(0)-emote_element.clientWidth).toString()+"px";
    emote_element.style.top="0px";
    document.body.appendChild(emote_element);

    emote_element.animate([
        { 
            transform: 'translateY(' + window.scrollY + 'px) rotate(0deg)'
        },
        { 
            transform: 'translateY(' + (window.scrollY+window.innerHeight) + 'px) rotate(360deg)'
        }
    ],{
        duration: 2000,
        iterations: 1
    }).finished.then(() => {document.body.removeChild(emote_element)});
}