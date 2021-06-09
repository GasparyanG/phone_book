class TheView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                Main container
            </div>
        );
    }
}

ReactDOM.render(
    <TheView/>,
    document.getElementById("payload")
);