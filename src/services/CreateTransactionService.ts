import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransactionRequest {
  title: string;

  value: number;

  type: string;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({
    title,
    value,
    type,
  }: CreateTransactionRequest): Transaction {
    if (type !== 'income' && type !== 'outcome') {
      throw new Error('Invalid transaction type.');
    }

    const currentBalance = this.transactionsRepository.getBalance();
    if (type === 'outcome' && currentBalance.total < value) {
      throw new Error('Your current balance is not enough for this operation.');
    }

    const validType: 'income' | 'outcome' = type;

    const transaction = new Transaction({ title, value, type: validType });
    const newTransaction = this.transactionsRepository.create(transaction);

    return newTransaction;
  }
}

export default CreateTransactionService;
