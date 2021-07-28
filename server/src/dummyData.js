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

    {
        username:"mzuckerberg", 
        firstName:"Mark", 
        lastName: "Zuckerberg", 
        email:"m@zuckerberg.com", 
        role:"Advertiser", 
        age: 37
    },
    {
        username:"ccriado-perez", 
        firstName:"Caroline", 
        lastName: "Criado-Perez", 
        email:"c@criado-perez.de", 
        role:"Researcher", 
        age: 37
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
    //console.log("insertDummy")
    for (const u of dummyUsers){
        await models.User.count({where: {username: u.username}})
        .then(count => {
          if(count == 0) models.User.create(u);
        })
    }

    for (const c of dummyCycles){
        await models.Cycle.count({where: {userId: c.userId}})
        .then(count => {
          if(count == 0) models.Cycle.create(c);
        })
    }

     for (const s of dummySymptoms){
        await models.Symptom.count({where: {symptom: s.symptom}})
        .then(count => {
          if(count == 0) models.Symptom.create(s);
        })
    }
    
}

exports.insertDummyData = insertDummyData
