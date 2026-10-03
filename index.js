const field = createElement({parent: document.body, classes: ["game-field"]});
const elems = [];
const arr = [
	[0,0,1,1],
	[2,2,3,3],
	[4,4,5,5],
	[6,6,7,7]
];
const clickedCells = [];
let isPaired = false;
let isSolved = false;
let clickCount = 0;



//console.log(elems);
//const shuffled = shffl(elems.flat());
//console.log(shuffled);
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
	cell.dataset.txt = el;
	cell.addEventListener("click", cellHandler);
	array.push(cell);
	if(ind==0 || ind%4==0)	
		elems.push(array);
});
console.log(elems);
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
	e.target.textContent = e.target.dataset.txt;
	clickedCells.push(e.target);
	if(clickedCells.length == 2 && clickedCells[0].dataset.txt == clickedCells[1].dataset.txt)
		isSolved = true;
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
			});
			clickedCells.length = 0;			
		}, 1000);	
}
