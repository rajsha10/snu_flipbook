const { createApp } = require("./src/router");

const main = () => {
    const app = createApp();
    const port = process.env.PORT || 8000;

    app.listen(port, () => console.log("Listening on", port));
};

main();