import { z } from 'zod';

export const formSchema = z.object({
    earnings: z.number({
        required_error: 'earnings is required',
    }).min(0, {
        message: 'earnings cannot be a negative number',
    }),
    monthItems: z.array(
        z.object({
            name: z.string({
                required_error: 'Cannot have an empty name for an item',
            }),
            value: z.number({
                required_error: 'Cannot have an empty value for an item',
            }).min(1, {
                message: 'An item has to have a cost of at least 1',
            }),
        })
    ),
    weekItems: z.array(
        z.object({
            name: z.string({
                required_error: 'Cannot have an empty name for an item',
            }),
            value: z.number({
                required_error: 'Cannot have an empty value for an item',
            }).min(1, {
                message: 'An item has to have a cost of at least 1',
            }),
        })
    ),
    savingsPercent: z.number({
        required_error: 'savingsPercent is required',
    }).min(0, {
        message: 'savingsPercent cannot be a negative number',
    }).max(100, {
        message: 'savingsPercent cannot be greater than 100',
    }),
});
