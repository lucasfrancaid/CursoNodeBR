const EventEmitter = require('events');

class MyEmitter extends EventEmitter {

}

const myEmitter = new MyEmitter()
const eventName = 'user:click'

myEmitter.on(eventName, (click) => {
    console.log('User clicked', click)
})

// myEmitter.emit(eventName, 'scroll bar')
// myEmitter.emit(eventName, 'button Ok')

// let count = 0
// setInterval(() => {
//     myEmitter.emit(eventName, 'button Ok' + (count++))
// }, 1000)

const stdin = process.openStdin()
stdin.addListener('data', (value) => {
    console.log(`Your input: ${value.toString().trim()}`)
})