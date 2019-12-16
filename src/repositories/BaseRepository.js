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
        console.log(model);
        console.log(data);
        //return await model.save();
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

    /**
     * Update the 'moderate' fields in a document (if any)
     * @param objectId
     * @param data
     * @param forceUpdate if set to true, the filter will be ignored and the update will be executed using the given data
     * @return {Promise<boolean>}
     */
    async moderate(objectId, data, forceUpdate = false) {
        // create a filter that makes sures that specified data fields are only updated if they are NOT set yet
        // example: flaggedAt will only be modified if its current value is null
        const filter = {};
        if (!forceUpdate)
            Object.keys(data).map((key) => {
                filter[key] = {$eq: null};
            });

        const result = await this.model.updateOne({ _id: objectId, ...filter}, !forceUpdate ? { $set: data } : data);
        return result.n > 0;
    }
}

module.exports = BaseRepository;
