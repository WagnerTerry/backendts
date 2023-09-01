const _mongoose = require('mongoose')

const Task = _mongoose.model('Task', {
    id: String,
    title: String,
    completed: Boolean
})

module.exports = Task