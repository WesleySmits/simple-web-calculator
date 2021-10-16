class Calculator extends HTMLElement {
    #display: HTMLElement | null = null;

    #buttons: HTMLButtonElement[] = [];

    #query = '';

    public get query(): string {
        return this.#query;
    }

    public set query(value: string) {
        this.#query = value;
        this.#updateDisplay();
    }

    constructor() {
        super();
        this.#display = this.querySelector('[data-role="display"]');
        this.#buttons = Array.from(this.querySelectorAll('button'));
    }

    protected connectedCallback(): void {
        this.#setEventListeners();
    }

    protected disconnectedCallback(): void {
        this.#unsetEventListeners();
    }

    #handleButtonClick(event: Event): void {
        const target = event.target as HTMLButtonElement;
        if (target === null) {
            return;
        }

        const { value } = target;
        const userValue = target.innerText;

        switch (value) {
            case 'ac':
                this.query = '';
                break;
            case 'ce':
                this.query = this.query.slice(0, -1);
                break;
            case '=':
                this.#performCalculation();
                break;
            default:
                this.query += userValue;
        }
    }

    #setEventListeners(): void {
        this.#buttons.forEach((button) => {
            button.addEventListener('click', this.#handleButtonClick.bind(this));
        });
    }

    #unsetEventListeners(): void {
        this.#buttons.forEach((button) => {
            button.removeEventListener('click', this.#handleButtonClick.bind(this));
        });
    }

    #updateDisplay(): void {
        if (this.#display === null) {
            return;
        }

        this.#display.innerText = this.query;
    }

    #performCalculation(): void {
        const displayQuery = this.query.replace('÷', '/').replace('x', '*');
        const answer: number = eval(displayQuery);
        const formattedAnswer = +parseFloat(answer.toString()).toFixed(2);
        this.query = formattedAnswer.toString();
    }
}

customElements.define('ws-calculator', Calculator);
