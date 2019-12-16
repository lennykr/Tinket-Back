const {BadRequestError} = require("../exceptions");
const {SkillRepository} = require('../repositories/index');

class SkillService {
    async add(skills) {
        try {
            return await SkillRepository.create(skills);
        } catch (ex) {
            throw new BadRequestError('Deze skill bestaat al! Kies een andere naam.');
        }
    }

    async update(id, updatedSkill) {
        if (!await SkillRepository.update(id, updatedSkill))
            throw new BadRequestError('Skill niet gevonden!');
    }

    async delete(id) {
        if (!await SkillRepository.delete(id))
            throw new BadRequestError('Skill niet gevonden!');
    }

    async getAll() {
        return await SkillRepository.readAll();
    }

}

module.exports = SkillService;
