import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import Balance from '../models/Balance';

interface ListTransactionBalance {
  transactions: Transaction[];
  balance: Balance;
}

class ListTransactionBalanceService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): ListTransactionBalance {
    const transactions = this.transactionsRepository.all();
    const balance = this.transactionsRepository.getBalance();

    const listTransactionBalance: ListTransactionBalance = {
      transactions,
      balance,
    };

    return listTransactionBalance;
  }
}

export default ListTransactionBalanceService;
