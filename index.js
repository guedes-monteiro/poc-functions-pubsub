const {PubSub} = require('@google-cloud/pubsub');

// Instantiates a client
const pubsub = new PubSub();
const PUB_SUB_NAME = 'projects/poc-functions-pubsub/topics/partners';

exports.partners = async (req, res) => {
    if (!req.body || !req.body.message) {
        res
          .status(400)
          .send('Missing parameter(s); include "message" properties in your request.');
        return;
      }
    
      console.log(`Publishing message to topic ${req.body.topic}`);
    
      // References an existing topic
      const topic = pubsub.topic(PUB_SUB_NAME);
    
      const messageObject = {
        data: {
          message: req.body.message,
        },
      };
      const messageBuffer = Buffer.from(JSON.stringify(messageObject), 'utf8');
    
      // Publishes a message
      try {
        await topic.publish(messageBuffer);
        res.status(200).send('Message published.');
      } catch (err) {
        console.error(err);
        res.status(500).send(err);
        return Promise.reject(err);
      }    
};