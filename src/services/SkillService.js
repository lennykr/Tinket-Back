const {BadRequestError} = require("../exceptions");
const {log} = require('../helpers');
const {SkillRepository} = require('../repositories/index');

class SkillService {
    async add(skills) {
        try {
            return await SkillRepository.create(skills);
        } catch (ex) {
            log(ex);
            throw new BadRequestError('Deze skill bestaat al! Kies een andere naam.');
        }
    }



    async getAll() {
        try {
            return await SkillRepository.readAll();
        } catch (ex) {
            log(ex);
            throw new Error('Er is iets mis gegaan bij het ophalen van alle skills');
        }
    }

}

module.exports = SkillService;
