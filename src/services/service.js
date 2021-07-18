/*!
 * Services structure
 */

'use strict'

module.exports = (model) => {
    var dbModel = model
    return {
        getModel() {
            return dbModel
        },
        add(details) {
            return new Promise((resolve, reject) => {
                try {
                    const dbmodel = new dbModel(details)
                    let result = dbmodel.save()
                    return resolve(result)
                } catch (err) {
                    return reject(err)
                }
            })
        },
        update(filter, updates) {
            return new Promise((resolve, reject) => {
                try {
                    let response = dbModel.findOneAndUpdate(filter, updates, {
                        new: true
                    })
                    return resolve(response)
                } catch (err) {
                    return reject(err)
                }
            })
        },
        get(filter) {
            return new Promise((resolve, reject) => {
                try {
                    let response = dbModel.find(filter)
                    return resolve(response)
                } catch (err) {
                    return reject(err)
                }
            })
        },
        getById(filter) {
            return new Promise((resolve, reject) => {
                try {
                    let response = dbModel.findById(filter)
                    return resolve(response)
                } catch (err) {
                    return reject(err)
                }
            })
        },
        getOne(filter, attributes) {
            return new Promise((resolve, reject) => {
                try {
                    let response = dbModel.findOne(filter, attributes)
                    return resolve(response)
                } catch (err) {
                    return reject(err)
                }
            })
        },
        getAll() {
            return new Promise((resolve, reject) => {
                try {
                    let response = dbModel.find()
                    return resolve(response)
                } catch (err) {
                    return reject(err)
                }
            })
        },
        delete(filter) {
            return new Promise((resolve, reject) => {
                try {
                    let response = dbModel.findOneAndDelete(filter)
                    return resolve(response)
                } catch (err) {
                    return reject(err)
                }
            })
        }
    }
}