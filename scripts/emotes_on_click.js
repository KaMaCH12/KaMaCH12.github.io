document.body.onclick = emote;
function emote()
{
    console.log("eldo");
    var emote_element=document.createElement("a");
    //emote_element.appendChild(document.createTextNode("Fuck"));
    emote_element.style.left=(Math.random()*document.body.clientWidth).toFixed(0).toString()+"px";
    emote_element.style.top="0px";
    emote_element.style.position="absolute";
    emote_element.style.fontSize="3rem";
    emote_element.style.color="dark";
    emote_element.className="fa fa-linux";
    document.body.appendChild(emote_element);

    emote_element.animate([
        { 
            transform: 'translateY(' + window.scrollY + 'px) rotate(0deg)'
        },
        { 
            transform: 'translateY(' + (500+window.scrollY+window.innerHeight) + 'px) rotate(360deg)'
        }
    ],{
        duration: 2000,
        iterations: 1
    }).finished.then(() => {document.body.removeChild(emote_element)});
}