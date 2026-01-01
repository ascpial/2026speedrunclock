const zeroPad = (num, places) => String(num).padStart(places, '0')

function changeResolution(canvas, scaleFactor) {
    // Set up CSS size.
    canvas.style.width = canvas.style.width || canvas.width + 'px';
    canvas.style.height = canvas.style.height || canvas.height + 'px';

    // Resize canvas and scale future draws.
    canvas.width = Math.ceil(canvas.width * scaleFactor);
    canvas.height = Math.ceil(canvas.height * scaleFactor);
    var ctx = canvas.getContext('2d');
    ctx.scale(scaleFactor, scaleFactor);
}

canvas = document.getElementById("speedrun");
console.log("hello world");
changeResolution(canvas, 2);
/** @type {CanvasRenderingContext2D} */
let ctx = canvas.getContext('2d');

let font = new FontFace("century_gothic", "url('Century-Gothic-Bold.ttf')");

let start = new Date(2026, 0, 1, 0, 0);
let target = new Date(2027, 0, 1, 0, 0);
let total = target - start;

var topgradient=ctx.createLinearGradient(0,20,0,100);
topgradient.addColorStop("0","#5ce581");
topgradient.addColorStop("1.0","#14b13e");

var bottomgradient=ctx.createLinearGradient(0,115,0,140);
bottomgradient.addColorStop("0","#5ce581");
bottomgradient.addColorStop("1.0","#14b13e");

function refreshTime() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let now = new Date();
    let offset = now - start;

    // Update completion
    let completion_percentage = (offset / total) * 100;
    ctx.font = "30px century_gothic"
    ctx.fillStyle = bottomgradient;
    ctx.fillText(`Completion: ${completion_percentage.toFixed(3)}%`,0,140);

    // Update clock
    let seconds = Math.floor(offset / 1000);
    let centiseconds = Math.floor((offset - seconds * 1000)/10);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    seconds = seconds - minutes * 60;
    minutes = minutes - hours * 60;
    let time = `${zeroPad(seconds, 2)}.${zeroPad(centiseconds, 2)}`;
    if (minutes > 0 && hours == 0) {
        time = `${minutes}:${time}`
    }
    if (hours > 0) {
        time = `${hours}:${zeroPad(minutes, 2)}:${time}`
    }
    ctx.font = "100px century_gothic"
    ctx.fillStyle = topgradient;
    ctx.fillText(time,0,100);

    setInterval(refreshTime, 10)
}

font.load().then(
    () => {
        refreshTime()
    }
)
