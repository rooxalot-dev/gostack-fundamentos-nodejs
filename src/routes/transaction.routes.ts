import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import ListTransactionBalanceService from '../services/ListTransactionBalanceService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();
const createTransactionService = new CreateTransactionService(
  transactionsRepository,
);
const listTransactionBalanceService = new ListTransactionBalanceService(
  transactionsRepository,
);

transactionRouter.get('/', (request, response) => {
  try {
    const listTransactionBalance = listTransactionBalanceService.execute();

    return response.status(200).json(listTransactionBalance);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;
    const transaction = createTransactionService.execute({
      title,
      value,
      type,
    });

    return response.status(201).json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
