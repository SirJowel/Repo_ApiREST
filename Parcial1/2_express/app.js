
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
    }

);

app.post('/data', (req, res) => {
    res.send('Data received!');
}
);

app.put('/update', (req, res) => {
    res.send('Update received!');
}
);

app.delete('/delete', (req, res) => {
    res.send('Delete received!');
}
);

app.patch('/modify', (req, res) => {
    res.send('Modify received!');
}
);



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    });