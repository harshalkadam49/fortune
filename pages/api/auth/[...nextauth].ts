import { verifyPassword } from "@/libs/auth";
import { connectToDataBase } from "@/libs/db";
const NextAuth = require("next-auth");
const Providers = require("next-auth/providers");

export default NextAuth({
  session: { jwt: true },
  providers: [
    Providers.Credentials({
      async authorize(credentials: any) {
        const client = await connectToDataBase();
        const usersCollection = client.db().collection("Users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error("user does not exists");
        }

        const isValidPassword = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValidPassword) {
          client.close();
          throw new Error("could not log you in");
        }

        client.close();
        return { email: user.email };
      },
    }),
  ],
});