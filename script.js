/* Functions
		-handleInput
		-handleDatePick
		-handlePronounSelection
		-handleMouseEvent
		-displayAnswer
		-secondConversation
		-thirdConversation
		-getCurrDate
*/
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

let monthLongVer = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Handling Events
const handleInput = () => {

	// adds answer to the html page
	let ans = document.getElementById('answer').value;

	displayAnswer(ans, '.main-one');

	// second conversation block
	secondConversation(ans);
	new Wheel(document.getElementById("date-wheel"), {
		loop: true,
		length: 40,
		setValue: formatDate,
		width: 140,
		perspective: "right",
	})

	new Wheel(document.getElementById("hour-wheel"), {
		loop: true,
		length: 12,
		width: 23,
	})

	new Wheel(document.getElementById("minute-wheel"), {
		loop: true,
		length: 31,
		width: 23,
		perspective: "left",
	})
}

const handleDatePick = () => {


  let centerArr = document.querySelectorAll('.centered');
  console.log(centerArr);
	document.querySelector('.wrapper').remove();
	document.querySelector('.secondSubmitBtn').remove();

	let date = [];
	
	// makes an array of the date
	centerArr.forEach((x,i) => {
		console.log(x.innerHTML);
		date.push(x.innerHTML);
	});	

	let pickedDate = monthNames[date[1] - 1] + ' ' + date[2] + ', ' + date[0];
	console.log(pickedDate);
	displayAnswer(pickedDate, '.main-two');
	document.querySelector('.main-two').style.flex = 1;

	thirdConversation();
  
}

let pronoun = null;
const handlePronounSelection = () => {

	document.querySelector('.options').style.display = 'none';

	let p = document.createElement('p');
	let node = document.createTextNode(pronoun);
	p.appendChild(node);
	p.classList.add('text-right');
	let elem = document.querySelector(".main-three > p");
	elem.appendChild(p);

}

const displayAnswer= (ans, str) => {
	let p = document.createElement('p');
	let node = document.createTextNode(ans);
	p.appendChild(node);
	p.classList.add('text-right');
	let elem = document.querySelector(str);
	elem.appendChild(p);
}

const handleMouseEvent = (val, obj) => {

	document.querySelector('.thirdSubmitBtn').style.display = 'block';

	if(val == 'he'){
		console.log('he');
		document.querySelector('.he').style.borderColor = '#3926ff';
		document.querySelector('.she').style.borderColor = '#ccc';
		document.querySelector('.they').style.borderColor = '#ccc';
		pronoun = "He / Him";
	} else if(val == 'she'){
		console.log('she');
		document.querySelector('.she').style.borderColor = '#3926ff';
		document.querySelector('.he').style.borderColor = '#ccc';
		document.querySelector('.they').style.borderColor = '#ccc';
		pronoun = "She / Her";
	} else if(val == 'they'){
		console.log('they');
		document.querySelector('.they').style.borderColor = '#3926ff';
		document.querySelector('.he').style.borderColor = '#ccc';
		document.querySelector('.she').style.borderColor = '#ccc';
		pronoun = "They / Them";
	}
}

// Conversation blocks
const secondConversation = (arg) => {

	// remove text box
	let textBox = document.querySelector('.text-box');
	textBox.remove();

	// get current date
	let currDate = getCurrDate();

	// second conversation template
	let secondConvo = [
		'<header>Hudello</header', '<br />',
		`<p>Nice to meet you <b>${arg}</b>!</p>`,
		`<p>Since this is your first time meeting me, let's say my birthday is today, ${currDate}.</p>`,
		'<br />',
		'<br />',
		`<p style="font-weight: bolder;">When's your birthday?</p>`,
		`<div class="wrapper"><div id="date-wheel" style="align-items: center; justify-content:center;width: 150px"></div><div id="hour-wheel" style="width: 150px"></div><div id="minute-wheel" style="width: 150px"></div></div>`,
		`<button class="secondSubmitBtn" onclick="handleDatePick()">Submit</button>`
	].join("");


	let section = document.createElement('section');
	section.classList.add("main-two");
	section.innerHTML = secondConvo;
	document.querySelector(".main-container").appendChild(section);
}

const thirdConversation = () => {
	let thirdConvo = [
		'<header>Hudello</header>',
		'<p>Now that I know you a little better; <b>what are your pronouns?</b></p>',
		`<section class="options"><p class="text-gray">Select one</p><div class='pronoun-options'><div onclick="handleMouseEvent('he',this)" class="he-pronouns"><span class="he pronouns" style="width: 64px; height: 64px; line-height: 64px; font-size: 32px;">👨</span><br>He / Him</div><div onclick="handleMouseEvent('she',this)"><span class="she pronouns" style="width: 64px; height: 64px; line-height: 64px; font-size: 32px;">👩</span><br>She / Her</div ><div onclick="handleMouseEvent('they',this)"><span data-pronoun="they" class="they pronouns" style="width: 64px; height: 64px; line-height: 64px; font-size: 32px;">😊</span><br>They / Them</div></div><button type="button" onclick="handlePronounSelection()" class="thirdSubmitBtn">Submit</button></section>`
	].join("");

	let section = document.createElement('section');
	section.classList.add("main-three");
	section.innerHTML = thirdConvo;
	document.querySelector(".main-container").appendChild(section);
}

// Gets current date
const getCurrDate = () => {

	let currDate = new Date();
	console.log(currDate);

	let dd = String(currDate.getDate()).padStart(2, '0');
	let mm = String(currDate.getMonth() + 1).padStart(2, '0'); //January is 0!
	let yyyy = currDate.getFullYear();

	currDate = monthNames[mm - 1] + ' ' + dd + ', ' + yyyy;

	console.log(currDate);
	return currDate;
}