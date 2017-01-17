import React from "react";
import TextInput from "robe-react-ui/lib/inputs/TextInput";
import { ShallowComponent } from "robe-react-commons";
import Button from "robe-react-ui/lib/buttons/Button";
export default class TodoItem extends ShallowComponent {

    static propTypes = {
        item: React.PropTypes.object
    }
    static defaultProps = {
        item: {}
    }

    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            value: this.props.item.value
        }
    }
    
    render() {
        let itemValue;

        if (this.state.edit) {
            itemValue = (<TextInput
                value={this.state.value}
                onKeyPress={this.onKeyPress}
                onChange={this.onChange} />);
        } else {
            itemValue = <span onClick={this.onClick}>{this.props.item.value}</span>
        }
        return (
            <li>
                {itemValue}
                <Button style={{float: "right"}} bsStyle="danger" onClick={this.onDeleteClick}>Delete</Button>
                <Button style={{float: "right"}} bsStyle="warning" onClick={this.onEditClick}>Edit</Button>
                <div style={{clear: "both"}} />
            </li>
        )
    }

    onClick() {
        this.setState({ edit: true });
    }
    onKeyPress(e) {
        if (e.key == "Enter") {
            this.setState({ edit: false });
            this.props.onItemChange({
                id: this.props.item.id,
                value: this.state.value
            });
        }
    }

    onChange(e) {
        let value = e.target.value;
        this.setState({ value });
    }

    onDeleteClick() {
        console.log(this.props.item);
        this.props.onItemDelete(this.props.item.id);
    }


    onEditClick() {
        this.setState({ edit: true });
        this.setState(state);
    }

}
