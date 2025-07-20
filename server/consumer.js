// consumer.js
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'tap-consumer',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'tap-group' });
let tapCount = 0;

(async () => {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: 'tap-events', fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          tapCount++;
          const parsed = JSON.parse(message.value.toString());
          const userId = parsed.userId;

          console.log(`📥 [Partition ${partition}] Tap #${tapCount} from User: ${userId}`);

          if (tapCount % 5 === 0) {
            console.log(`🎉 User ${userId} wins!`);
          }
        } catch (err) {
          console.error("❌ Error processing message:", err.message);
        }
      },
    });
  } catch (err) {
    console.error("❌ Kafka Consumer Failed to Start:", err.message);
    process.exit(1);
  }
})();
