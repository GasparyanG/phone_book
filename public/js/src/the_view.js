import {Form} from "./contact_form";
import {Contacts} from "./contacts";
import {ContactEntity} from "../react_app/resource";

class TheView extends React.Component {
    constructor(props) {
        super(props);

        this.populateContacts();

        this.state = {
            new_is_pressed: false,
            contacts: []
        }
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

    render() {
        return (
            <div>
                <div className="navigation">
                    <button className="btn btn-primary mx-3 my-3" onClick={this.openContactForm} type="navigation__button">New Contact</button>
                    <Form new_is_pressed={this.state.new_is_pressed}/>
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