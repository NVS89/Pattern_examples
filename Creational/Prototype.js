/* 
Паттерн Prototype - это порождающий шаблон, который позволяет создавать новые, уже инициализированные, объекты или классы на основе исходного.
Prototype полезен в тех ситуациях, когда на основе исходного объекта или класса вам необходимо создать несколько клонов с похожими свойствами. Например, он может быть полезен при разработке онлайн игр, когда от базового функционала юнита реализуют новые схожие типы.
*/

class Prototype {
    setOption(key, val) {
        this[key] = val;
    }

    clone() {
        const clone = new Prototype();
        const keys = Object.keys(this);

        keys.forEach((k) => clone.setOption(k, this[k]));
        return clone;
    }
}

// Code for the testing
const testing = () => {
    const proto1 = new Prototype();
    proto1.setOption('option1', '1');
    const clone1 = proto1.clone();
    clone1.setOption('option2', '2');
    const clone2 = clone1.clone();
    clone2.setOption('option3', '3');

    console.log(proto1, clone1, clone2);
};
testing();