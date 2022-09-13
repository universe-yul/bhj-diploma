//const { response } = require("express");

//const { response } = require("express");
//const e = require("express");

/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const sidebarMenu = document.querySelector('.sidebar-mini');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
      sidebarToggle.addEventListener('click', function () {
        sidebarMenu.classList.toggle('sidebar-open');
        sidebarMenu.classList.toggle('sidebar-collapse');
      })
    }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const itemLogin = document.querySelector(".menu-item_login");
	const itemRegister = document.querySelector(".menu-item_register");
	const itemLogout = document.querySelector(".menu-item_logout");

	itemLogin.addEventListener("click", function (event) {
		const loginModal = App.getModal("login");
		loginModal.open();
	});

	itemRegister.addEventListener("click", function (event) {
		const registerModal = App.getModal("register");
		registerModal.open();
	});

	itemLogout.addEventListener("click", function (event) {
		User.logout({}, (err, response) => {
			if (response && (response.success === true)) {
				App.setState("init");
				User.unsetCurrent();
			}
		})
	});
  }
}
