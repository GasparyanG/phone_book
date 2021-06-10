import {Resource} from "../react_app/resource";

function Contact(props) {
    return (
        <div className="card mx-3">
            <div className="input-group input-group-sm mb-1">
                <label className="input-group-text" htmlFor="id">id</label>
                <div id="id" className="form-control"/>
            </div>
            <div className="input-group input-group-sm mb-1">
                <label className="input-group-text" htmlFor="first_name">First Name</label>
                <input id="first_name" className="form-control" type="text" value = {props.attributes.first_name}/>
            </div>
            <div className="input-group input-group-sm mb-1">
                <label className="input-group-text" htmlFor="last_name">Last Name</label>
                <input id="last_name" className="form-control" type="text" value = {props.attributes.last_name}/>
            </div>
            <div className="input-group input-group-sm mb-1">
                <label className="input-group-text" htmlFor="phone_number">First Name</label>
                <input id="phone_number" className="form-control" type="text" value = {props.attributes.phone_number}/>
            </div>
            <div className="input-group input-group-sm mb-1">
                <label className="input-group-text" htmlFor="country_code">Country Code</label>
                <input id="country_code" className="form-control" type="text" value = {props.attributes.country_code}/>
            </div>
            <div className="input-group input-group-sm mb-1">
                <label className="input-group-text" htmlFor="timezone">Timezone</label>
                <input id="timezone" className="form-control" type="text" value = {props.attributes.timezone}/>
            </div>
            <div className="input-group input-group-sm mb-1">
                <label className="input-group-text" htmlFor="inserted_on">Created</label>
                <div id="inserted_on" className="form-control">{props.attributes.inserted_on}</div>
            </div>
            <div className="input-group input-group-sm mb-1">
                <label className="input-group-text" htmlFor="updated_on">Updated</label>
                <div id="updated_on" className="form-control">{props.attributes.updated_on}</div>
            </div>

            <button className="btn btn-secondary mt-1">update</button>
        </div>
    );
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
            <div className="d-flex">
                {contacts}
            </div>
        );

    }
}

export {Contacts};