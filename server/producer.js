// producer.js
const { Kafka } = require('kafkajs');

// Kafka client configuration
const kafka = new Kafka({
  clientId: 'tap-consumer',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});

// Create Kafka producer instance
const producer = kafka.producer();

// Connect the producer
(async () => {
  try {
    await producer.connect();
    console.log("✅ Kafka producer connected");
  } catch (err) {
    console.error("❌ Failed to connect Kafka producer:", err);
  }
})();

// Function to send a tap event to Kafka
async function sendTapEvent(userId) {
  try {
    await producer.send({
      topic: 'tap-events',
      messages: [
        { value: JSON.stringify({ userId, time: Date.now() }) },
      ],
    });
    console.log(`✅ Produced event for user: ${userId}`);
  } catch (error) {
    console.error(`❌ Failed to send event for user ${userId}:`, error);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    console.log("\n🛑 Disconnecting Kafka producer...");
    await producer.disconnect();
    process.exit();
  } catch (err) {
    console.error("Error during producer disconnect:", err);
    process.exit(1);
  }
});

module.exports = { sendTapEvent };
