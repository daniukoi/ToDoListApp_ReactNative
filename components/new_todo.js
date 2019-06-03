import React from 'react';
import { Body, Icon, CheckBox, ListItem } from 'native-base';
import { Input, Button } from 'native-base';

export default class NewToDo extends React.Component {

    constructor(props) {
        super(props);
        const task = "";
        const completed = false;
        

        this.state = {
            task,
            completed,
            
        };
    }

    setStateUtil = (property, value) => {
        this.setState({
            [property]: value,
        });
    }

    render() {
        const { completed } = this.state;
        const { onPress, onCancel } = this.props;
        return (
            <ListItem>
                <CheckBox
                    checked={completed}
                    onPress={() => this.setStateUtil("completed", !completed)}
                />
                <Body>
                    <Input placeholder="What needs to be done?"
                        onChangeText={(txt) => this.setStateUtil("task", txt)}
                        onSubmitEditing={() => onPress(this.state)}
                    />
                </Body>
                <Button
                    transparent
                    onPress={() => onCancel(show=false)}
                >
                    <Icon name={'trash'} />
                </Button>
            </ListItem>
        );
    }
}