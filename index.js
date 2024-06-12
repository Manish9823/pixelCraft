console.log('dsf')
let ii = 1; let tempPath = "";
let choosed = false;
let imageReal = new Image();
const container_view = document.querySelector(".inter_con");
const container_image = document.querySelector(".image-con");
function go() {
    container_view.style.left = 0 + "px";
    callMethod();
}
function close1() {
    container_view.style.left = -10000 + "px";
}

const imageInputType = document.getElementById("imageInputType");
imageInputType.addEventListener("change", function () {

    if (this.value != "") {
        const file = this.files[0];
        // console.log(file)
        if ((file.type == "image/jpeg")) {
            const render = new FileReader();
            render.addEventListener("load", function () {
                //document.querySelector("#realImage").src=this.result;
                imageReal.src = this.result;
                choosed = true;
                //console.log(this.result);
                go();
                //PixalArt(this.result,0,0,0);
            })
            render.readAsDataURL(file);
        }
        else {
            alert("Invalid Format")
        }
    }
});



function gray() {
    PixalArt(tempPath, 0, 0, 0);
}
function red() { PixalArt(tempPath, parseInt(document.getElementById("rednum").value), 0, 0) }
function green() { PixalArt(tempPath, 0, parseInt(document.getElementById("greennum").value), 0) }
function blue() { PixalArt(tempPath, 0, 0, parseInt(document.getElementById("bluenum").value)) }

let imageChoose = document.querySelectorAll(".imageChoose");
for (let j = 0; j < imageChoose.length; j++) {
    imageChoose[j].onclick = function () {
        imageReal.src = imageChoose[j].src;
        go();
    }
}

function PixalArt(imagepath, rr, gg, bb) {
    const canvas = document.querySelector('#canvas1');
    const widt = document.querySelector("#realImage");

    canvas.width = widt.clientWidth;
    canvas.height = widt.clientHeight;
    const c = canvas.getContext('2d');
    // console.log(widt.height);
    const image = new Image();
    image.src = imagepath;

    image.addEventListener("load", drawPixal);



    function drawPixal() {

        c.drawImage(image, 0, 0, canvas.width, canvas.height);

        const scanImage = c.getImageData(0, 0, canvas.width, canvas.height);

        const scandata = scanImage.data;
        let total = 0, avg = 0, r, g, b;


        for (let i = 0; i < scandata.length; i += 4) {
            setTimeout(function () {
                r = scandata[i];
                g = scandata[i + 1];
                b = scandata[i + 2];
                if ((g = b) && (r > b) && (r > g) && (r > 80)) {
                    //scandata[i+3]=4lBfjNHXx8IK1PtSeSsnlf59yPZPRL0Qlg6Uq9dWxFe109tOntUH95vtPwW4lXFyllmfX3wqqdcXyz0BFQDYfOAAAAAAAAAA4z0h9BKekYKUWqeJpq1OpbKS29XUtm432PbF97T7MBo6m08o;
                    //scandata[i+1]+=255;
                    // scandata[i+2]+=255;
                    total = scandata[i] + scandata[i + 1] + scandata[i + 2];
                    avg = total / 3;
                    scandata[i] = avg + rr;
                    scandata[i + 1] = avg + gg;
                    scandata[i + 2] = avg + bb;
                }
                scanImage.data = scandata;
                c.putImageData(scanImage, 0, 0)
            }, 5);
        }
    }
}

function callMethod() {
    let Path = "";
    let b = document.getElementById("realImage");
    b.src = imageReal.src;
    if (choosed) {
        Path = imageReal.src;
        tempPath = Path;
    }

    else {
        let canva = document.createElement("canvas");
        let canvactx = canva.getContext("2d");
        canva.width = b.width;
        canva.height = b.height;
        canvactx.drawImage(b, 0, 0, b.width, b.height);
        let dataUri = canva.toDataURL('image/jpeg');
        Path = dataUri;
        tempPath = Path;
    }
    //console.log(imageReal)
    PixalArt(Path, 0, 0, 0);
}

//PixalArt(imagePath);
