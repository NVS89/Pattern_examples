/* 
Паттерн Composite - это структурный шаблон, который позволяет создавать коллекцию объектов, представленную в древовидной форме, и работать с ней, как с единым объектом.
Давайте представим, что нам необходимо динамически создать коллекцию объектов, которая позволит подсчитать стоимость каждого компонента или изменить общие параметры каждого элемента через единую точку входа. В таком случае, на помощь придет паттерн Composite.
*/

class Composite {
    constructor(compositeName) {
        this.children = [];
        this.compositeName = compositeName;
    }

    add(child) {
        this.children.push(child);
    }

    getPrice() {
        let price = 0;

        this.children.forEach((child) => price += child.getPrice());

        return price;
    }
}

class Leaf {
    constructor(leafName, leafPrice) {
        this.leafName = leafName;
        this.leafPrice = leafPrice;
    }

    getPrice() {
        return this.leafPrice;
    }
}

const testing = () => {
    const package = new Composite('Автомобиль');
    const sportPackage = new Composite('Спортивный пакет');
    const sportSuspension = new Leaf('Спортивная подвеска', 50000);
    const sportTransmission = new Leaf('Спортивная коробка передач', 100000);
    const sportExterior = new Composite('Спортивный экстерьер');
    const sportLines = new Leaf('Спортивные полосы на кузове', 10000);

    package.add(sportPackage);

    sportPackage.add(sportSuspension);
    sportPackage.add(sportTransmission);

    package.add(sportExterior);
    sportExterior.add(sportLines);

    console.log(package.getPrice());
};

testing();