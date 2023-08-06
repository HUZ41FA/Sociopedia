import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { register } from './controllers/auth.js';
import { createPost } from './controllers/posts.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import postRoutes from './routes/postRoutes.js';
import { authenticate } from './middleware/authMiddleware.js';

//* CONFIGURATIONS
dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({limit: '30mb', extended: true}));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // ✅
app.use(morgan("common"));
app.use(express.urlencoded({ limit: '30mb', extended: true}));
app.use(cors());

// app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

//* FILE STORAGE CONFIGURATION
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/assets");
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    },
})

const upload = multer({storage});

//* ROUTES WITH FILES
app.post("/auth/register", upload.single('picture'), register);
app.post('/posts', authenticate, upload.single('picture'), createPost);

//* ROUTES
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/posts', postRoutes);


//* ERROR HANDLING MIDDLEWARES
app.use(notFound);
app.use(errorHandler);

//* MONGOOSE SETUP
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)
.then((msg)=>{
    app.listen(PORT, ()=>console.log(`SERVER LISTENING ON ${PORT}`))
})
.catch((err)=>{
    console.log(`${err} \n UNABLE TO CONNECT`)
})
;