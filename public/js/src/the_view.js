import {Form} from "./contact_form";

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
                    <button className="btn btn-primary mb-3" onClick={this.openContactForm} type="navigation__button">New Contact</button>
                    <Form new_is_pressed={this.state.new_is_pressed}/>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <TheView/>,
    document.getElementById("payload")
);