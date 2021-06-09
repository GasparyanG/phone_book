// ----------------------------------------- TheView --------------------------------------------

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

// ----------------------------------------- Form --------------------------------------------

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
        let specAssembler = new SpecificationAssembler(this.data, ContactEntity.table_name, true);

        let encodedData = JSON.stringify(specAssembler.spec);
        $.ajax({
            url: "/" + ContactEntity.table_name,
            method: "POST",
            data: encodedData,
            // dataType: Resource.dataType,
            success: function(result) {
                console.log(result);
            },
            error: function(e) {
            }
        });
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

// ---------------------------------------------- Resource --------------------------------
class ContactEntity {
    static table_name = "contacts";
    static id = "id";
    static first_name = "first_name";
    static last_name = "last_name";
    static phone_number = "phone_number";
    static country_code = "country_code";
    static timezone = "timezone";
    static inserted_on = "inserted_on";
    static updated_on = "updated_on";
}

class SpecificationAssembler {
    constructor(
        attributes,             // payload
        type,                   // simply speaking this is a table name
        is_new = false  // resource doesn't exists yet
    ) {
        this._spec = {
            data: {}
        }

        this._spec.data[Resource.attributes_key] = attributes;
        this._spec.data[Resource.type_key] = type;
        if (!is_new)
            this._spec.data[Resource.id_key] = attributes[ContactEntity.id];
    }

    get spec() { return this._spec }
}

class Resource {
    static dataType = "application/json";

    // keys to access api result
    static id_key = "id";
    static type_key = "type";
    static attributes_key = "attributes";
}


// Mostly meant for pagination
class Link {
    // Keys to access values of api result
    static links_key = "links";
    static first_key = "first";
    static prev_key = "prev";
    static self_key = "self";
    static next_key = "next";
    static last_key = "last";
}

ReactDOM.render(
    <TheView/>,
    document.getElementById("payload")
);