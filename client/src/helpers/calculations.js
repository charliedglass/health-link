import {male, female} from "./healthObjects";

const helper = {
    calculateBMI: (height, weight) => {
        return (parseInt(weight) / (height*height)) * 703;
    },
    calculateWaterGoal: weight => {
        return parseInt(weight) / 16;
    },
    calculateExerciseGoal: activity => {
        return parseInt(activity)
    },    
    calculateCalorieRec: (weight, height, age, gender, activity) => {
        let male_BMR = male.BMR(weight, height, age);
        let female_BMR = female.BMR(weight, height, age);
        

        //Sedentary
        if (gender === "Male" && activity === "0") {
        return male.noActivity(male_BMR);
        } else if (gender === "Female" && activity === "0") {
        return female.noActivity(female_BMR);
        }
        //Light Activity
        else if (gender === "Male" && activity === "1") {
        return male.lightActivity(male_BMR);
        } else if (gender === "Female" && activity === "1") {
        return female.lightActivity(female_BMR);
        }
        //Moderate Activity
        else if (gender === "Male" && activity === "2") {
        return male.moderateActivity(male_BMR);
        } else if (gender === "Female" && activity === "2") {
        return female.moderateActivity(female_BMR);
        }
        //Very Active
        else if (gender === "Male" && activity === "3") {
        return male.veryActive(male_BMR);
        } else if (gender === "Female" && activity === "3") {
        return female.veryActive(female_BMR);
        }
        //Extremely Active
        else if (gender === "Male" && activity === "4") {
        return male.extremelyActive(male_BMR);
        } else if (
        gender === "Female" &&
        activity === "4"
        ) {
        return female.extremelyActive(female_BMR);
        }
    }
};

export default helper;