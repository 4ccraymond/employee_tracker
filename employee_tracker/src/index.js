import {mainMenu} from './prompts.js';

const init = async () => {
    try {
        await mainMenu();   
        console.log('Welcome to the Employee Tracker!');
    } catch (error) {
        console.error('Error starting Employee Tracker', error);
    }
};

init();