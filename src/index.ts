import app from './app';

const port = process.env.PORT;

app.listen(port, () => {
    // tslint:disable-next-line: no-console
    return console.log(`server is listening on ${port}`);
}).on('error', (e: Error) => {
    // tslint:disable-next-line: no-console
    console.log('Error happened: ', e.message)
})