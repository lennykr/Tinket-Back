/**
 * Helper service for any document that contains a moderation section (for an Admin)
 */
class ModerationService {
    constructor(repository) {
        this.repo = repository;
    }

    /**
     * Flag a target document (contains inappropriate content for example)
     * @param id
     * @return {Promise<void>}
     */
    async flag(id) {
        await this.repo.moderate(id, {flaggedAt: new Date()});
    }

    /**
     * Mark flagged document for deletion
     * @param id
     * @return {Promise<void>}
     */
    async resolveFlagged(id) {
        await this.repo.moderate(id, {flagResolvedAt: new Date()});
    }

    /**
     * Ignore flagged document (false positive)
     * @param id
     * @param undo whether or not to undo the ignore flag action
     * @return {Promise<void>}
     */
    async ignoreFlagged(id, undo = false) {
        await this.repo.moderate(id, undo ? {$unset: {deletedAt: 1}, $set: {flagResolvedAt: new Date()}} : {deletedAt: new Date()}, undo);
    }
}

module.exports = ModerationService;
