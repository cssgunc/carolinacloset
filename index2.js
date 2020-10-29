import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import app2 as app from './app2'
import config from './config/server';

app.listen(config.port, function() {
    console.log(`Server started on port ${config.port} in ${config.mode} mode`);
});

ReactDOM.render(
    <App />,
    document.getElementById('root')
);