/* 
Паттерн Decorator - это структурный шаблон, который позволяет добавлять новый функционал при помощи “оберток”, не изменяя исходный класс.
Представим, что у нас есть базовая логика работы с сервером. В ServiceInteraction отсутствует логирование, и в целом, в системе его нет, но в каких-то конкретных случаях нам нужно подключить логгер, не изменяя исходный класс. В подобном случае мы предоставляем класс декоратор LogDecorator, который позволяет использовать все функции исходного класса, добавляя дополнительный функционал.
*/

class ServiceInteraction {
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

class LogDecorator extends ServiceInteraction {
    constructor(server) {
        super();
        this.server = server;
    }

    connect() {
        console.log('ESTABLISHING CONNECTION WITH:', this.server.url);
        return this.server.connect();
    }

    disconnect() {
        console.log('DISCONNECTING FROM:', this.server.url);
        return this.server.disconnect();
    }

    sendMessage(message) {
        console.log('SENDING REQUEST WITH PARAMS:', message);
        return this.server.sendMessage(message);
    }
}

const testing = async () => {
    const server = new ServiceInteraction('echo.websocket.org', 443);
    const decoratedServer = new LogDecorator(server);

    await server.connect()
        .then(() => server.sendMessage('123'))
        .then(() => server.disconnect());

    console.log('=============================');

    await decoratedServer.connect()
        .then(() => decoratedServer.sendMessage('1234'))
        .then(() => decoratedServer.disconnect());
};

testing();