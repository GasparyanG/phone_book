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
                        <div className="input-group input-group-sm mb-3 w-25">
                            <label className="input-group-text" htmlFor="first_name">First Name</label>
                            <input onChange={this.updateField} className="form-control" id="first_name" name="first_name" type="text"
                                placeholder="Type fist name..."/>
                        </div>

                        <div className="input-group input-group-sm mb-3 w-25">
                            <label className="input-group-text" htmlFor="last_name">Last Name</label>
                            <input onChange={this.updateField} className="form-control" id="last_name" name="last_name" type="text"
                                   placeholder="Type last name..."/>
                        </div>
                    </div>
                    <div className="navigation__form__input">
                        <div className="input-group input-group-sm mb-3 w-25">
                            <label htmlFor="phone_number" className="input-group-text">Phone Number</label>
                            <input onChange={this.updateField} className="form-control" id="phone_number" name="phone_number" type="text"
                                   placeholder="Type phone number..."/>
                        </div>
                    </div>
                    <div className="navigation__form__input">
                        <div className="input-group input-group-sm mb-3 w-25">
                            <label className="input-group-text" htmlFor="country_code">Country Code</label>
                            <input onChange={this.updateField} className="form-control" id="country_code" name="country_code" type="text"
                                   placeholder="Type country code..."/>
                        </div>

                        <div className="input-group input-group-sm mb-3 w-25">
                            <label className="input-group-text" htmlFor="timezone">Timezone</label>
                            <input onChange={this.updateField} className="form-control" id="timezone" name="timezone" type="text"
                                   placeholder="Type timezone..."/>
                        </div>
                    </div>

                    <button onClick={this.addContact} className="btn btn-secondary" type="button">Add</button>
                </div>
            );

        return (<div></div>);
    }
}

export {Form};