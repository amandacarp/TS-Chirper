import * as express from 'express';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as morgan from 'morgan';
import apiRouter from './routes/api';
import * as path from 'path'

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.static('public'));
app.use('/api', apiRouter);
app.get('*', async (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
