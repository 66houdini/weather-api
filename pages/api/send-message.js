import twilio from "twilio";

export default async function handler(req, res) {
    const { body, recipient } = req.body;
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
  
    const client = twilio(accountSid, authToken);
  
    try {
      const message = await client.messages.create({ body, from: "+14402912335", to:recipient });
      res.status(200).json({ message: "Message sent successfully", sid: message.sid });
    } catch (error) {
      res.status(500).json({ error: "Failed to send message" });
    }
  }