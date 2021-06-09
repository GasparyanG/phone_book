import {ContactEntity, SpecificationAssembler} from "../react_app/resource";

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

export {Form};