class TheView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            new_is_pressed: false
        }
    }

    openContactForm = () => {
        this.setState(
            {
                new_is_pressed: !this.state.new_is_pressed
            }
        )
    }

    render() {
        return (
            <div>
                <div className="navigation">
                    <button onClick={this.openContactForm} type="navigation__button">New Contact</button>
                    <Form new_is_pressed={this.state.new_is_pressed}/>
                </div>
            </div>
        );
    }
}

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.data = {
            first_name: "",
            last_name: "",
            phone_number: "",
            country_code: "",
            timezone: "",
            inserted_on: "",
            updated_on: ""
        }
    }

    addContact = () => {
        console.log(this.data);
        // Ajax call should be triggered here
    }

    updateField = (e) => {
        this.data[e.target.name] = e.target.value;
    }

    render() {
        if (this.props.new_is_pressed)
        return (
            <div className="navigation__form">
                <div className="navigation__form__input">
                    <input onChange={this.updateField} name="first_name" type="text"/>
                    <input onChange={this.updateField} name="last_name" type="text"/>
                </div>
                <div className="navigation__form__input">
                    <input onChange={this.updateField} name="phone_number" type="text"/>
                </div>
                <div className="navigation__form__input">
                    <input onChange={this.updateField} name="country_code" type="text"/>
                    <input onChange={this.updateField} name="timezone" type="text"/>
                </div>
                <div className="navigation__form__input">
                    <input onChange={this.updateField} name="inserted_on" type="text"/>
                    <input onChange={this.updateField} name="updated_on" type="text"/>
                </div>

                <button onClick={this.addContact} type="button">Add</button>
            </div>
        );

        return (<div></div>);
    }
}

ReactDOM.render(
    <TheView/>,
    document.getElementById("payload")
);