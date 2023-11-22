import Joi from 'joi'
import { Validator } from './Validator'


class Schema extends Validator {
    static get createUser() {
        const schema = {
            body: Joi.object({
                name: Joi.string().required(),
                email: Joi.string().required(),
                wallet: Joi.string().regex(/^\d+\.?\d{1,2}$/).required(),
            }),
        }
        return this.validate(schema)
    }

    static get getUserWallet() {
        const schema = {
            body: Joi.object({
                email: Joi.string().required(),
            }),
        }
        return this.validate(schema)
    }

    static get createInstantPayment() {
        const schema = {
            body: Joi.object({
                emailFrom: Joi.string().required(),
                emailTo: Joi.string().required(),
                value: Joi.string().regex(/^\d+\.?\d{1,2}$/).required(),
            }),
        }
        return this.validate(schema)
    }

    static get createScheduledPayment() {
        const schema = {
            body: Joi.object({
                emailFrom: Joi.string().required(),
                emailTo: Joi.string().required(),
                dateTime: Joi.date().required(),
                value: Joi.string().regex(/^\d+\.?\d{1,2}$/).required(),
            }),
        }
        return this.validate(schema)
    }

    static get cancelScheduledPayment() {
        const schema = {
            body: Joi.object({
                paymentId: Joi.string().required(),
            }),
        }
        return this.validate(schema)
    }
}


export { Schema }