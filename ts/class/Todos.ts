//task-4
import { Task } from "./Task.js";

class Todos {
    tasks: Array<Task> = []
    #backend_url = ''

    constructor(url: any) {
        this.#backend_url = url
    }

    getTasks = async () => {
        return new Promise(async (resolve, reject) => {
            fetch(this.#backend_url)
            .then(response => response.json())
            .then(response => {
                this.#readJson(response)
                resolve( this.tasks )
            }, (error) => {
                reject(error)
            })
        })
    }

    //task-4
    addTask = async (text: string) => {
        return new Promise(async (resolve, reject) => {
            const json = JSON.stringify({ description: text })
            fetch(this.#backend_url + '/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: json
            })
            .then(response => response.json())
            .then(response => {
                resolve(this.#addToAray(response.id, text))
            }), (error: any) => {
                reject(error)
            }
        })
    }

    //task-5
    removeTask = (id: number) => {
        return new Promise(async (resolve, reject) => {
            fetch(this.#backend_url + '/delete/' + id, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(response => {
                this.#removeFromArray(id)
                resolve(response.id)
            }, (error) => {
                reject(error)
            })
        })
    }

    //task-4
    #readJson(tasksAsJson: any): void {
        tasksAsJson.forEach((node: any) => {
            const task = new Task(node.id, node.description)
            this.tasks.push(task)
        })
    }

    //task-4
    #addToAray(id: number, text: string) {
        const task = new Task(id, text)
        this.tasks.push(task)
        return task
    }

    //task-5
    #removeFromArray(id: number): void {
        const arrayWithoutRemoved = this.tasks.filter((task) => task.id !== id)
        this.tasks = arrayWithoutRemoved
    }
}

export { Todos }