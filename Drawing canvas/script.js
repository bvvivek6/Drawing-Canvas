const colorPicker = document.getElementById('colorPicker');
const canvas = document.getElementById('drawingCanvas');
const context = canvas.getContext('2d');
const clearButton = document.getElementById('clearButton');
const saveButton = document.getElementById('saveButton');
const lineWidth = document.getElementById('lineWidth');
const eraser = document.getElementById('eraser');
//const pen = document.getElementById('pen');

// Set canvas dimensions
canvas.width = 800;
canvas.height = 500;

//variables
let drawing = false;
let color=colorPicker.value;
let penwidth=lineWidth.value;
let isEraserChosen=false;
//let isPenChosen=true;

function draw() {
    //start drawing
    const startDrawing = (e)=>{  //passing event object
        drawing = true;
        draw(e); 
    };
    //stop drawing
    const stopDrawing = ()=>{
        drawing = false;
        context.beginPath();  //to start from the where the mouse event is down
    };

    //draw on the canvas
    const draw = (e) => {

        if (!drawing){
            return 0;
        } 

        //set parameters for pen
        context.lineWidth = penwidth;
        context.lineCap = 'round';
        context.strokeStyle = color;

        //draw tools
        context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);  //draw lines
        context.stroke();  //draw the content
        context.beginPath();  //to start from the where the mouse event is down
        context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);  //dont draw, just follow
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mousemove', draw);

    // Clear the canvas
    clearButton.addEventListener('click', () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
    });

    //update the options
    colorPicker.addEventListener('change',(e)=>{
        color = e.target.value;  
    });
    lineWidth.addEventListener('change',(e)=>{
        penwidth = e.target.value;
    });
}

draw();

//eraser functionalities
eraser.addEventListener('change',(e)=> {
    if (e.target.checked) {
        color= 'white';
        penwidth = 150;
        colorPicker.disabled=true;
        //lineWidth.textContent='Eraser Weight: ';
    }
    else{
        color = colorPicker.value;
        penwidth = lineWidth.value;
        colorPicker.disabled=false;
    }
});

// Save the canvas as an image
saveButton.addEventListener('click', () => {

    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'drawing.png';
    link.click();

});

