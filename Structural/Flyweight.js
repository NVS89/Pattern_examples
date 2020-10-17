/* 
Паттерн Flyweight - это структурный шаблон, который позволяет сохранять память за счет эффективного совместного использования большого количества мелких объектов или классов. Общие объекты или классы неизменны, поскольку они представляют характеристики, общие с другими объектами или классами системы.
*/


class Flyweight {
    constructor(state) {
        this.state = state;
    }
}

class FlyWeightFactory {
    constructor(flyweightsList) {
        this.flyweights = {};
        flyweightsList.forEach((item) => {
            this.flyweights[item.join('_')] = new Flyweight(item);
        });
    }

    getFlyweight(state) {
        const key = state.join('_');

        if (!(key in this.flyweights)) {
            console.log('FlyweightFactory: Не могу найти flyweight, создаю новый.');
            this.flyweights[key] = new Flyweight(state);
        } else {
            console.log('FlyweightFactory: Переиспользую имеющийся flyweight.');
        }

        return this.flyweights[key];
    }

    listFlyweights() {
        const count = Object.keys(this.flyweights).length;
        console.log(`FlyweightFactory: Записано ${count} flyweights:`);
        for (const key in this.flyweights) {
            console.log(key);
        }
    }
}

const testing = () => {
    const computers = new FlyWeightFactory([['Dell', 'Studio XPS', 'Y755P'], ['Dell', 'Studio XPS', 'X997T']]);
    computers.listFlyweights();

    computers.getFlyweight(['Dell', 'Studio XPS', 'Y755P']);
    computers.getFlyweight(['Dell', 'Studio XPS', 'X997T']);
    computers.getFlyweight(['Dell', 'Studio XPS', 'NT777']);
    computers.getFlyweight(['HP', 'Envy', 'CNU883701']);
    computers.getFlyweight(['HP', 'Envy', 'TXU003283']);

    computers.listFlyweights();
};

testing();