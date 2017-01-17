import React from "react";
import { ShallowComponent, Store, RemoteEndPoint } from "robe-react-commons";
import { Well } from "react-bootstrap";
import TodoItem from "./TodoItem";
import AddTodoItem from "./AddTodoItem";
import Button from "robe-react-ui/lib/buttons/Button";
export default class Todo extends ShallowComponent {


    store;

    constructor(props) {
        super(props);

        this.store = new Store({
            endPoint: new RemoteEndPoint({
                url: "http://127.0.0.1:3000/todo",
                idField: "id"
            }),
            idField: "id",
            autoLoad: true
        });


        this.state = {
            /*items: [
                { id: 1, value: "Süt Al" },
                { id: 2, value: "Yumurta Al" }
            ]*/
            items: []
        }
    }

    render() {
        return (
            <div>
                <AddTodoItem onItemAdd={this.onItemAdd} />
                <Well>
                    <ul>
                        {this.renderItems()}
                    </ul>
                </Well>
            </div>
        )
    }

    renderItems() {
        let items = [];
        console.log("size:");
        console.log(this.state.items.length);
        for (let i = 0; i < this.state.items.length; i++) {
            items.push(<TodoItem item={this.state.items[i]} onItemChange={this.onItemChange} onItemDelete={this.onItemDelete} />);
        }
        return items;
    }
    //UPDATE

    onItemChange(newItem) {
        console.log(newItem);
        this.store.update(item, this.updateSuccessCB, this.updateErrorCB);

    }
    updateSuccessCB(data) {
        console.log(data);
        this.loadData();
    }

    updateErrorCB() {
        console.log("update error");
    }




//delete
onItemDelete(itemId) {
    console.log(itemId);
    let item = { id: itemId }
    this.store.delete(item, this.deleteSuccessCB, this.adeleteErrorCB);

}
deleteSuccessCB(data) {
    console.log(data);
    this.loadData();
}

deleteErrorCB() {
    console.log("delete error");
}


//ADD
onItemAdd(newItemText) {
    console.log("onItemAdd: " + newItemText);
    let index = this.state.items.length;
    let newItem = { id: index + 1, value: newItemText };
    //this.state.items.push();
    this.store.create(newItem, this.addSuccessCB, this.addErrorCB);
}


addSuccessCB(data) {
    console.log(data);
    this.loadData();
}

addErrorCB() {
    console.log("add error");
}


componentDidMount() {
    //read(successCallBack: Function, errorCallback: Function, queryParams: Object)
    this.loadData();
}

loadData() {
    this.store.read((data) => {
        this.setState({
            items: data.data
        });
    });
}








}
