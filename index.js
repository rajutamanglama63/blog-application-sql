const express = require("express")
const dotenv = require("dotenv")
const { Sequelize, QueryTypes, Model, DataTypes } = require("sequelize")

dotenv.config()

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
})

class Blog extends Model {}
Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author: {
        type: DataTypes.TEXT
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0 
    }
},
{
   sequelize,
   underscored: true,
   timestamps: false,
   modelName: 'blog'
})

Blog.sync()

app.get('/api/blogs', async (req, res) => {
    // const blogs = await sequelize.query("SELECT * FROM blogs", {type: QueryTypes.SELECT})

    const blogs = await Blog.findAll()

    console.log(JSON.stringify(blogs, null, 2))

    res.json(blogs)
})

app.post('/api/blogs', async (req, res) => {
    try {
        // const blog = await sequelize.query("insert into blogs (author, url, title) values ('Hari', 'docs.com', 'Planets')", {type: QueryTypes.INSERT})
        const blog = await Blog.create(req.body)
        return res.json(blog)
    } catch (error) {
        return res.status(400).json({error})
    }
})

app.delete("/api/blogs/:id", async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    await Blog.destroy({
        where: {
            author: blog.author
        }
    })

    res.status(200).json({msg: "successfully deleted"})
})


app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
});