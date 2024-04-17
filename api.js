import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

let posts = [
    {
      id: 1,
      title: "The Rise of Decentralized Finance",
      content:
        "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
      author: "Alex Thompson",
      date: "2023-08-01T10:00:00Z",
    },
    {
      id: 2,
      title: "The Impact of Artificial Intelligence on Modern Businesses",
      content:
        "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
      author: "Mia Williams",
      date: "2023-08-05T14:30:00Z",
    },
    {
      id: 3,
      title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
      content:
        "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
      author: "Samuel Green",
      date: "2023-08-10T09:15:00Z",
    },
  ];
  let lastid= 3;
   
  // getting all base posts
  app.get("/posts", (req, res) => {
    res.json(posts);
  });

  //getting a specific post by id
  app.get("/posts/:id", (req ,res)=> {
    const postnumber = req.params.id;
    const post = posts.find((p) => p.id == postnumber);
    res.json(post);
  });

  //post a new post
  app.post("/posts", (req, res) => {
    const newid = lastid +=1;
    const newtitle = req.body.title;
    const newcontent = req.body.content;
    const newauthor = req.body.author;
    const newdate = new Date();
    const newpost = {
        id: newid,
        title: newtitle,
        content : newcontent,
        author : newauthor,
        date : newdate,
    }
    posts.push(newpost);
    res.json(newpost);
    lastid = newid;
  });
 
  //patch a post with one parameter
  app.patch("/posts/:id", (req,res) => {
    const existblog = posts.find ( (p) => p.id == req.params.id );
    const editid= req.params.id;
    const edittitle = req.body.title;
    const editcontent = req.body.content;
    const editauthor = req.body.author;
    const editdate = new Date();
    const editpost = {
        id: editid,
        title: edittitle || existblog.title,
        content: editcontent || existblog.content,
        author : editauthor || existblog.author,
        date : editdate || existblog.date,
    }
    const replacepostindex = posts.findIndex((p) => p.id == editid);
    posts[replacepostindex] = editpost;
    res.json(editpost);
  });

  app.delete("/posts/:id", (req, res) => {
    const id = posts.findIndex((p) => p.id == req.params.id);
    posts.splice(id,1);
    res.json({message: "Your post is deleted"});
  });



app.listen(port, ()=> {
    console.log("Your api is running at port "  + port);
} );