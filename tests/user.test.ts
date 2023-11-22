import { expect, test } from '@jest/globals';
import { UserBusinness } from '../services/UserBusiness'
import { User } from '../models/User';

beforeEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});

test('should return wallet value', async () => {
    const user = { name: 'Teste', email: "test@gmail.com", wallet: 100 };

    User.findOne = jest.fn().mockImplementationOnce(() => user);

    return UserBusinness.getUserByEmail('').then(data => expect(data!.wallet).toEqual(user.wallet));
});