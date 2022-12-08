const express = require('express');

const routes = require('./routes/routes');

const app = express();
app.set('port', process.env.PORT || 9000);

app.use(express.json());

// Especificamos el acceso a nuestras rutas
app.use('/api', routes);

app.use((req, res, next) => {
    return res.status(404).json({
        message: "Endpoint not found"
    })
})

app.listen(app.get('port'), () =>{
    console.log(`server listening on ${app.get('port')}`);
});