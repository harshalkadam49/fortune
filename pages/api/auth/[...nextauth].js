import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { connectToDataBase } from "../../../libs/db";
import { verifyPassword } from "../../../libs/auth";

export default NextAuth({
  session: { jwt: true },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await connectToDataBase();
        const usersCollection = client.db().collection("Users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error("User does not exists");
        }

        const isValidPassword = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValidPassword) {
          client.close();
          throw new Error("Could not log you in");
        }

        client.close();
        return { email: user.email };

      },
    }),
  ],
});
