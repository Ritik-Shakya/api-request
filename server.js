import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const baseUrl = "http://localhost:4000";
 
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get("/", async(req, res) => {
    try{
        const response = await axios.get(baseUrl + "/posts");
        const result = response.data;
        res.render("index.ejs", { result});
    }
    catch (error) {
        res.status(500).send("Failed to fetch activity.");
    }
});
 
app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});
app.get("/about", (req, res) => {
    res.render("about.ejs");
});
app.get("/chirp", (req, res) => {
    res.render("chirp.ejs");
});
app.get("/edit/:id", async(req, res) => {
    try {
        const response = await axios.get(baseUrl + "/posts/" + req.params.id);
        const result = response.data;
        res.render("edit.ejs", { result});
    } 
    catch (error) {
        res.status.send("failed");
    }
});
app.post("/", async(req, res) => {
    try{
        const response = await axios.post(baseUrl + "/posts", req.body);
        const result = response.data;
        res.redirect("/");
    }
    catch (error) {
        res.status.send("Failed to add post.")
    }
});

app.get("/posts/:id",async(req, res) => {
    try {
        const response = await axios.delete(baseUrl + "/posts/" + req.params.id );
        const result = response.data;
        res.redirect("/");
    }
    catch (error) {
        res.status.send("Cannot complete request.");
    }
});

app.post("/posts/:id", async(req, res) => {
    try { 
        const response = await axios.patch(baseUrl + "/posts/" + req.params.id, req.body);
        const result = response.data;
        res.redirect("/");
    }
    catch (error) {
        res.status.send("failed");
    }
});




app.listen(port, ()=> {
    console.log("Your site is running at port " + port);
})