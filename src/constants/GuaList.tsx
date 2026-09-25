const GUA_LIST = {
    1: {
        value:"Life Generating",
        aus:true
    },
    2:{
        value:"Heavenly Doctor",
        aus:true
    },
    3:{
        value:"Longevity",
        aus:true
    },
    4:{
        value:"Stability",
        aus:true
    },
    5:{
        value:"Mishaps",
        aus:false
    },
    6:{
        value:"Five Ghosts",
        aus:false
    },
    7:{
        value:"Six Killing",
        aus:false
    },
    8:{
        value:"Life Threatening",
        aus:false
    },
} as const;


export const GUA_DIRECTIONS = {
    Kan: {
        southEast: GUA_LIST[1],
        east:GUA_LIST[2],
        south:GUA_LIST[3],
        north:GUA_LIST[4],
        west:GUA_LIST[5],
        northEast:GUA_LIST[6],
        northWest:GUA_LIST[7],
        southWest:GUA_LIST[8]
    },
    Kun:{
        southEast: GUA_LIST[6],
        east:GUA_LIST[5],
        south:GUA_LIST[7],
        north:GUA_LIST[8],
        west:GUA_LIST[2],
        northEast:GUA_LIST[1],
        northWest:GUA_LIST[3],
        southWest:GUA_LIST[4]
    },
    Zhen:{
        southEast: GUA_LIST[6],
        east:GUA_LIST[4],
        south:GUA_LIST[1],
        north:GUA_LIST[2],
        west:GUA_LIST[8],
        northEast:GUA_LIST[7],
        northWest:GUA_LIST[6],
        southWest:GUA_LIST[5]
    },
    Xun:{
        southEast: GUA_LIST[4],
        east:GUA_LIST[3],
        south:GUA_LIST[2],
        north:GUA_LIST[1],
        west:GUA_LIST[7],
        northEast:GUA_LIST[8],
        northWest:GUA_LIST[5],
        southWest:GUA_LIST[6]
    },
    Qian:{
        southEast: GUA_LIST[5],
        east:GUA_LIST[6],
        south:GUA_LIST[8],
        north:GUA_LIST[7],
        west:GUA_LIST[1],
        northEast:GUA_LIST[2],
        northWest:GUA_LIST[4],
        southWest:GUA_LIST[3]
    },
    Dui:{
        southEast: GUA_LIST[7],
        east:GUA_LIST[8],
        south:GUA_LIST[6],
        north:GUA_LIST[5],
        west:GUA_LIST[4],
        northEast:GUA_LIST[3],
        northWest:GUA_LIST[1],
        southWest:GUA_LIST[2]
    },
    Gen:{
        southEast: GUA_LIST[8],
        east:GUA_LIST[7],
        south:GUA_LIST[5],
        north:GUA_LIST[6],
        west:GUA_LIST[3],
        northEast:GUA_LIST[4],
        northWest:GUA_LIST[2],
        southWest:GUA_LIST[1]
    },
    Li:{
        southEast: GUA_LIST[2],
        east:GUA_LIST[1],
        south:GUA_LIST[4],
        north:GUA_LIST[3],
        west:GUA_LIST[6],
        northEast:GUA_LIST[5],
        northWest:GUA_LIST[8],
        southWest:GUA_LIST[7]
    }

} as const;

export function convertNumberToGua(num:number){
    switch (num) {
        case 1:
            return "Kan"
        case 2:
            return "Kun"
        case 3:
            return "Zhen"
        case 4:
            return "Xun"
        case 6:
            return "Qian"
        case 7:
            return "Dui"
        case 8:
            return "Gen"
        case 9:
            return "Li"
        default:
            break;
    }
}

export function GuaDetails(){
    return {
        Kan:{
            element:"Water",
            number:1,
            direction:"North",
            people:"Middle son, person with the darkest or thickest hair, people who are working on the sea/river/lake etc. for example:fisherman, sailor.",
            bodyParts:"Ear, blood, kidney",
            Sickness:"Ear sickness, infection, kidney and stomach problem, diarrhea.",
            colour:"Black, blue"
        },
        Qian: {
            element: "Metal",
            number: 6,
            direction: "Northwest",
            people: "The emperor, father, adult, old people, senior person, famous person, emperor's servant, government officer and civil servants, boss, leader, chairman, head of household or oldest male resident of the house, someone in leadership position in the house.",
            bodyParts: "Head, bone, lung.",
            Sickness: "Head/Brain related disease, lung disease, muscle and bone disease.",
            colour: "Gold, silver, white."
        },
        Kun: {
            element: "Earth",
            number: 2,
            direction: "Southwest",
            people: "Mother, step-mother, farmer, villager, people/crowd, old lady and people with big bellies/fat people, oldest lady resident in the house.",
            bodyParts: "Abdomen, spleen, flesh, stomach.",
            Sickness: "Abdominal disease, stomach disease, poor appetite, indigestion.",
            colour: "Yellow, black."
        },
        Li: {
            element: "Fire",
            number: 9,
            direction: "South",
            people: "Middle daughter, writers, middle-aged woman.",
            bodyParts: "Eye, heart.",
            Sickness: "Eye disease, heart disease.",
            colour: "Red, purple."
        },
        Zhen: {
            element: "Wood",
            number: 3,
            direction: "East",
            people: "Eldest son, the sportsman.",
            bodyParts: "Foot, liver, hair, voice.",
            Sickness: "Foot disease, liver disease, worries and shock.",
            colour: "Dark green and jade green."
        },

        Xun: {
            element: "Wood",
            number: 4,
            direction: "Southeast",
            people: "Eldest daughter, widow, the most studious person in the house.",
            bodyParts: "Thigh, Qi and disease of Feng/wind/gas.",
            Sickness: "Thigh problems, disease of Feng/wind, intestinal disease, stroke and disease of Qi.",
            colour: "Green, jade green."
        },
        Gen: {
            element: "Earth",
            number: 8,
            direction: "Northeast",
            people: "Youngest son, young kids, people living in the jungle, a hermit or a person who has lots of free time, children below 13, teenager who likes to spend a lot of time in the room.",
            bodyParts: "Finger, bone, nose, back, back bone.",
            Sickness: "Problems of the finger/toes, stomach and back.",
            colour: "Yellow."
        },

        Dui: {
            element: "Metal",
            number: 7,
            direction: "West",
            people: "Youngest daughter, mistress, singer, actor, talkative person.",
            bodyParts: "Tongue, mouth, throat, lung, phlegm, saliva.",
            Sickness: "Mouth or tongue disease, throat disease, respiratory disease, lack of appetite.",
            colour: "White."
        }
    }
}
