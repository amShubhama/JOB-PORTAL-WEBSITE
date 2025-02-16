import { Webhook } from 'svix'
import User from '../models/User.js'


//API Controller function to manage clerk user with database
const clerkWebhooks = async (req, res) => {
    try {
        //create a svix instance with clerk webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        //verifying Headers
        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers[svix - timestamp],
            "svix-signature": req.headers[svix - signature]
        });

        //Getting data from request body
        const { data, type } = req.body;

        //switchcase for different Events
        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    name: data.first_name + " " + data.last_name,
                    email: data.email_addresses[0].email_address,
                    image: data.img_url,
                    resume: ''
                }
                await User.create(userData);
                res.json({});
                console.log("User is created");
                break;
            }
            case 'user.deleted': {
                await User.findByIdAndDelete(data.id);
                res.json({});
                break;
            }
            case 'user.updated': {
                const userData = {
                    name: data.first_name + " " + data.last_name,
                    email: data.email_addresses[0].email_address,
                    image: data.img_url,
                }
                await User.findByIdAndUpdate(data.id, userData);
                res.json({});
                break;

            }
            default: {
                break;
            }
        }
    } catch (error) {
        console.log(error.message);
        res.json({
            success:false,
            message:'Webhooks Error',
        })
    }
}
export default clerkWebhooks;