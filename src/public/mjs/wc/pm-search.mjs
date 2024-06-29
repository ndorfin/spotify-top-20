export default class PMSearch extends HTMLElement {
	#handleSubmit(event) {
		// event.preventDefault();

		let formData = new FormData(this.form);
		let query = formData.get('query');
		
		// Hand over `query` to the appropriate API endpoint
	}

	connectedCallback() {
		this.form = this.querySelector('form');
		this.form.addEventListener('submit', this.#handleSubmit.bind(this));
	}

}