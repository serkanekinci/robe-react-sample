import React from "react";
import TextInput from "robe-react-ui/lib/inputs/TextInput";
import { ShallowComponent } from "robe-react-commons";
import Button from "robe-react-ui/lib/buttons/Button";

export default class AddTodoItem extends ShallowComponent {

    constructor(props) {
        super(props);

        this.state = {
            text: ""
        }
    }
    
    render() {

        return (
            <div>
                <TextInput
                        name="TextInputNormal"
                        value={this.state.text}
                        onKeyPress={this.onKeyPress} 
                        onChange={this.onChange}
                        validationDisplay="overlay"
                         validations={{
                        required: true,
                        minLength: {
                            args: [3]
                        }
                    }} />
                <Button style={{float: "right"}} onClick={this.onAddClick}>Add</Button>
                <div style={{clear: "both"}} />
            </div>
        )
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
        let text = e.target.value;
        this.setState({ text });
    }

    onAddClick() {
        this.props.onItemAdd(this.state.text);
        this.setState({text: ""});

        
        
    } 

}