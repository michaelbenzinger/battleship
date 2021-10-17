import './meyerreset.css';
import './style.css';
import display from './display.js';
import { gameboardFactory, playerFactory, shipFactory } from '../src/factories.js';


display.initialize();

const player1 = playerFactory('player', 10);
const enemy1 = playerFactory('enemy', 10);

display.populateGrid(player1);
display.populateGrid(enemy1);