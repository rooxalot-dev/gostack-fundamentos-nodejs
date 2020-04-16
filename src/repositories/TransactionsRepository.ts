import Transaction from '../models/Transaction';
import Balance from '../models/Balance';

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions.slice();
  }

  public getBalance(): Balance {
    const income = this.getTypeSum('income');
    const outcome = this.getTypeSum('outcome');
    const total = income - outcome;

    const balance: Balance = { income, outcome, total };

    return balance;
  }

  public create(transaction: Transaction): Transaction {
    this.transactions.push(transaction);
    return transaction;
  }

  private getTypeSum(type: 'income' | 'outcome'): number {
    const typeSum = this.transactions
      .filter(transaction => transaction.type === type)
      .map(transaction => transaction.value)
      .reduce((p, c) => {
        return p + c;
      }, 0);

    return typeSum;
  }
}

export default TransactionsRepository;
