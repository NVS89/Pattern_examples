/* 
Паттерн Bridge - это структурный шаблон, который позволяет двум компонентам: клиенту и сервису, работать вместе, причем каждый компонент имеет свой собственный интерфейс. Мост - это архитектурный шаблон высокого уровня, и его основная цель - написать код с помощью двух уровней абстракции.
Представим, что у нас есть два разных устройства ввода - Gestures и Mouse, но их действия соответствуют общему набору инструкций: щелкнуть, переместить, перетащить. Screen и Audio - разные устройства вывода, но они реагируют на один и тот же набор инструкций. Шаблон Bridge позволяет любому устройству ввода работать с любым устройством вывода.
*/

class Gestures {
    constructor(output) {
        this.name = 'Gestures';
        this.output = output;
    }

    tap() {
        return this.output.click(this.name);
    }

    swipe() {
        return this.output.move(this.name);
    }

    pan() {
        return this.output.drag(this.name);
    }

    pinch() {
        return this.output.zoom(this.name);
    }
}

class Mouse {
    constructor(output) {
        this.name = 'Mouse';
        this.output = output;
    }

    click() {
        return this.output.click(this.name);
    }

    move() {
        return this.output.move(this.name);
    }

    down() {
        return this.output.drag(this.name);
    }

    wheel() {
        return this.output.zoom(this.name);
    }
}

class Screen {
    click(name) {
        console.log(`Screen select triggered by ${name}`);
    }

    move(name) {
        console.log(`Screen move triggered by ${name}`);
    }

    drag(name) {
        console.log(`Screen drag triggered by ${name}`);
    }

    zoom(name) {
        console.log(`Screen zoom in triggered by ${name}`);
    }
}

class Audio {
    click(name) {
        console.log(`Sound oink triggered by ${name}`);
    }

    move(name) {
        console.log(`Sound waves triggered by ${name}`);
    }

    drag(name) {
        console.log(`Sound screetch triggered by ${name}`);
    }

    zoom(name) {
        console.log(`Sound volume up triggered by ${name}`);
    }
}

const testing = () => {
    const screen = new Screen();
    const audio = new Audio();

    const handScreenBridge = new Gestures(screen);
    const handAudioBridge = new Gestures(audio);
    const mouseScreenBridge = new Mouse(screen);
    const mouseAudioBridge = new Mouse(audio);

    handScreenBridge.tap();
    handScreenBridge.swipe();
    handScreenBridge.pinch();
    console.log('===============');
    handAudioBridge.tap();
    handAudioBridge.swipe();
    handAudioBridge.pinch();
    console.log('===============');

    mouseScreenBridge.click();
    mouseScreenBridge.move();
    mouseScreenBridge.wheel();
    console.log('===============');
    mouseAudioBridge.click();
    mouseAudioBridge.move();
    mouseAudioBridge.wheel();
};

testing();