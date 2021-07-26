const faker = require("faker");

const dummyUsers = [
    {
        username:"szuboff", 
        firstName:"Shoshana", 
        lastName: "Zuboff", 
        email:"shoshana@zuboff.com", 
        role:"User", 
        age: 40, 
        contraceptive: "pill"
    },
    {
        username:"alovelace", 
        firstName:"Ada", 
        lastName: "Lovelace", 
        email:"ada@lovelace.com", 
        role:"User", 
        age: 900, 
        contraceptive: "condome"
    },
    {
        username:"ghopper", 
        firstName:"Grace", 
        lastName: "Hopper", 
        email:"grace@hopper.com", 
        role:"User", 
        age: 80,
        contraceptive: ""
    },
    {
        username:"jraymond", 
        firstName:"Jade", 
        lastName: "Raymond", 
        email:"jade@raymond.com", 
        role:"User", 
        age: 30, 
        contraceptive: "condome"
    },
]

const dummyCycles = [
    {
        userId: 1, 
        start: new Date(2020,1,1),
        end: new Date(2020,1,30)
    },
    {
        userId: 1, 
        start: new Date(2020,3,12),
        end: new Date(2020,4,8)
    },
    {
        userId: 2, 
        start: new Date(1990,10,13),
        end: new Date(1990,11,10)
    },
    {
        userId: 3, 
        start: new Date(2001,12,24),
        end: new Date(2002,1,20)
    },
    {
        userId: 4, 
        start: new Date(2005,4,16),
        end: new Date(2020,5,12)
    },
]

const dummySymptoms = [
    {
        userId: 1,
        date: new Date(2020,3,13,14,2,3),
        symptom: "abdome pain",
        pain: 4,
    },
    {
        userId: 1,
        date: new Date(2020,3,14,14,2,3),
        symptom: "chest",
        pain: 9,
    },
    {
        userId: 2,
        date: new Date(1999,12,5,10,56,30),
        symptom: "headache",
        pain: 5,
    },
]

const insertDummyData = async function(models) {
    for (const u of getDummyUsers()){
        if(await models.User.count()>2000) break;
        await models.User.count({where: {username: u.username}})
        .then(count => {
          if(count == 0) models.User.create(u);
        })
    }

    for (const c of getDummyCycles()){
        if(await models.Cycle.count()>20000) break;
        models.Cycle.create(c);
    }

     for (const s of getDummySymptoms()){
        if(await models.Symptom.count()>20000) break;
        models.Symptom.create(s);
    }
}

exports.insertDummyData = insertDummyData

function getDummyUsers(){
    var r = new Array();

    for (let i = 0; i < 2000; i++) {
        r.push(
            {
                username:faker.internet.userName(), 
                firstName:faker.name.firstName(), 
                lastName: faker.name.lastName(), 
                email:faker.internet.email(), 
                role:"User", 
                age: faker.datatype.number({min: 10, max: 99}), 
                contraceptive: faker.lorem.word()
            }
        )
    }
    
    return r;
}

function getDummyCycles(){
    var r = new Array();

    for (let i = 0; i < 20000; i++) {
        r.push(
            {
                userId: faker.datatype.number({min: 1, max: 1950}), 
                start: faker.datatype.datetime(),
                end: faker.datatype.datetime()
            }
        )
    }
    
    return r;
}

function getDummySymptoms(){
    var r = new Array();

    for (let i = 0; i < 20000; i++) {
        r.push(
            {
                userId: faker.datatype.number({min: 1, max: 1950}),
                date: faker.datatype.datetime(),
                symptom: faker.lorem.word(),
                pain: faker.datatype.float({min:0, max:10}),
            }
        )
    }
    
    return r;
}
