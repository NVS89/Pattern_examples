/* 
Паттерн Facade - это структурный шаблон, который позволяет защитить клиента от сложного функционала класса, системы классов, библиотеки или фреймворка.
Представим, что в нашей системе необходимо реализовать два типа подключения - по вебсокетам и по http, но потребителю подключений будет значительно удобнее использовать класс ServerInteraction, который предоставляет один единственный метод request, вместо использования двух различных классов WebsocketInteraction, HttpInteraction и их методов.
*/

class WebsocketInteraction {
    constructor(url, port) {
        this.url = url;
        this.port = port;
    }

    connect() {
        return new Promise((resolve) => {
            this.connection = new WebSocket(`wss://${this.url}:${this.port}`);
            this.connection.onopen = (e) => {
                console.log('connected', e);
                resolve();
            };
        });
    }

    disconnect() {
        return new Promise((resolve) => {
            this.connection.close();
            this.connection.onclose = (e) => {
                console.log('disconnected', e);
                resolve();
            };
        });
    }

    sendMessage(message) {
        return new Promise((resolve) => {
            this.connection.send(message);
            this.connection.onmessage = (e) => {
                console.log(e);
                resolve();
            };
        });
    }
}

class HttpInteraction {
    constructor(url) {
        this.url = url;
    }

    sendRequest(message, method) {
        return fetch(`https://${this.url}`, {
            method,
            body: JSON.stringify(message),
        })
            .then((res) => res.json())
            .then((post) => {
                console.log(post);
            });
    }
}

class ServerInteraction {
    request(type, message, method) {
        if (type === 'websocket') {
            const server = new WebsocketInteraction('echo.websocket.org', 443);
            return server.connect()
                .then(() => server.sendMessage(message))
                .then(() => server.disconnect());
        } if (method && type === 'http') {
            const server = new HttpInteraction('jsonplaceholder.typicode.com/posts');
            return server.sendRequest(message, method);
        }
        throw new Error('No method provided!');
    }
}

const testing = async () => {
    const server = new ServerInteraction();

    await server.request('websocket', 'test-message');
    console.log('=========================');
    await server.request('http', {
        title: 'foo',
        body: 'bar',
        userId: 1,
    }, 'POST');
};

testing();