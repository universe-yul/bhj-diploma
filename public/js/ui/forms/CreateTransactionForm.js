/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list(User.current(), (err, response) => {
	  if (response && response.success) {
		this.element.querySelector('.accounts-select').innerHTML = '';
		response.data.forEach((item) => {
		  this.element.querySelector('.accounts-select').innerHTML += `<option value="${item.id}">${item.name}</option>`;
		});
      }
    });
  }
  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data.data, (err, response) => { 
      if(response && response.success) {
        this.element.reset();
        const type = data.data.type; // для закрытия модального окна
        const modalName = 'new' + type[0].toUpperCase() + type.substr(1);
        App.getModal(modalName).close();
        App.update();
      }
    })
  }
} 
