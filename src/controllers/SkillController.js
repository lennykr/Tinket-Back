const {promiseResponseHelper} = require("../helpers");
const {SkillService} = require('../services/index');


class SkillController {
    _toSkillPayload(req) {
        return {
            name: req.body.name,
            url: req.body.url
        };
    }

    add(req, res) {
        promiseResponseHelper(req, res, SkillService.add(this._toSkillPayload(req)));
    }

    update(req, res) {
        promiseResponseHelper(req, res, SkillService.update(req.params.id, this._toSkillPayload(req)));
    }

    delete(req, res) {
        promiseResponseHelper(req, res, SkillService.delete(req.params.id));
    }

    getAllSkills(req, res) {
        promiseResponseHelper(req, res, SkillService.getAll());
    }
}

module.exports = SkillController;
