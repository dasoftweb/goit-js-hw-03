const Transaction = {
  DEPOSIT: "deposit",
  WITHDRAW: "withdraw",
};

let id = 0;
const getId = () => {
  return id +=1;
}

const account = {
  // Текущий баланс счета
  balance: 0,

  // История транзакций
  transactions: [],

  /*
   * Метод создает и возвращает объект транзакции.
   * Принимает сумму и тип транзакции.
   */
  createTransaction(amount, type) {
    return {
      id: getId(),
      type,
      amount,
    };
  },

  /*
   * Метод отвечающий за добавление суммы к балансу.
   * Принимает сумму танзакции.
   * Вызывает createTransaction для создания объекта транзакции
   * после чего добавляет его в историю транзакций
   */
  deposit(amount) {
    const transaction = this.createTransaction(amount, Transaction.DEPOSIT);
    this.transactions.push(transaction);
    this.balance += amount;
    console.log(`Баланc пополнен на: ${amount}`);
  },

  /*
   * Метод отвечающий за снятие суммы с баланса.
   * Принимает сумму танзакции.
   * Вызывает createTransaction для создания объекта транзакции
   * после чего добавляет его в историю транзакций.
   *
   * Если amount больше чем текущий баланс, выводи сообщение
   * о том, что снятие такой суммы не возможно, недостаточно средств.
   */
  withdraw(amount) {
    if (typeof amount !== "number" || amount < 0) {
      console.log(`Неверная сумма для снятия`);
      return;
    }

    if (amount > this.balance) {
      console.log(`Недостаточно средств для снятия`);
      return;
    }

    const transaction = this.createTransaction(amount, Transaction.WITHDRAW);
    this.transactions.push(transaction);
    this.balance -= amount;
    console.log(`Баланc уменшен на: ${amount}`);
  },

  /*
   * Метод возвращает текущий баланс
   */
  getBalance() {
    return `Текущий баланс: ${this.balance}`;
  },

  /*
   * Метод ищет и возвращает объект транзации по id
   */
  getTransactionDetails(id) {
    for (const transaction of this.transactions) {
      if (id !== transaction.id) {
        continue;
      }
      return transaction;
    }
  },

  /*
   * Метод возвращает количество средств
   * определенного типа транзакции из всей истории транзакций
   */
  getTransactionTotal(type) {
    let sum = 0;
    for (const transaction of this.transactions) {
      if (type !== transaction.type) {
        continue;
      }
      sum += transaction.amount;
    }
    return sum;
  },
};

console.log(account.getBalance());
account.deposit(5000);
account.withdraw(1000);
account.withdraw(1000);
account.withdraw(2000);
console.log(account.getBalance());
account.deposit(3000);
account.withdraw(20000);
console.log(account.getTransactionDetails(5));
console.log(account.getTransactionTotal("deposit"));
console.log(account.getTransactionTotal("withdraw"));