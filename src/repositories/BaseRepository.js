class BaseRepository {
    /**
     * BaseRepository constructor
     * @param type Model type reference
     */
    constructor(type) {
        this.model = type;
    }

    /**
     * Insert document into collection
     * @param data
     * @return {Promise<Object>}
     */
    async create(data) {
        const model = new this.model(data);
        return await model.save();
    }

    /**
     * Get document by ObjectId
     * @param objectId
     * @return {Promise<Query|void>}
     */
    async read(objectId) {
        const document = await this.model.findById(objectId);
        if (document == null)
            throw new Error(`Document with ObjectId ${objectId} not found`);
        return document;
    }

    async readBy(data) {
        const document = await this.model.findOne(data);
        if (document == null)
            throw new Error(`Document not found`);
        return document;
    }

    /**
     * Delete a document
     * @param objectId
     * @return {Promise<boolean>}
     */
    async delete(objectId) {
        const result = await this.model.deleteOne({_id: objectId});
        return result.n > 0;
    }

    /**
     *
     * @param objectId
     * @param data
     * @return {Promise<boolean>}
     */
    async update(objectId, data) {
        const result = await this.model.updateOne({ _id: objectId}, { $set: data });
        return result.n > 0;
    }

}

module.exports = BaseRepository;
