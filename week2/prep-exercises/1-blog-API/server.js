const fs = require("fs");
const express = require("express");

const app = express();
app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello World");
});

// Create new post
app.post("/blogs", (req, res) => {
  const { title, content } = req.body;

  // Create a directory named 'blog_posts' if it doesn't exist
  const blogPostsDirectory = "./blog-posts";

  if (!fs.existsSync(blogPostsDirectory)) {
    fs.mkdirSync(blogPostsDirectory);
  }

  // Define the file path within the 'blog-posts' directory
  const filePath = `${blogPostsDirectory}/${title}.txt`;

  // Write the blog post to the specified file
  fs.writeFileSync(filePath, `Title: ${title}\nContent: ${content}`);

  res.send("ok");
});

// Read an existing post
app.get("/blogs/:title", (req, res) => {
  const title = req.params.title;

  // Check if the file exists
  const filePath = `${title}.txt`;
  if (fs.existsSync(filePath)) {
    // Read the existing file
    const post = fs.readFileSync(filePath, "utf-8");
    res.send(post);
  } else {
    res.status(400).send("This post does not exist!");
  }
});

// Update an existing post
app.put("/blogs/:title", (req, res) => {
  const originalTitle = req.params.title;
  const { title, content } = req.body;

  const blogPostsDirectory = "./blog-posts";

  // Check if the file with the originalTitle as the filename exists
  const originalFilePath = `${blogPostsDirectory}/${originalTitle}.txt`;
  if (fs.existsSync(originalFilePath)) {
    // Check if both title & content parameters are provided.
    if (title && content) {
      const updatedFilePath = `${blogPostsDirectory}/${title}.txt`;

      // Rename the file if necessary
      if (originalTitle !== title) {
        fs.renameSync(originalFilePath, updatedFilePath);
      }

      // Write the content to the existing or updated file
      fs.writeFileSync(updatedFilePath, `Title: ${title}\nContent: ${content}`);
      res.end("ok");
    } else {
      res.status(400).send("Both title and content are required.");
    }
  } else {
    res.status(400).send("This post does not exist!");
  }
});

// Delete an existing post
app.delete("/blogs/:title", (req, res) => {
  const title = req.params.title;

  // Check if the file with the title as the filename exists
  const filePath = `${title}.txt`;
  if (fs.existsSync(filePath)) {
    // Delete the corresponding file
    fs.unlinkSync(filePath);
    res.end("ok");
  } else {
    res.status(400).send("This post does not exist!");
  }
});

// Reading all posts
app.get("/blogs", (req, res) => {
  const blogPostFolder = "./blog-posts";

  fs.readdir(blogPostFolder, (err, files) => {
    if (err) {
      res.status(500).json({ error: "Error reading blog posts" });
    } else {
      // Filter ".txt" files
      const txtFiles = files.filter((fileName) => fileName.endsWith('.txt'));

      const blogTitles = txtFiles.map((fileName) => {
          return { title: fileName };
      });

      res.json(blogTitles);
    }
  });
});

app.listen(3000);
