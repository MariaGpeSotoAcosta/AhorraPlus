import { z } from 'zod';

export const fixedCostSchema = z.object({
    earnings: z.number({
        required_error: 'earnings is required',
    }).min(0, {
        message: 'earnings cannot be a negative number',
    }),
    fixedCosts: z.array(
        z.object({
            name: z.string({
                required_error: 'Cannot have an empty name for an item',
            }),
            value: z.number({
                required_error: 'Cannot have an empty value for an item',
            }).min(1, {
                message: 'An item has to have a cost of at least 1',
            }),
            frequency: z.string({
                required_error: 'Cannot have an empty frequency'
            }),
        }),
    ),
});

export const rangeCostSchema = z.object({
    rangeCosts: z.array(
        z.object({
            name: z.string({
                required_error: 'Cannot have an empty name for an item',
            }),
            minValue: z.number({
                required_error: 'Cannot have an empty value for the minValue',
            }).min(1, {
                message: 'An item has to have a cost of at least 1',
            }),
            maxValue: z.number({
                required_error: 'Cannot have an empty value for the maxValue',
            }),
            frequency: z.string({
                required_error: 'Cannot have an empty frequency'
            }),
            importance: z.number({
                required_error: 'Cannot have an empty value for the importance',
            }).min(1, {
                message: 'Importance cannot be lower than 1',
            }).max(100, {
                message: 'Importance cannot be higher than 100',
            }),
        }),
    ),
});
