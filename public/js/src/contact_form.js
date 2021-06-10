import {ContactEntity, SpecificationAssembler} from "../react_app/resource";

class Form extends React.Component {
    static id = 'crt';

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
        let self = this;
        $.ajax({
            url: "/" + ContactEntity.table_name,
            method: "POST",
            data: encodedData,
            // dataType: Resource.dataType,
            success: function(result) {
                self.props.populate();
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
                <div className="navigation__form col-md-8 offset-md-4">
                    <div className="navigation__form__input">
                        <div className="input-group input-group-sm mb-3 w-50">
                            <label className="input-group-text" htmlFor={"first_name" + Form.id}>First Name</label>
                            <input onChange={this.updateField} className="form-control" id={"first_name" + Form.id} name="first_name" type="text"
                                placeholder="Type fist name..."/>
                        </div>

                        <div className="input-group input-group-sm mb-3 w-50">
                            <label className="input-group-text" htmlFor={"last_name" + Form.id}>Last Name</label>
                            <input onChange={this.updateField} className="form-control" id={"last_name" + Form.id} name="last_name" type="text"
                                   placeholder="Type last name..."/>
                        </div>
                    </div>
                    <div className="navigation__form__input">
                        <div className="input-group input-group-sm mb-3 w-50">
                            <label htmlFor={"phone_number" + Form.id} className="input-group-text">Phone Number</label>
                            <input onChange={this.updateField} className="form-control"
                                   id={"phone_number" + Form.id} name="phone_number" type="text"
                                   placeholder="Type phone number..."/>
                        </div>
                    </div>
                    <div className="navigation__form__input">
                        <div className="input-group input-group-sm mb-3 w-50">
                            <label className="input-group-text" htmlFor={"country_code" + Form.id}>Country Code</label>
                            <input onChange={this.updateField} className="form-control" id={"country_code" + Form.id} name="country_code" type="text"
                                   placeholder="Type country code..."/>
                        </div>

                        <div className="input-group input-group-sm mb-3 w-50">
                            <label className="input-group-text" htmlFor={"timezone" + Form.id}>Timezone</label>
                            <input onChange={this.updateField} className="form-control" id={"timezone" + Form.id} name="timezone" type="text"
                                   placeholder="Type timezone..."/>
                        </div>
                    </div>

                    <button onClick={this.addContact} className="btn btn-secondary mb-3 w-50" type="button">Add</button>
                </div>
            );

        return (<div></div>);
    }
}

export {Form};