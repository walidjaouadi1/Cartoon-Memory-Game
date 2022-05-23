document.querySelector(".control-button span").onclick = function () {
	let yourName = prompt("What's Your Name");
	if (yourName == null || yourName == "") {
		document.querySelector(".name span").innerHTML = "Unkown";
	} else {
		document.querySelector(".name").innerHTML = "Name: " + yourName;
		document.querySelector(".control-button ").remove();
	}
};
let gameContainer = document.querySelector(".game-container");
let blocks = Array.from(gameContainer.children);
let orderRange = Array.from(Array(blocks.length).keys());

shuffle(orderRange);

blocks.forEach((block, index) => {
	block.style.order = orderRange[index];
	block.addEventListener("click", function () {
		flipBlock(block);
	});
});
// flip Block
function flipBlock(selectedBlock) {
	selectedBlock.classList.add("is-flipped");
	let allFlippedBlocks = blocks.filter((flippedBlock) =>
		flippedBlock.classList.contains("is-flipped")
	);
	if (allFlippedBlocks.length === 2) {
		stopClicking();
		checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
	}
}
// stop clicking
function stopClicking() {
	gameContainer.classList.add("no-clicking");
	setTimeout(() => {
		gameContainer.classList.remove("no-clicking");
	}, 1500);
}
// check match
function checkMatchedBlocks(firstBlock, secondBlock) {
	let triesWrong = document.querySelector(".tries span");
	if (firstBlock.dataset.refer === secondBlock.dataset.refer) {
		firstBlock.classList.remove("is-flipped");
		secondBlock.classList.remove("is-flipped");
		// remove has-match class
		firstBlock.classList.add("has-match");
		secondBlock.classList.add("has-match");
		// succes audio
		document.getElementById("success").play();
	} else {
		triesWrong.innerHTML = parseInt(triesWrong.innerHTML) + 1;
		setTimeout(() => {
			firstBlock.classList.remove("is-flipped");
			secondBlock.classList.remove("is-flipped");
		}, 1500);
		// fail audio
		document.getElementById("fail").play();
	}
}
// shuffle function
function shuffle(array) {
	let current = array.length,
		temp,
		random;
	while (current > 0) {
		random = Math.floor(Math.random() * current);
		current--;
		temp = array[current];
		array[current] = array[random];
		array[random] = temp;
	}
	return array;
}
