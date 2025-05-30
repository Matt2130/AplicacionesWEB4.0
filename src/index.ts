import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes';
import connectDB from './config/db';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(morgan('dev'));
//Morgan sirve para ver los logs de las peticiones que hagamos

app.use('/api/auth', authRoutes);

connectDB().then(() => {
    app.listen(PORT,()=>{
    console.log("El servidor esta en el puerto:", PORT)
});
});

/* app.listen(PORT,()=>{
    console.log("El servidor esta en el puerto:", PORT)
}) */
