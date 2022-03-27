document.addEventListener('DOMContentLoaded', function(event) {

	const form = document.querySelector("form");

	form.addEventListener("submit", postData);

	async function postData(event) {
		event.preventDefault();

		const url = "https://w-strapi-movies-app-9wxhf.ondigitalocean.app/api/movies";

		let title = document.querySelector("#title").value,
			descr = document.querySelector("#descr").value,
			author = document.querySelector("#author").value,
			available = document.querySelector("#available"),
			year = document.querySelector("#year").value;

		if (available.value ==='true'){
			available = true
		} else {
			available = false
		}

		if (year === '') {
			year = null;
		}

		let newObj = {
			data: {
				title: title,
				description: descr,
				author: author,
				available: available,
				year: year,
			},
		};

		console.log(JSON.stringify(newObj))
		if (title === ''){
			alert('Pole Title jest wymagane!')
			event.preventDefault()
		 }else {
		let response = await fetch(url, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newObj)
		});
		
		form.reset();
		}
	}
	console.log(typeof document.querySelector("#year").value)
});
