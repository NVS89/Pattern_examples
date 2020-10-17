/* 
Паттерн Singleton - это порождающий шаблон, который гарантирует, что в системе существует только единственный экземпляр объекта или класса и предоставляет к нему точку доступа.
Singleton полезен в тех ситуациях, когда дополнительные экземпляры способны нарушить работоспособность приложения. Например, он полезен при проектировке работы с базами данных, чтобы избежать лишних подключений.
Некоторые другие паттерны, например как Factory, Prototype, и Facade часто могут быть реализованы в виде Singleton.
*/

class Singleton {
    constructor(data) {
        if (Singleton.instance) {
            return Singleton.instance;
        }

        Singleton.instance = this;
        this.data = data;

        return this;
    }
}

// Code for the testing
const testing = () => {
    const a = new Singleton('test1');
    const b = new Singleton('test2');
    if (a === b) {
        console.log('Singleton работает, один экземпляр');
    }
};

testing();