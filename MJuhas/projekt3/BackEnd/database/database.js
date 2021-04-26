// npm install sequelize/ npm install --save sqlite3
const { Sequelize, Model, DataTypes, Op } = require("sequelize")
const sequelize = new Sequelize("sqlite:memory")
class toDoList extends Model {}

toDoList.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING }, // hodnoty v tabuľke - stlpce  
    completed: { type: DataTypes.BOOLEAN },
}, {
    sequelize,
    modelName: "toDoList"
})

async function main() {
    await toDoList.sync(); // vytvor tabuľku+ { alter: true } {force:true} - nikdy nepouživauj

    // POST REQUEST
    let p1 = await Person.create({
        id: 1,
        title: "Toto je task z databazy", // hodnoty v tabuľke - stlpce  
        completed: false,
    })

    // READ DATA FROM FILE BEFORE LOAD WEBSIDE
    await Person.bulkCreate( // bulk defaultne nevaliduje uniqe hodnoty
        [
            { firstName: "Samule", lastName: "Chalupka" },
            { firstName: "Daniel", lastName: "Chalupka" },

        ], { validate: true } // pre validaciu hodnot za cenu pomalšej reakcie
    )

    // PUT REQUEST
    Person.update({ firstName: "Ivan" }, { where: { lastName: "Chalupka" } })
    Person.destroy({ where: { lastName: "Chalupka" } })
    let personList = await Person.findAll({
        where: {
            lastName: {
                [Op.like]: '%a'
            }
        }
    });
    // personList.forEach(x => console.log(x.toJSON()))

}

main()