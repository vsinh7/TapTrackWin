const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'tap-producer',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();

(async () => {
  await producer.connect();
})();

async function sendTapEvent(userId) {
  await producer.send({
    topic: 'tap-events',
    messages: [{ value: JSON.stringify({ userId, time: Date.now() }) }],
  });
  console.log(`Produced event for user: ${userId}`);
}

module.exports = { sendTapEvent };
