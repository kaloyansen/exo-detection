// Create Scene
const heightScreen = 700;
const widthScreen = 400;
const root = document.getElementById('root');
root.style.display = 'flex';
root.style.justifyContent = 'center';
root.style.alignItems = 'center';
const screen = document.createElement('div');
screen.style.position = "relative";
screen.style.width = `${widthScreen}px`;
screen.style.height = `${heightScreen}px`;
screen.style.border = "solid 1px black";
screen.style.background = "linear-gradient(to bottom, #94c5f8 1%,#a6e6ff 70%,#b1b5ea 100%)";
screen.style.overflow = "hidden";

// Create the platform
const heightPlatform = 20;
const platforms = [
    { top: 80, left: 10, width: 45 },
    { top: 150, left: 30, width: 45 },
    { top: 220, left: 50, width: 45 },
    { top: 290, left: 70, width: 45 },
    { top: 360, left: 90, width: 45 },
    { top: 430, left: 110, width: 45 },
    { top: 80, right: 10, width: 45 },
    { top: 150, right: 30, width: 45 },
    { top: 220, right: 50, width: 45 },
    { top: 290, right: 70, width: 45 },
    { top: 360, right: 90, width: 45 },
    { top: 430, right: 110, width: 45 },
  
];

function createPlatorm(d) {
    const pf = document.createElement('div');
    pf.style.position = "absolute";
    pf.style.top = `${d.top}px`;
    if (d.left) pf.style.left = `${d.left}px`
    else pf.style.right = `${d.right}px`;
    pf.style.width = `${d.width}px`;
    pf.style.height = `${heightPlatform}px`;
    pf.style.backgroundColor = 'yellow';
    pf.style.border = "2px solid black";
    return pf;
}

// Create Tonneau
class Tonneau {
    constructor(x) {
        this.posX = x;
        this.posY = 0;
        this.intervalID = 0;
        // Create tonneau
        this.t = document.createElement('div');
        this.t.style.position = "absolute";
        this.t.style.top = `${this.posY}px`;
        this.t.style.left = `${this.posX}px`;
        this.t.style.width = "30px";
        this.t.style.height = "22px";
        this.t.style.backgroundColor = "green";
        this.t.style.border = "1px solid black";
        this.t.style.borderRadius = "8px";
        this.initialization();
    }

    initialization = () => {
        this.intervalID = setInterval(() => {
            this.posY += 5;
            this.t.style.top = `${this.posY}px`;
            this.detectionSurface();
        }, 50);
    }

    getT() {
        return this.t;
    }

    // TODO
    detectionSurface = () => {

        let x = this.posX;
        let y = this.posY;
        let deltax = x + getJusTheNumber(this.t.style.width);

        platforms.forEach((pl) => {

            let x1 = 0;
            let x2 = 0;
            if (pl.left) {
                x1 = pl.left;
                x2 = x1 + pl.width;
            } else if (pl.right) {
                x2 = widthScreen - pl.right;
                x1 = x2 - pl.width;
            } else {
                console.error('wtf');
            }

            const y1 = pl.top;
            const y2 = y1 + heightPlatform;

            const inx = x1 < x && x < x2;
            const iny = y1 < y && y < y2;
            const indeltax = x1 < deltax && deltax < x2; /* {this} is not a point
                                                            it is a two-dimensional object
                                                            il a deux degrées de liberté
                                                            here i take care of the x-dimension */
            const surfaceDetected = (inx || indeltax) && iny;

            if (surfaceDetected) {
                console.log(`hit: x:${x} in [${x1}:${x2}] y:${y} in [${y1}:${y2}]`);
                /* If surface detected
                   clearInterval(this.intervalID); */
                togColor(this.t);
                pl.style.backgroundColor = 'orange';
            }
        });
    }
}

function togColor(jack) {
    if (jack.style.backgroundColor == "transparent") {
        jack.style.backgroundColor = "green";
        jack.style.border = "1px solid black";
    } else {
        jack.style.backgroundColor = "transparent";
        jack.style.border = "transparent";
    }
}

function generateTonneau() {
    setInterval(() => {
        const randomX = Math.floor(Math.random() * widthScreen);
        const newT = new Tonneau(randomX);
        screen.appendChild(newT.getT());
    }, 2000);
}

function getJusTheNumber(eleparam, unit = 'px', hmm = 10) { return parseInt(eleparam.replace(unit, ''), hmm); }

// Append the platform
platforms.forEach(d => screen.appendChild(createPlatorm(d)))
root.appendChild(screen);

// Generate Tonneaux
generateTonneau();

