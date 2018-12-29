import app from "./app";
import { PORT } from "./config";

const port = PORT || 3000;
app.set("port", port);
app.listen(app.get("port"), (err) => {
    if (err) {
        throw Error(err);
    }
    return console.log(`server is listening on ${port}`);
});
