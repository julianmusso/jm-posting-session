import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ],

    session: {
        strategy: "jwt",
    },

    callbacks: {

        async signIn(datos) {

            const { account, profile } = datos

            // En caso de loguear con Google:
            // Revisará si esa cuenta existe en la base de datos. 
            // De ser así, logueará. Caso contrario, creará una nueva cuenta.

            /*
            if (account.provider == "google") {

                //console.log("Dentro del IF")

                const { email } = profile;
                const { db } = await connectMongo().catch(error => { error: "Connection Failed...!" })

                //console.log("Base de datos sin errores")

                const checkEmailExisting = await Users.findOne({ email })

                //console.log(checkEmailExisting._id.toString())

                //console.log("Se buscó el usuario por email.")

                if (!checkEmailExisting) {

                    //console.log("No se encontró ningún usuario")

                    // Crear una nueva cuenta de usuario en la base de datos
                    try {
                        const hashedPassword = await hash(email, 12);
                        const newUser = new Users({
                            username: email,
                            email,
                            password: hashedPassword,
                            role: 'user',
                            provider: 'google',
                        });
                        const savedUser = await newUser.save();
                        //console.log("Se insertó un usuario y se autoriza: " + savedUser)

                        if (savedUser?._id) datos.user._id = savedUser._id;
                        if (savedUser?.role) datos.user.role = savedUser.role;
                        return true;

                    } catch (error) {
                        res.status(500).json({ error: "Internal server error." })
                    }
                }


                if (checkEmailExisting?._id) datos.user._id = checkEmailExisting._id;
                if (checkEmailExisting?.role) datos.user.role = checkEmailExisting.role;

                // Permitir la autenticación
                return true;
            }*/
            return true;

        },

        async jwt(datos) {

            const { token, user } = datos

            if (user?._id) token._id = user._id;
            if (user?.role) token.role = user.role;

            return token;
        },
        async session(datos) {

            const { session, token } = datos

            if (token?._id) session.user._id = token._id;
            if (token?.role) session.user.role = token.role;

            return session;
        },
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }