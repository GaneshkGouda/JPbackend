const {createBullBoard} = require('@bull-board/api');
const {BullMQAdapter} = require('@bull-board/api/bullMQAdapter');
const {ExpressAdapter} = require('@bull-board/express');
const {notificationQueue} = require('./queue');
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues')
createBullBoard({
    queues:[new BullMQAdapter(notificationQueue)],
    serverAdapter,
})
module.exports = serverAdapter