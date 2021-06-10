import {Form} from "./contact_form";
import {Contacts} from "./contacts";
import {Search} from "./search";
import {ContactEntity} from "../react_app/resource";

class TheView extends React.Component {
    constructor(props) {
        super(props);

        this.populateContacts();

        this.state = {
            new_is_pressed: false,
            contacts: []
        }

        // Bindings
        this.populate = this.populateContacts.bind(this);
        this.searchContact = this.search.bind(this);
    }

    updateContacts = (cont) => {
        this.setState(
            {
                new_is_pressed: this.state.new_is_pressed,
                contacts: cont
            }
        )
    }

    populateContacts = () => {
        let self = this;
        $.ajax({
            url: "/" + ContactEntity.table_name,
            method: "GET",
            success: function (result) {
                self.updateContacts(JSON.parse(result));
            },
            error: function (e) {
                console.log(e);
            }
        })
    }

    openContactForm = () => {
        this.setState(
            {
                new_is_pressed: !this.state.new_is_pressed,
                contacts: this.state.contacts
            }
        )
    }

    search = (e) => {
        if (e.keyCode != 13)
            return;
        let self = this;
        $.ajax({
            url: "/" + ContactEntity.table_name + "?search=" + e.target.value,
            method: "GET",
            success: function (result) {
                self.updateContacts(JSON.parse(result));
            },
            error: function (e) {
                console.log(e);
            }
        })
    }

    render() {
        return (
            <div>
                <div className="navigation">
                    <div>
                        <div className="input-group input-group-sm my-3 col-md-8 offset-md-4">
                            <label className="input-group-text">Hit Enter</label>
                            <Search searchContact={this.searchContact} className="form-control"/>
                            <button className="btn btn-secondary" onClick={this.openContactForm} type="navigation__button">New Contact</button>
                        </div>

                    </div>
                    <Form populate={this.populate} new_is_pressed={this.state.new_is_pressed}/>
                    <Contacts contacts={this.state.contacts}/>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <TheView/>,
    document.getElementById("payload")
);