var $$ = $$ || {};

$$.Model.Table = class ModelTable {
	constructor (root = $('main'), options = {}) {
		"use strict";

		this.options = options;
		this.root = root === '' ? $('main') : root;

		this._template();
		this.initialize();
	}

	initialize () {
		"use strict";

		/*this.root.html(`
		 <form data-bind="submit: addTask">
		 Add task: <input data-bind="value: newTaskText" placeholder="What needs to be done?" />
		 <button type="submit">Add</button>
		 </form>

		 <ul data-bind="foreach: tasks, visible: tasks().length > 0">
		 <li>
		 <input type="checkbox" data-bind="checked: isDone" />
		 <input data-bind="value: title, disable: isDone" />
		 <a href="#" data-bind="click: $parent.removeTask">Delete</a>
		 </li>
		 </ul>

		 You have <b data-bind="text: incompleteTasks().length">&nbsp;</b> incomplete task(s)
		 <span data-bind="visible: incompleteTasks().length == 0"> - it's beer time!</span>
		 `);

		 function Task (data) {
		 this.title = ko.observable(data.title);
		 this.isDone = ko.observable(data.isDone);
		 }

		 function TaskListViewModel () {
		 // Data
		 var self = this;
		 self.tasks = ko.observableArray([]);
		 self.newTaskText = ko.observable();
		 self.incompleteTasks = ko.computed(function () {
		 return ko.utils.arrayFilter(self.tasks(), function (task) {
		 return !task.isDone()
		 });
		 });

		 // Operations
		 self.addTask = function () {
		 self.tasks.push(new Task({ title: this.newTaskText() }));
		 self.newTaskText("");
		 };
		 self.removeTask = function (task) {
		 self.tasks.remove(task)
		 };
		 }

		 ko.applyBindings(new TaskListViewModel());*/

		this.getTable();

		this.root.html(this.template);

		/*this.root.on('submit', 'form', (event) => {
			event.preventDefault();
			var form = $(event.currentTarget);

			$.ajax({
				type: 'POST',
				url:  'core/TableSave.php',
				data: {
					form: form.serialize()
				}
			});
		});*/
	}

	destroy () {
		"use strict";
		console.log('destroy Index');
	}

	_template () {
		"use strict";
		this.template = `<h1>${this.options.tableName}</h1>
			<div class="container">
				<div class="row">
					<div class="col s12">
						<form action="core/TableSave.php" method="POST" data-bind="submit: saveTable">
							<table>

				            </table>
				            <input type="submit" value="save">
			            </form>
					</div>
				</div>
			</div>`;
	}

	getTable () {
		"use strict";

		$.ajax({
			type:    'POST',
			url:     'core/Table.php',
			data:    {
				tableName: this.options.tableName
			},
			success: (response) => {
				response = $.parseJSON(response);

				var names = '';

				_.each(response[0], (value, key) => {
					names += `<th data-${key}="${key}">${key}</th>`;
				});

				this.root.find('table').append(`
							<thead>
								<tr>
									${names}
								</tr>
							</thead>
							`);
				var records = '';

				_.each(response[0], (value, key) => {
					records += `<td><input data-bind="value: ${key}" /></td>`;
				});

				this.root.find('table').append(`
				 			<tbody data-bind="foreach: names">
				 				<tr>
									${records}
								</tr>
							</tbody>
							`);

				function SeatReservation (key, value) {
					var self = this;
					self[key] = value;
				}

				function ReservationsViewModel (response) {
					var self = this;

					self.names = ko.observableArray([]);

					response.forEach(record => {
						self.names.push(record);
					});

					self.saveTable = function () {
						//console.log(ko.toJS(self.names));
						//return
						$.ajax({
							type:    'POST',
							url:     'core/TableSave.php',
							data:    {
								tableName: 'catalog',
								data: ko.toJSON(self.names)
							},
							success: (response) => {
								console.log(response);
							}
						});
					}

				}

				ko.applyBindings(new ReservationsViewModel(response));
			}
		});
	}
}
