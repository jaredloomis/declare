import {Core, Model, Instance, Collection, Index, Property, ObjectID} Iridium from 'iridium';

interface Colour {
    r: number;
    g: number;
    b: number;
}

interface Car {
    make: string;
    model: string;
    colour: Colour;
}

interface HouseDocument {
    _id?: string;
    name: string;

    cars?: Car[];
}

@Index({ name: 1 })
@Collection('houses')
class House extends Instance<HouseDocument, House> implements HouseDocument {
    @ObjectID _id: string;
    @Property(/^.+$/)
    name: string;

    @Property([{
        make: String,
        model: String,
        colour: {
            r: Number,
            g: Number,
            b: Number
        }
    }])
    cars: Car[];

    static onCreating(doc: HouseDocument) {
        doc.cars = doc.cars || [];
    }

    addCar(make: string, model: string, colour: Colour) {
        this.cars.push({
            make: make,
            model: model,
            colour: colour
        });
    }

    get numberOfCars() {
        return this.cars.length;
    }
}

class MyDatabase extends Core {
    Houses = new Model<HouseDocument, House>(this, House);
}

var myDb = new MyDatabase({ database: 'houses_test' });

myDb.connect().then(() => myDb.Houses.insert({
        name: 'My House',
        cars: [{
            make: 'Audi',
            model: 'A4',
            colour: { r: 0, g: 0, b: 0 }
        }]
    }))
    .then(() => myDb.Houses.get())
    .then((house) => {
        house.addCar('Audi', 'S4', { r: 255, g: 255, b: 255 });
        return house.save();
    })
    .then(() => myDb.close());
