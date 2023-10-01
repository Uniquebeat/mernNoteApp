// This is for type validation for .env
import { cleanEnv, port, str } from "envalid";

export default cleanEnv(process.env, {
    MONGO_CONNECTION_STRING: str(),
    PORT: port(),
});