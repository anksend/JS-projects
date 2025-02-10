const bodyElement = document.querySelector("body");
const originalSpan = document.querySelector("span");
let mouseStopTimeout

bodyElement.addEventListener("mousemove", (event)=>{

    originalSpan.style.display ="none" ;
    clearTimeout(mouseStopTimeout);
    const xPos = event.offsetX;
    const yPos = event.offsetY;
    const spanEl = document.createElement("span");
    spanEl.style.top = yPos + "px"
    spanEl.style.left = xPos + "px"

    const size = Math.random() * 100;
    spanEl.style.width = size + "px";
    spanEl.style.height = size + "px";
    bodyElement.appendChild(spanEl);
    setTimeout(() => {
        spanEl.remove();
    }, 2000);

    mouseStopTimeout = setTimeout(()=>{
        originalSpan.style.display = "block"
    },1000)
})
