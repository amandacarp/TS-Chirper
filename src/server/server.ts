import * as express from 'express';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as morgan from 'morgan';
import apiRouter from './routes/api';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.static('public'));
app.use('/api', apiRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
