import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
    try {
        // Ensure the request body is parsed
        if (!req.body) {
            return res.status(400).json({ success: false, message: "Invalid request body" });
        }

        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Verify headers
        try {
            await whook.verify(JSON.stringify(req.body), {
                "svix-id": req.headers["svix-id"],
                "svix-timestamp": req.headers["svix-timestamp"],
                "svix-signature": req.headers["svix-signature"],
            });
        } catch (verificationError) {
            return res.status(401).json({ success: false, message: "Webhook verification failed" });
        }

        const { data, type } = req.body;

        // Handle events
        switch (type) {
            case "user.created": {
                if (!data.id || !data.email_addresses?.[0]?.email_address) {
                    return res.status(400).json({ success: false, message: "Invalid user data" });
                }
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: `${data.first_name} ${data.last_name}`,
                    image: data.image_url || "",
                    resume: "",
                };
                await User.create(userData);
                res.json({ success: true, message: "User created" });
                break;
            }
            case "user.updated": {
                if (!data.id || !data.email_addresses?.[0]?.email_address) {
                    return res.status(400).json({ success: false, message: "Invalid user data" });
                }
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: `${data.first_name} ${data.last_name}`,
                    image: data.image_url || "",
                };
                await User.findByIdAndUpdate(data.id, userData);
                res.json({ success: true, message: "User updated" });
                break;
            }
            case "user.deleted": {
                if (!data.id) {
                    return res.status(400).json({ success: false, message: "Invalid user ID" });
                }
                await User.findByIdAndDelete(data.id);
                res.json({ success: true, message: "User deleted" });
                break;
            }
            default: {
                console.log(`Unhandled event type: ${type}`);
                res.status(400).json({ success: false, message: "Unhandled event type" });
                break;
            }
        }
    } catch (error) {
        console.error("Webhook error:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
