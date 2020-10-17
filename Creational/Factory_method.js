/* 
Factory method - это порождающий паттерн проектирования, который использует полиморфизм - объекты или классы наследуются от одного абстрактного базового объекта или класса, предназначенного для полиморфного использования. В этом объекте или классе определяется единый интерфейс, через который будут происходить операции с конечными объектами или классами.
Паттерн Factory Method подразумевает создание объектов не через оператор new, а через вызов фабричного метода.
*/

class Factory {
    createEmployee(employeeType) {
        if (employeeType === 'Штатный сотрудник') {
            return new FullTime(employeeType);
        }
        if (employeeType === 'Стажер') {
            return new Trainee(employeeType);
        }
        if (employeeType === 'Подрядчик') {
            return new Contractor(employeeType);
        }

        throw new Error('Такого типа не существует');
    }
}

class AbstractWorker {
    constructor(type, hourly) {
        this.type = type;
        this.hourly = hourly;
    }

    describe() {
        console.log(`Привет, я ${this.type} и моя ставка ${this.hourly}`);
    }
}

class FullTime extends AbstractWorker {
    constructor(type) {
        const hourly = '100';
        super(type, hourly);
    }
}

class Trainee extends AbstractWorker {
    constructor(type) {
        const hourly = '50';
        super(type, hourly);
    }
}

class Contractor extends AbstractWorker {
    constructor(type) {
        const hourly = '200';
        super(type, hourly);
    }
}

// Code for the testing
const testing = () => {
    const employees = [];
    const factory = new Factory();
    employees.push(factory.createEmployee('Штатный сотрудник'));
    employees.push(factory.createEmployee('Стажер'));
    employees.push(factory.createEmployee('Подрядчик'));
    employees.forEach((employee) => employee.describe());
};

testing();