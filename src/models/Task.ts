const _mongoose = require('mongoose')

const Task = _mongoose.model('Task', {
    title: String,
    completed: Boolean
})

module.exports = Task