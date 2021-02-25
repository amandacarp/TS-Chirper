import * as express from 'express';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as morgan from 'morgan';
import routes from './routes';
import * as path from 'path';
import * as passport from 'passport';
import './middlewares/passport-strategies';

const app = express();

app.use(express.json());
app.use(passport.initialize());
app.use(helmet());
app.use(compression());
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(routes);

app.get('*', async (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
