const elements = document.querySelector('#apartmentsList');
const searchInput = document.querySelector('#search');

let items = [];

searchInput.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredItems = items.filter(item => 
		item.contactName.toLowerCase().includes(searchString));
    displayData(filteredItems);
});

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3819bbdfbemsh728d704970277e1p165420jsn747a79b95703',
		'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
	}
};

async function start() {
	try{
	  const response = await fetch('https://bayut.p.rapidapi.com/properties/list?locationExternalIDs=5002%2C6020&purpose=for-rent&hitsPerPage=25&page=0&lang=en&sort=city-level-score&rentFrequency=monthly&categoryExternalID=4', options);
	  const data = await response.json()
	  items = data.hits
	  console.log(items)
	  displayData(items)
	}catch (e){
	  console.log("There was a problem fetching data!")
	}
}

const displayData = (items) => {
    const htmlString = items
        .map((item) => {
            return `
            <li>
				<div class="first">
					<img src="${item.coverPhoto.url}">
				</div>
				<div class="second">
					<h1 class="name">${item.contactName}</h1>
					<h3>${item.title}$</h3><br/>
					<div class="agency">
						<div class="name">
							<p><b>agency</b>: ${item.agency.name}</p>
						</div>
						<img src="${item.agency.logo.url}"/>
					</div>
					<p class="category"><b>category</b>: ${item.category[0].name} ${item.category[1].name}</p>
					<p><b>location</b>: ${item.location[0].name} ${item.location[3].name}</p>
					<p><b>phone</b>: ${item.phoneNumber.phone ? item.phoneNumber.phone : item.phoneNumber.mobile}</p>
					<h3>price: ${item.price}$</h3><br/>
					<div class="details hide">
						<h1 class="name">Details for ${item.contactName}</h1>
						<p><b>purpose</b>: ${item.purpose}</p>
						<p><b>rent frequency</b>: ${item.rentFrequency}</p>
						<p><b>rooms</b>: ${item.rooms}</p>
						<p><b>baths</b>: ${item.baths}</p>
						<p><b>furnished</b>: ${item.furnishingStatus === "furnished" ? ('Yes') : ('No')}</p>
					</div>
					<button onclick="showDetails(this)">Details</button>
				</div>			
            </li>
        `;
        })
        .join('');
		elements.innerHTML = htmlString;
};


const showDetails = (btn) => {
	let myEl = btn.closest('.second');
	let hiddenEl = myEl.querySelector('.hide');
	
	if(btn.innerText === 'Details'){
		hiddenEl.style.display = 'block';
		btn.innerText = 'Close'
	} else {
		hiddenEl.style.display = 'none';
		btn.innerText = 'Details';
	}
}


start();


const copyrightYear = document.querySelector('.copyright');
const today = new Date();
copyrightYear.innerHTML = `<h4>Copyright &copy; ${today.getFullYear()}</h4>`;