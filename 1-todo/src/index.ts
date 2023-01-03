import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";
import * as inquirer from 'inquirer';

const todos: TodoItem[] = [
    new TodoItem(1, "Buy Flowers"),
    new TodoItem(2, "Get Money Cash"),
    new TodoItem(3, "Wash The Car"),
    new TodoItem(4, "Go To My Girlfriend"),
    new TodoItem(5, "Great Date")
]

const collection: TodoCollection = new TodoCollection("Pablo Zapeta", todos);
let showCompleted = true;
console.clear();

collection.markComplete(5, true)

function displayTodoList(): void {
    console.log(`${collection.userName}'s Todo List `
        + `(${collection.getItemCounts().incomplete}
    items to do)`);

    collection.getTodoItems(showCompleted).forEach(item => item.printDetails());

}

enum Commands {
    Add = "Add New Task",
    Complete = "Complete Task",
    Toggle = "Show/Hide Completed",
    Purge = "Remove Complete Task",
    Quit = "Quit"
}

function promptAdd(): void {
    console.clear();
    inquirer.prompt({
        type: "input",
        name: "add",
        message: "Enter Task:"
    })
        .then(answer => {
            if (answer["add"] === "") return;
            collection.addTodo(answer["add"]);
            promptUser();
        })
}




function promptUser(): void {
    console.clear();
    displayTodoList();

    inquirer.prompt({
        type: "list",
        name: "command",
        message: "Choose Option",
        choices: Object.values(Commands),
    })
        .then(answers => {
            switch (answers["command"]) {
                case Commands.Toggle:
                    showCompleted = !showCompleted;
                    promptUser();
                    break;
                case Commands.Add:
                    console.log("SJDFLKDJSF")
                    promptAdd();
                    break;
            }
        })
}

promptUser();
