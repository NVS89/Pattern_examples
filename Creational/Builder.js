/* 
Паттерн Builder - это порождающий паттерн, который позволяет создавать сложные объекты или классы поэтапно. Он предоставляет возможность использовать один и тот же код для получения разных представлений объектов или классов.
Представим, что у нас есть класс Car, для создания которого требуется большое количество опций. Запомнить весь порядок атрибутов и передать их в конструктор будет проблемой, можно передать свойства в объекте, но тем не менее он будет выглядеть монструозно. Также вам придется писать обработчик, если какие-то опции не обязательны или зависят друг от друга.
*/

class Car {
    constructor(options) {
        for (const option in options) {
            this[option] = options[option];
        }
    }

    getInfo() {
        console.log(`Это ${this.color} ${this.model} с ${this.transmission} коробкой передач`);
    }
}

class Builder {
    constructor() {
        this.requiredAttrs = ['model', 'color', 'transmission'];
    }

    setModel(model) {
        this.model = model;
        return this;
    }

    setColor(color) {
        this.color = color;
        return this;
    }

    setTransmission(transmission) {
        this.transmission = transmission;
        return this;
    }

    build() {
        const checkMissingAttributes = this.requiredAttrs.some((attr) => !this[attr]);

        if (checkMissingAttributes) {
            throw new Error('Для постройки не хватает обязательных атрибутов!');
        }

        return new Car(this);
    }
}

// Code for the testing
const testing = () => {
    const builder = new Builder();
    const car = builder
        .setModel('Camry')
        .setColor('Красная')
        .setTransmission('Автоматической')
        .build();

    const car2 = builder
        .setTransmission('Ручной')
        .setModel('Corolla')
        .setColor('Синяя')
        .build();

    car.getInfo();
    car2.getInfo();
}

testing();