const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'tap-consumer',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'tap-group' });
let tapCount = 0;

(async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'tap-events', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      tapCount++;
      const { userId } = JSON.parse(message.value.toString());
      console.log(`Received tap #${tapCount} from user: ${userId}`);

      if (tapCount % 5 === 0) {
        console.log(`🎉 User ${userId} wins!`);
      }
    },
  });
})();
