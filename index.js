const wrapper = createElement({parent: document.body, classes: ["game-wrapper"]});
const panel = createElement({parent: wrapper, classes: ["info-panel"]});
const ngmbtn = createElement({text: "New game", parent: panel, classes: ["newgame-btn"]});
const steps = createElement({text: "Steps: 0", parent: panel, classes: ["steps"]});
const solved = createElement({text: "Solved: 0/8", parent: panel, classes: ["solved"]});

const field = createElement({parent: wrapper, classes: ["game-field"]});
const elems = [];
const arr = [
	[{creature: "fish", src: "./assets/blue-fish.jpg"},
	 {creature: "fish", src: "./assets/blue-fish.jpg"},
	 {creature: "jellyfish", src: "./assets/pink-jellyfish.jpg"},
	 {creature: "jellyfish", src: "./assets/pink-jellyfish.jpg"}
	],
	[
	 {creature: "whale-and-fish", src: "./assets/whale-and-fish.jpg"},
	 {creature: "whale-and-fish", src: "./assets/whale-and-fish.jpg"},
	 {creature: "whale", src: "./assets/whale.png"},
	 {creature: "whale", src: "./assets/whale.png"}
	],
	[
	 {creature: "octopus", src: "./assets/octopus.png"},
	 {creature: "octopus", src: "./assets/octopus.png"},
	 {creature: "shark", src: "./assets/shark.jpg"},
	 {creature: "shark", src: "./assets/shark.jpg"}
	],
	[
	 {creature: "yellow-fish", src: "./assets/yellow-fish.png"},
	 {creature: "yellow-fish", src: "./assets/yellow-fish.png"},
	 {creature: "lobster", src: "./assets/lobster.png"},
	 {creature: "lobster", src: "./assets/lobster.png"}
	]
];
const clickedCells = [];
let isPaired = false;
let isSolved = false;
let clickCount = 0;
let slcount = 0;
let stcount = 0;


function createField() {
	const shuffled = shffl(arr.flat());
	console.log(shuffled);
	let array;
	let line;
	shuffled.forEach((el,ind,arr) => {
		if(ind==0 || ind%4==0){
			line = createElement({parent: field, classes: ["game-line"]});
			array = [];
		}	
		let cell = createElement({parent: line, classes: ["game-cell"]});
		cell.dataset.txt = el.creature;
		cell.dataset.src = el.src;
		//cell.style.backgroundImage = el.src;
		cell.addEventListener("click", cellHandler);
		array.push(cell);
		if(ind==0 || ind%4==0)	
			elems.push(array);
	});
	console.log(elems);
}
createField();
function createElement(options) {
 // Default values
 const { tag = 'div', text = '', parent, classes = [] } = options;

 const element = document.createElement(tag);
 element.textContent = text;

 // Adding classes if provided
 if (classes.length > 0) {
  element.classList.add(...classes);
 }

 // Adding the element to the parent element if necessary
 if (parent != null) {
  parent.appendChild(element);
 }

 return element; // Returning the created element for further manipulations
}

function shffl(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function cellHandler(e) {
	e.target.style.backgroundColor = "transparent";
	//e.target.textContent = e.target.dataset.txt;
	e.target.style.backgroundImage = `url(${e.target.dataset.src})`;
	clickedCells.push(e.target);	
	if(clickedCells.length == 2 ){
		stcount++;
		steps.textContent = `Steps: ${stcount}`;
		if(clickedCells[0].dataset.txt == clickedCells[1].dataset.txt){
			isSolved = true;
			slcount++;
			solved.textContent = `Solved: ${slcount}/8`;
			if(slcount == 8)
				showModal();
		}
	}
	if(clickedCells.length == 2 && isSolved){
		isSolved = false;
		clickedCells.forEach(el => el.removeEventListener("click", cellHandler));
		clickedCells.length = 0;
	}
	else if(clickedCells.length == 2 && !isSolved)
		setTimeout(() => {
			clickedCells.forEach(el => {
				el.style.backgroundColor = "";
				el.textContent = "";
				el.style.backgroundImage = "";				
			});
			clickedCells.length = 0;			
		}, 1000);	
}

function showModal() {
	const overlay = createElement({parent: document.body, classes: ["fixed-overlay"]});
	const modal = createElement({text: `You won with ${stcount} steps!`, parent: overlay, classes: ["modal-window"]});
	const btns = createElement({parent: modal, classes: ["wrapper-btn"]});
	const ngbtn = createElement({tag: "button", text: "New game", parent: btns, classes: ["newgame-btn"]});
	const clbtn = createElement({tag: "button", text: "Close", parent: btns, classes: ["close-btn"]});
	ngbtn.addEventListener("click", () => {
		stcount = 0;
		slcount = 0;
		steps.textContent = `Steps: ${stcount}`;
		solved.textContent = `Solved: ${slcount}/8`;
		field.innerHTML = "";
		elems.length = 0;
		createField();
		overlay.remove();
	}); 
	clbtn.addEventListener("click", () => overlay.remove());
}

ngmbtn.addEventListener("click", () => {
	stcount = 0;
	slcount = 0;
	steps.textContent = `Steps: ${stcount}`;
	solved.textContent = `Solved: ${slcount}/8`;
	field.innerHTML = "";
	elems.length = 0;
	createField();
});
//showModal();
