const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

const middleware = (req, res, next) => {
     const { age } = req.query;

     if (!age) {
          return res.redirect("/");
     }

     return next();
};

app.use(express.urlencoded({ extended: false }));

nunjucks.configure("views", {
     autoescape: true,
     express: app,
     watch: true
});

app.set("view engine", "njk");

app.get("/", (req, res) => {
     res.render("create");
});

app.post("/check", (req, res) => {
     const { age } = req.body;

     if (age >= 18) {
          res.redirect(`/major/?age=${age}`);
     } else {
          res.redirect(`/minor/?age=${age}`);
     }
});

app.get("/major", middleware, (req, res) => {
     const { age } = req.query;

     res.render("major", { age });
});

app.get("/minor", middleware, (req, res) => {
     const { age } = req.query;
     res.render("minor", { age });
});

app.listen(3000);
