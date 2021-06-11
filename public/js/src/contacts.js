import {ContactEntity, Resource, SpecificationAssembler} from "../react_app/resource";

class Contact extends React.Component {
    constructor(props) {
        super(props);

        this.updated = 0;

        this.data = {
            first_name: this.props.attributes.first_name,
            last_name: this.props.attributes.last_name,
            phone_number: this.props.attributes.phone_number,
            country_code: this.props.attributes.country_code,
            timezone: this.props.attributes.timezone,
            inserted_on: this.props.attributes.inserted_on,
            updated_on: this.props.attributes.updated_on
        }
    }

    updateContact = () => {
        let specAssembler = new SpecificationAssembler(this.data, ContactEntity.table_name, true);

        let self = this;
        let encodedData = JSON.stringify(specAssembler.spec);
        $.ajax({
            url: "/" + ContactEntity.table_name + "/" + self.props.attributes.id,
            method: "PATCH",
            data: encodedData,
            // dataType: Resource.dataType,
            success: function(result) {
                console.log(result);
            },
            error: function(e) {
            }
        });
    }

    deleteContact = () => {
        let self = this;
        $.ajax({
            url: "/" + ContactEntity.table_name + "/" + self.props.attributes.id,
            method: "DELETE",
            success: function(result) {
                let el = document.getElementById(self.props.attributes.id + "_card");
                el.remove();
            },
            error: function(e) {
            }
        });
    }

    updateField = (e) => {
        this.data[e.target.name] = e.target.value;
    }

    render() {
        return (
            <div id={this.props.attributes.id + "_card"} className="card mx-3 mb-3">
                <div className="input-group input-group-sm mb-1">
                    <label className="input-group-text" htmlFor={"id" + this.props.attributes.id}>id</label>
                    <div id={"id" + this.props.attributes.id} className="form-control">{this.props.attributes.id}</div>
                </div>
                <div className="input-group input-group-sm mb-1">
                    <label className="input-group-text" htmlFor={"first_name" + this.props.attributes.id}>First Name</label>
                    <input onChange={this.updateField} name="first_name"
                           id={"first_name" + this.props.attributes.id} className="form-control" type="text"
                           defaultValue={this.props.attributes.first_name}/>
                </div>
                <div className="input-group input-group-sm mb-1">
                    <label className="input-group-text" htmlFor={"last_name" + this.props.attributes.id}>Last Name</label>
                    <input onChange={this.updateField} name="last_name"
                           id={"last_name" + this.props.attributes.id} className="form-control" type="text"
                           defaultValue={this.props.attributes.last_name}/>
                </div>
                <div className="input-group input-group-sm mb-1">
                    <label className="input-group-text" htmlFor={"phone_number" + this.props.attributes.id}>Phone Number</label>
                    <input onChange={this.updateField} name="phone_number"
                           id={"phone_number" + this.props.attributes.id} className="form-control" type="text"
                           defaultValue={this.props.attributes.phone_number}/>
                </div>
                <div className="input-group input-group-sm mb-1">
                    <label className="input-group-text" htmlFor={"country_code" + this.props.attributes.id}>Country Code</label>
                    <input onChange={this.updateField} name="country_code"
                           id={"country_code" + this.props.attributes.id} className="form-control" type="text"
                           defaultValue={this.props.attributes.country_code}/>
                </div>
                <div className="input-group input-group-sm mb-1">
                    <label className="input-group-text" htmlFor={"timezone" + this.props.attributes.id}>Timezone</label>
                    <input onChange={this.updateField} name="timezone"
                           id={"timezone" + this.props.attributes.id} className="form-control" type="text"
                           defaultValue={this.props.attributes.timezone}/>
                </div>
                <div className="input-group input-group-sm mb-1">
                    <label className="input-group-text" htmlFor={"inserted_on" + this.props.attributes.id}>Created</label>
                    <div id={"inserted_on" + this.props.attributes.id} className="form-control">{this.props.attributes.inserted_on}</div>
                </div>
                <div className="input-group input-group-sm mb-1">
                    <label className="input-group-text" htmlFor={"updated_on" + this.props.attributes.id}>Updated</label>
                    <div id={"updated_on" + this.props.attributes.id} className="form-control">{this.props.attributes.updated_on}</div>
                </div>

                <button onClick={this.updateContact} className="btn btn-secondary mt-1">update</button>
                <button onClick={this.deleteContact} className="btn btn-danger mt-1">delete</button>
            </div>
        );
    }
}

class Contacts extends React.Component {
    constructor(props) {
        super(props);
    }

    prepareContacts() {
        let collection = this.props.contacts.data;

        let contacts = [];
        for (let i = 0; i < collection.length; i++) {
            let resource = new Resource(collection[i][Resource.data_key]);
            contacts.push(<Contact attributes={resource.attributes}/>);
        }

        return contacts;
    }

    render() {
        if (this.props.contacts.length == 0)
            return (<div></div>);

        let contacts = this.prepareContacts();
        return (
            <div className="d-flex flex-wrap">
                {contacts}
            </div>
        );

    }
}

export {Contacts};