import express from 'express';
import routes from '../routes';
import morgan from 'morgan';
import helmet from 'helmet';

const app = express();

app.use(helmet());
app.use(morgan('combined'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true, limit: '50mb'}));

app.use('/user', routes.user);

app.use((req, res) => {
    res.status(404).send('404 page not found');
});

app.listen(8080, () => {
    console.log('run');
});