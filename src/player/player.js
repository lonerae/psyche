import { Standing, Running } from "./playerStates.js";
import { CloseAttack, RangedAttack } from "./playerAttack.js";

import Equipment from "./equipment.js";
import Psyche from "./psyche.js";

export default class Player {
    constructor(game) {
        this.game = game;
        this.image = player;
        this.width = 50;
        this.height = 150;
        this.frameY = 0;
        this.x = this.game.width / 2 - this.width / 2;
        this.y = this.game.height / 2 - this.height / 2;
        this.speedX = 0;
        this.speedY = this.speedX;
        this.offsetX = 5;
        this.offsetW = -10;
        this.offsetY = 5;
        this.offsetH = -7;
        this.states = [new Standing(this.game), new Running(this.game)];
        this.currentState = null;
        this.equipment = new Equipment();
        this.psyche = new Psyche();
        this.attacks = [new CloseAttack(this.game, this.equipment.weapon), new RangedAttack(this.game, this.psyche.obsessions[0])];
        this.currentAttack = null;
        this.health = 100;
        this.obsession = 50;
    }
    setState(state, speed) {
        this.currentState = this.states[state];
        this.speedX = this.speedY = speed;
        this.currentState.enter();
    }
    setAttack(attack) {
        this.currentAttack = this.attacks[attack];
    }
    attack(targetX, targetY) {
        this.currentAttack.targetX = targetX;
        this.currentAttack.targetY = targetY;
        this.currentAttack.activate();
    }
    update(input) {
        this.currentState.handleInput(input);
    }
    draw(context) {
        context.drawImage(this.image, 0, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}