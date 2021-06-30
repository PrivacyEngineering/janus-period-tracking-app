const dummyUsers = [
    {
        id: 1,
        username:"szuboff", 
        firstName:"Shoshana", 
        lastName: "Zuboff", 
        email:"shoshana@zuboff.com", 
        role:"User", 
        age: 40, 
        contraceptive: "pill"
    },
    {
        id: 2,
        username:"alovelace", 
        firstName:"Ada", 
        lastName: "Lovelace", 
        email:"ada@lovelace.com", 
        role:"User", 
        age: 900, 
        contraceptive: "condome"
    },
    {
        id: 3,
        username:"ghopper", 
        firstName:"Grace", 
        lastName: "Hopper", 
        email:"grace@hopper.com", 
        role:"User", 
        age: 80,
        contraceptive: ""
    },
    {
        id: 4,
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
        id: 1,
        userId: 1, 
        start: new Date(2020,1,1),
        end: new Date(2020,1,30)
    },
    {
        id: 2,
        userId: 1, 
        start: new Date(2020,3,12),
        end: new Date(2020,4,8)
    },
    {
        id: 3,
        userId: 2, 
        start: new Date(1990,10,13),
        end: new Date(1990,11,10)
    },
    {
        id: 4,
        userId: 3, 
        start: new Date(2001,12,24),
        end: new Date(2002,1,20)
    },
    {
        id: 5,
        userId: 4, 
        start: new Date(2005,4,16),
        end: new Date(2020,5,12)
    },
]

const dummySymptoms = [
    {
        id: 1,
        userId: 1,
        date: new Date(2020,3,13,14,2,3),
        symptom: "abdome pain"
    },
    {
        id: 2,
        userId: 1,
        date: new Date(2020,3,14,14,2,3),
        symptom: "chest"
    },
    {
        id: 3,
        userId: 2,
        date: new Date(1999,12,5,10,56,30),
        symptom: "headache"
    },
]

async function insertDummyUsers(models){
    //console.log("insertDummyUsers")
    for (const u of dummyUsers){
        await models.User.count({where: {id: u.id}})
        .then(count => {
          if(count == 0) models.User.create(u);
        })
    }
}

async function insertDummyCycle(models){
    //console.log("insertDummyCylce")
    for (const c of dummyCycles){
        await models.Cycle.count({where: {id: c.id}})
        .then(count => {
          if(count == 0) models.Cycle.create(c)
        })
    }
}

async function insertDummySymptoms(models){
    //console.log("insertDummyCylce")
    for (const s of dummySymptoms){
        await models.Symptom.count({where: {id: s.id}})
        .then(count => {
          if(count == 0) models.Symptom.create(s)
        })
    }
}

const insertDummyData = function(models) {
    //console.log("insertDummy")
    return new Promise((res,rej)=>{
        insertDummyUsers(models);
        insertDummyCycle(models);
        insertDummySymptoms(models);
        res();
    })
}

exports.insertDummyData = insertDummyData
