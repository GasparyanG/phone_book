class Search extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <input onKeyDown={this.props.searchContact} type="text" placeholder="Search via first or last name"/>
        );
    }
}

export {Search};