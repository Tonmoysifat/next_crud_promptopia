import NextAuth from "next-auth"
import GoogleProviders from "next-auth/providers/google"
import {connectToDB} from "@utils/database";
import User from "@models/user";


const handler = NextAuth({
    providers: [
        GoogleProviders({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({session}) {
            // console.log("route", session)
            const sessionUser = await User.findOne({
                email: session.user.email
            });
            session.user.id = sessionUser._id.toString()
            return session;
        },
        async signIn({profile}) {
            try {
                await connectToDB()
                // console.log(profile)
                const userExists = await User.findOne({
                    email: profile.email
                })
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture,
                    })
                }
                return true
            } catch (e) {
                console.log("Error checking if user exists: ",e.message)
                return false
            }
        }
    },

})
export {handler as GET, handler as POST}